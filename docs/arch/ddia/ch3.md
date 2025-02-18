# 3. Data Store and Retrive

![](imgs/ch3.png)

> Wer Ordnung hält, ist nur zu faul zum Suchen.
> 
> (If you keep things tidily ordered, you’re just too lazy to go searching.)
> 
>​    — German proverb

---


[[toc]]

一个数据库在最基础的层次上需要完成两件事情：当你把数据交给数据库时，它应当把数据存储起来；而后当你向数据库要数据时，它应当把数据返回给你。


In [Chapter 2](ch2.md) we discussed data models and query languages— the foramt you as developer give the database your data,and the mechanism you can ask for it again later.
In this chapter we discuss the same from the databse's point of view.

between storage engines that are optimized for transactional workloads and those that are optimized for analytics. We will explore that distinction later in “[Transaction Processing or Analytics?](#transaction-processing-or-analytics)”, and in “[Column-Oriented Storage](#column-oriented-storage)” we’ll discuss a family of storage engines that is optimized for analytics.


first we’ll start this chapter by talking about storage engines that are used in the kinds of databases that you’re probably familiar with: traditional relational data‐ bases, and also most so-called NoSQL databases. We will examine two families of storage engines: *log-structured* storage engines, and *page-oriented* storage engines such as B-trees.

## 驱动数据库的数据结构

世界上最简单的数据库可以用两个 Bash 函数实现：
```bash
#!/bin/bash
db_set () {
  echo "$1,$2" >> database
}

db_get () {
  grep "^$1," database | sed -e "s/^$1,//" | tail -n 1
}
```

执行`db_set key value`会将 键（key） 和 值（value） 存储在数据库中
调用 db_get key 会查找与该键关联的最新值并将其返回
```bash
 db_set 42 '{"name":"San Francisco","attractions":["Exploratorium"]}'

$ db_get 42
{"name":"San Francisco","attractions":["Exploratorium"]}

$ cat database
123456,{"name":"London","attractions":["Big Ben","London Eye"]}
42,{"name":"San Francisco","attractions":["Golden Gate Bridge"]}
42,{"name":"San Francisco","attractions":["Exploratorium"]}
```


另一方面，如果这个数据库中有着大量记录，则这个 db_get 函数的性能会非常糟糕。每次你想查找一个键时，db_get 必须从头到尾扫描整个数据库文件来查找键的出现。用算法的语言来说，查找的开销是 O(n) ：如果数据库记录数量 n 翻了一倍，查找时间也要翻一倍。这就不好了。

为了高效查找数据库中特定键的值，我们需要一个数据结构：索引（index）。本章将介绍一系列的索引结构，并在它们之间进行比较。索引背后的大致思想是通过保存一些额外的元数据作为路标来帮助你找到想要的数据

### 散列索引

保留一个内存中的散列映射，其中每个键都映射到数据文件中的一个字节偏移量，指明了可以找到对应值的位置

当你将新的键值对追加写入文件中时，还要更新散列映射，以反映刚刚写入的数据的偏移量（这同时适用于更新现有键）。当你想查找一个值时，使用散列映射来查找数据文件中的偏移量，寻找（seek） 该位置并读取该值即可

![](imgs/fig3-1.png)
*以类 CSV 格式存储键值对的日志，并使用内存散列映射进行索引。*

这是一个可行的方法。现实中，Bitcask 实际上就是这么做的（Riak 中默认的存储引擎.像 Bitcask 这样的存储引擎非常适合每个键的值经常更新的情况
键可能是某个猫咪视频的网址（URL），而值可能是该视频被播放的次数（每次有人点击播放按钮时递增）

到目前为止，我们只是在追加写入一个文件 —— 所以如何避免最终用完硬盘空间？一种好的解决方案是，将日志分为特定大小的 段（segment），当日志增长到特定尺寸时关闭当前段文件，并开始写入一个新的段文件。然后，我们就可以对这些段进行 压缩（compaction）这里的压缩意味着在日志中丢弃重复的键，只保留每个键的最近更新。

![](imgs/fig3-2.png)

### 同时执行段的压缩和合并

日志为什么仅追加而不是用新值覆盖旧值

- 崩溃恢复：如果段文件是仅追加的或不可变的，并发和崩溃恢复就简单多了。例如，当一个数据值被更新的时候发生崩溃，你不用担心文件里将会同时包含旧值和新值各自的一部分

![](imgs/fig3-3.png)


## SSTable(sort string table)


### 稀疏的内存索引

为了在文件中找到一个特定的键，你不再需要在内存中保存所有键的索引。以 图 3-5 为例：假设你正在内存中寻找键 handiwork，但是你不知道这个键在段文件中的确切偏移量。然而，你知道 handbag 和 handsome 的偏移，而且由于排序特性，你知道 handiwork 必须出现在这两者之间。这意味着你可以跳到 handbag 的偏移位置并从那里扫描，直到你找到 handiwork（或没找到，如果该文件中没有该键）。

![](imgs/fig3-4.png)

你仍然需要一个内存中的索引来告诉你一些键的偏移量，但它可以是稀疏的：每几千字节的段文件有一个键就足够了，因为几千字节可以很快地被扫描完 

### 构建和维护SSTables

- 有新写入时，将其添加到内存中的平衡树数据结构（例如红黑树）。这个内存树有时被称为 内存表（memtable）。
- 当 内存表 大于某个阈值（通常为几兆字节）时，将其作为 SSTable 文件写入硬盘。这可以高效地完成，因为树已经维护了按键排序的键值对。新的 SSTable 文件将成为数据库中最新的段。当该 SSTable 被写入硬盘时，新的写入可以在一个新的内存表实例上继续进行。
- 收到读取请求时，首先尝试在内存表中找到对应的键，如果没有就在最近的硬盘段中寻找，如果还没有就在下一个较旧的段中继续寻找，以此类推。
- 时不时地，在后台运行一个合并和压缩过程，以合并段文件并将已覆盖或已删除的值丢弃掉。

LevelDB【6】和 RocksDB【7】这些键值存储引擎库所使用的技术


::: info
Lucene，是一种全文搜索的索引引擎，在 Elasticsearch 和 Solr 被使用，它使用类似的方法来存储它的关键词词典【12,13】。全文索引比键值索引复杂得多，但是基于类似的想法：在搜索查询中，由一个给定的单词，找到提及单词的所有文档（网页、产品描述等）。这也是通过键值结构实现的：其中键是 单词（term），值是所有包含该单词的文档的 ID 列表（postings list）。在 Lucene 中，从词语到记录列表的这种映射保存在类似于 SSTable 的有序文件中，并根据需要在后台执行合并
:::

### B树

前面讨论的日志结构索引看起来已经相当可用了，但它们却不是最常见的索引类型。使用最广泛的索引结构和日志结构索引，是我们接下来要讨论的 B 树。

像 SSTables 一样，B 树保持按键排序的键值对，这允许高效的键值查找和范围查询

### 全文搜索和模糊索引

全文搜索引擎通常允许搜索目标从一个单词扩展为包括该单词的同义词，忽略单词的语法变体。搜索类似的键，如拼写错误的单词


## 在内存中读取一切

本章到目前为止讨论的数据结构都是对硬盘限制的应对，对于磁性硬盘和固态硬盘，如果要在读取和写入时获得良好性能，则需要仔细地布置硬盘上的数据。
但是，我们能容忍这种麻烦，因为硬盘有两个显著的优点：它们是持久的（它们的内容在电源关闭时不会丢失），并且每 GB 的成本比 RAM 低。

某些内存中的键值存储（如 Memcached）仅用于缓存，在重新启动计算机时丢失的数据是可以接受的。

内存数据库的目标是持久性，重新启动计算机时丢失的数据是可以接受的。
定时快照写入硬盘


## 事务处理还是分析

分析查询需要扫描大量记录，每个记录只读取几列，并计算汇总统计信息（如计数、总和或平均值），而不是将原始数据返回给用户
销售交易表，那么分析查询可能是：

- 一月份每个商店的总收入是多少？
- 在最近的推广活动中多卖了多少香蕉？
- 哪个牌子的婴儿食品最常与 X 品牌的尿布同时购买？

## 数据仓库

数据仓库包含公司各种 OLTP 系统中所有的只读数据副本
从 OLTP 数据库中提取数据（使用定期的数据转储或连续的更新流,将数据存入仓库的过程称为 “抽取 - 转换 - 加载（ETL）
![](imgs/fig3-8.png)


## 列式存储和行式存储