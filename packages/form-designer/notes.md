## 企业服务
ERP 企业资源规划
功能模块
产品结构管理（BOM）
ERP参与销售计划、采购计划、生产计划的管理
物料需求计划（MRP）
CRM 客户关系管理
HRM 人力资源管理
WMS 仓储管理系统
进销存管理系统
采购管理 销售管理 库存管理 财务管理 
数据管理（业务实体建模，导入，导出，迁移，备份，审计）
元数据设计 （字段设计，业务实体
应用场景（数据治理，数据集成， 数据映射，数据检索，数据挖掘和分析）
组织架构权限（部门、岗位和人员角色）
菜单导航
流程设计
表单设计（可视化拖拽）
OMS 订单管理系统
ICMS 智能门店系统
BMS 结算管理系统 BMS SETTLEMENT MANAGEMENT SYSTEM
SUPERVISION AND SHOP INSPECTION SYSTEM
## 行业提供定制化解决方案

数字化，信息化，智能化革新和转型

零售业及电子商务
金融服务业
物流和运输
医疗行业
制造业
招聘与培训
公共服务与政府


lowcode in:name,description topic:lowcode sort:stars


NebulaAI（企业数智化智能体


竞品调研 | 低代码引擎
| -- | --|
| target audience | to B，to C, for D
|features| 框架,适合定制开户
|usecase |
|casestudy|
| docs |


```ts
export interface Assets {

  sort: ComponentSort;
}

export interface ComponentSort {
  
  groupList: string[],
  cateogoryList: string[]
}



export interface Component {
  isContainer: true,
  nestingRule: {
    childWhiteList: ['Buttton', 'Table'],
    parentWhiteList: ['Tab']
  },
  supports: {
  events: ['onPressEnter','onKeyDown', 'onFocus', 'onBlur']  
}, 
  props: {
    name: 'label',
    title: {
      label: {
        type: 'i118n',
        zh_CN: '标签',
        en_US: 'label'
      },
      tip: {
        type: 'i118n',
        zh_CN: '属性label | 说明: 标签文本内容',
        en_US: 'prop: label | description: label content'
      }
    }
    setters: ['stringSetter', 'numberSetter', 'variableSetter', 'SlotSetter'],
    // show condition
    condition:
    // props联动
}


}
```