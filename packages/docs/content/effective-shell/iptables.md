## install and setup

### installer


### build from source

### with prefer package manager

```sh
sudo apt update && sudo apt install net-tools build-essentials
```

- iptables
- nmap
- ipset

## features

network address translation NAT
network port translation NPT


## cahins 

| chains    | netfilter hooks      |
|-----------|----------------------|
| preroute  | `NF_IP_PRE_ROUTING`  |
| input     | `NF_IP_LOCAL_IN`     |
| output    | `NF_IP_LOCAL_OUT`    |
| forward   | `NF_IP_FORWARD`      |
| postroute | `NF_IP_POST_ROUTING` |


## Chain Traversal Order


Incoming packets destined for the localhost: PREROUTING -> INPUT
Incoming packets destined to other host: PREROUTING -> FORWARD -> POSTROUTING
Locally generated packets: OUTPUT -> POSTROUTING


## iptable options

`-A`: append rule to the end of selected chain
`-I`: insert rule to positon specific
`-L`: list of rule in selected chain
`F`:  flush the selected chain(all the chains in table if not given)
`Z`: zero the bytes and packet count in all or chains or only the given chain
`-D`: delete one or more rules from the selected chain
`-R` replace rule in the selected chain



## rules


### filter by ip or network address
`-s <ip>`, `--source <ip>`

`-d <ip>`, `--destintaion <ip>`


```bash
~ nslookup www.centos.com

~ dig -t A www.centos.com

```


### filter by ip range

Match by IP Range:
- `m iprange --src-range <ip_start>-<ip_end>`
- `-m iprange --dst-range <ip_start>-<ip_end>`

```bash

```


### filter by port

**Match by single port**:
- `-p tcp --dport <port>`
- `-p tcp --sport <port>`


**match by multi prot**
- `-m multiport --sports | --dports [port1,port2]`


**PORT STATUS**

`open`: there is an application that's listening on an open port
`close`:

`filterd`: fireward

### filter by portocol


```sh
~ cat /etc/protocols
```

**match by tcp flags**
- `--syn`

```sh
iptables --protocol tcp --tcp-flags  SYN,RST,ACK,FIN 
```

`SYN` - synchronize
`ACK` - acknowledgement
`FIN` - finalize
`RST` - reset
`URG` - urgent
`PSH` - push
`ALL`
`NONE`


::: details ICMP echo reply
~  iptables --protocol icmp -h

icmp match options:
[!] --icmp-type typename        match icmp type
[!] --icmp-type type[/code]     (or numeric type or type/code)
Valid ICMP Types:
any
echo-reply (pong)
destination-unreachable
   network-unreachable
   host-unreachable
   protocol-unreachable
   port-unreachable
   fragmentation-needed
   source-route-failed
   network-unknown
   host-unknown
   network-prohibited
   host-prohibited
   TOS-network-unreachable
   TOS-host-unreachable
   communication-prohibited
   host-precedence-violation
   precedence-cutoff
source-quench
redirect
   network-redirect
   host-redirect
   TOS-network-redirect
   TOS-host-redirect
echo-request (ping)
router-advertisement
router-solicitation
time-exceeded (ttl-exceeded)
   ttl-zero-during-transit
   ttl-zero-during-reassembly
parameter-problem
   ip-header-bad
   required-option-missing
timestamp-request
timestamp-reply
address-mask-request
address-mask-reply
:::

### filter by interface


**Match by incoming interface**
- `-i --in-interface`

**Match by outgoing interface**
- `-o --out-interface`

### negativing match


### filter by date and time

--datestart 
--datestop
--timestart
--timestop
--monthdays
--weekdays
--kerneltz

### listing rules

`-L`: List all rules in the selected chain. If not chain is selected, all chains are list.
`-v`: verbose output, print interface name, packaet and btyes count
`-n`: avoid reverse DNS lookup. print ip address and prot number instead of domain and service


## policy 

policy can be set by `-P` option
packet not match any rules


```bash
iptables -P INPUT ACCEPT
iptables -P INPUT ACCEPT
iptables -P INPUT ACCEPT
```
classifier(matches) and connected action

filter
nat
mangling 
raw
security


```sh

~ ip addr show dev eth0
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 00:15:5d:d9:77:e5 brd ff:ff:ff:ff:ff:ff
    inet 172.25.106.76/20 brd 172.25.111.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::215:5dff:fed9:77e5/64 scope link
       valid_lft forever preferred_lft forever
```

## writing ip tables in shell scripts


```sh
~ cat /etc/resolv.conf
# This file was automatically generated by WSL. To stop automatic generation of this file, add the following entry to /etc/wsl.conf:
# [network]
# generateResolvConf = false
nameserver 10.255.255.254
~  nmap -p 80,443,22 10.255.255.254

Nmap scan report for 10.255.255.254
Host is up (0.00015s latency).

PORT    STATE  SERVICE
22/tcp  closed ssh
80/tcp  closed http
443/tcp closed https

```


```bash [offline.sh]
iptables -P INPUT DROP
iptables -P OUTPUT DROP

iptables --append INPUT --in-interface lo --jump ACCEPT
iptables --append OUTPUT --out-interface --jump ACCEPT
```




```bash [only-trusted-host.sh]
#!bin/bash

# drop incoming ssh traffic
iptables -A INPUT -p tcp --dropport 22 -j DROP

# drop outgoing http and https traffic
iptables -A INPUT -p tcp -m multiport --dports 80,443 -j DROP


iptables -A INPUT ! --source 192.168.10.24 -p tcp  --dport 443 -j DROP

# allow  trusted host ssh connection
iptables -A INPUT -p tcp --dport 22 -s 192.169.10.24 -j ACCEPT
iptables -A INPUT -p tcp  --dport 22 -s 0.0.0.0/0 -j DROP
```

```bash [block-indian.sh]
#!bin/bash
ipset create asan hash:net -exist
ipset  flush asan
[ -f "in-aggregated.zone"] && rm in-aggregated.zone
curl -L https://www.ipdeny.com/ipblocks/data/aggregated/in-aggregated.zone

if [$? -eq 0]
then 
  echo "Download"
  for address in "cat in-aggregated.zone"
  do 
    ipset add asan $address
  done
else 
  echo "failed to download"
fi


iptables \
--table filter \
--apend INPUT \
--match set  --match-set asan src \
--jump DROP
```
## backup and resotre

load iptables rules at boot time

```bash
~ /sbin/service iptables save
# wrtie iptables config to /etc/sysconfig/iptables

```

```sh
# 备份
ipset save  > /etc/rules/rules.ipset
iptables-save > /etc/rules.iptables

#恢复
ipset restore < /etc/rules.ipset
iptables-restore < /etc/rules.iptables 
```


## connection tracking

state info about connection

**packet states**:

`NEW` - the first packet from a connection
`ESTABLISHED` - packets that are part of an exisiting connection
`RELATED`
`UNTRACKED` - mark as NOTRACK target


> can be set by `-m state  --state` option, where state is comma separated values of packet state

```sh [statful-fireward.sh]


iptables --append INPUT --in-interface lo --jump ACCEPT
iptables --append OUTPUT --out-interface lo --jump ACCEPT

iptables --apend INPUT --match state --state ESTABLISHED,REALTED -j ACCEPT

iptables --apend OUTPUT --match state --state NEW,ESTABLISHED,REALTED -j ACCEPT

iptables -P INPUT DROP
iptables -P OUTPUT DROP
```


## target

`ACEEPT`
`DROP`
`reject`: 
```bash
-j REJECT-reject-with icmp-port-unreachable
```
`TEE`


## NAT


router as gateway
switch as gateway
pc as gateway


:::proxy

```bash
~ netstat -nr
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         172.25.96.1     0.0.0.0         UG        0 0          0 eth0
172.25.96.0     0.0.0.0         255.255.240.0   U         0 0          0 eth0

~  ip route
default via 172.25.96.1 dev eth0 proto kernel
172.25.96.0/20 dev eth0 proto kernel scope link src 172.25.106.76
```
:::

`NAT`: network address translation, involves re-writing the source and/or destintation addres of IP pacckets as they pass through a router or firewall
`SNAT`: source NAT translation
`DNAT`: destination NAT translation


## ip forwading

traffic from LAN to Inernet(outer network) pass through gateway(NAT router)


```bash
echo "1" > /proc/sys/net/ipv4/ip_forward

```

### port forwarding and IP Masquerading

reverse proxy
```sh
iptables --table nat --append PREROUTING -p tcp --dport 80 --jump DNAT --to-destination 10.0.0.2:80
```


```bash

web="80 443"
ssh="22"

for port in $web
do
  iptables --table nat \ 
  --append POSTROUTING \ 
  --protoclo tcp \
  --dport $port \
  --out-interface eth0 \
  --jump MASQUERADE
done 
```


![chain-traverse-for-routed/forward-packet](https://)





allow ports needed for name resolution and accessing the Web interface, respectively.
```
iptables --insert INPUT --interface tun0 -j ACCEPT

iptables --append  INPUT --interface tun0 -p tcp --dport 53 -j ACCEPT
iptables --append  INPUT --interface tun0 -p udp --dport 53 -j ACCEPT
iptables --append  INPUT --interface tun0 -p tcp --dport 80 -j ACCEPT
```


allow any loopback traffic, i.e. the server is allowed to talk to itself without any limitations using 127.0.0.0/8:


```bash
iptables --insert INPUT -i lo -j ACCEPT
```

if no rule has matched up to this point:drop

```bash
iptables -P INPUT DROP
```

As for HTTPS, since that requires a Certificate that matches the domain name to be valid,

cause  the client timing out waiting for the HTTPS response.
In order to avoid the timeout you can use the firewall capabilities of IPTables to reject the connection and the client wont wait for a response as it is told that the site doesn't exist and is not available



```bash
iptables -A INPUT -p tcp --dport 443 -j REJECT --reject-with tcp-reset
iptables -A INPUT -p udp --dport 443 -j REJECT --reject-with icmp-port-unreachable
```


```bash
iptables-save > /etc/pihole/rules.v4

iptables-restore < /etc/pihole/rules.v4
```