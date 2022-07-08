# 前端第一个大版本更新version1.0发布

# 在1.0之前有31次commit记录，共32次commit记录

# 所有页面均有详细注释

## 一、财务人员项目

​	1.账户管理

​		谁能查看：FINANCIAL_STAFF,GM,ADMIN

​		功能：新增、删除、修改、查看账户（可查看都可以操作）

​		进度：已完成

​	2.制定收款单

​		谁能查看：FINANCIAL_STAFF,GM,ADMIN

​		谁能新建：ABOVE

​		谁能审核：ADMIN，GM

​		进度：已完成

​	3.制定付款单

​		谁能查看：FINANCIAL_STAFF,GM,ADMIN

​		谁能新建：ABOVE

​		谁能审核：ADMIN，GM

​		进度：已完成

​	4.制定工资单

​		谁能查看：FINANCIAL_STAFF,GM,ADMIN,HR

​		谁能新建：FINANCIAL_STAFF,GM,ADMIN

​		一级审核：HR(注意没有ADMIN)

​		二级审核：CEO(注意没有ADMIN)

​		进度：已完成

​	5.明细表

​		谁能查看：FINANCIAL_STAFF,ADMIN,GM

​		谁能筛选：ABOVE

​		进度：已完成

​	6.历程表

​		谁能查看：FINANCIAL_STAFF,ADMIN,GM

​		谁能筛选：ABOVE

​		谁能红冲：FINANCIAL_STAFF,ADMIN

​		进度：已完成

​	7.情况表

​		谁能查看：FINANCIAL_STAFF,ADMIN,GM

​		谁能筛选：ABOVE

​		进度：已完成

​	8.三表生成EXCEL

​		进度：已完成

## 二、员工管理项目

​	1.员工管理

​		谁能查看：HR,ADMIN

​		谁能进行操作：HR,ADMIN

​		包含功能：更改职务、查询员工和签到次数、解雇员工

​	 （创建新员工应该在“没有账号立即创建”模块，故不在这里）

​		进度：已完成

​	2.员工打卡

​		每个人都能打卡 按每月打卡次数发工资

​		进度：已完成

​	3.薪酬规则制定

​		显示并新建规则

​		管理人：HR

​		进度：已完成

## 三、总经理项目

​	1.制定促销策略

​		显示所有单子 出现赠送按钮

​		管理人：总经理

​		进度：已完成

​	2.制定年终奖

​		管理人：总经理

​		进度：已完成

## 四、总览

工程中修改过或是添加的文件：**（括号为行数）**

​	src

​		apis

​			**index.js实现前端到后端的地址接口**（202）

​		components

​			content

​				**Layout.vue左侧边栏修改**（391）

​		network

​			***.js等两个条目为vue components的后端链接函数提供路径**（64）

​		router

​			**index.js提供页面位置**（285）

​		views

​			approval

​				**Approval.vue薪酬规则制定**（99）

​				**FinDollarStrategy.vue年终奖制定**（88）

​				**SaleStrategy.vue薪酬规则制定**（103）

​				appendix

​					**approvalAppendix.vue薪酬规则制定表格**（59）

​					**finDollarStrategyAppendix.vue年终奖制定表格**（71）

​					**saleStrategyAppendix.vue薪酬规则制定表格**（219）

​			finance

​				**account_management.vue账户管理**（159）

​				**collection_sheet.vue制定收款单**（180）

​				**collection_sheet_list.vue收款单附带的显示列表**（153）

​				**history_sheet.vue经营历程表**（321）

​				**processing.vue经营情况表**（90）

​				**purchase_sheet.vue制定付款单**（179）

​				**purchase_sheet_list.vue付款单附带的显示列表**（150）

​				**salary_sheet.vue制定工资单**（145）

​				**salary_sheet_list.vue工资单附带的显示列表**（154）

​				**sale_detail.vue销售明细表**（492）

​				detail_attributes

​					**salereturnsheet.vue明细表的销售退货模块**（90）

​					**salesheet.vue明细表的销售模块**（90）

​				history_attributes

​					**collection_sheet.vue历程表的收款单**（248）

​					**purchase_sheet.vue历程表的付款单**（248）

​					**PurchaseList.vue历程表的进货单**（322）

​					**PurchaseReturnList.vue历程表的进货退货单**（320）

​					**SaleList.vue历程表的销售单**（334）

​					**SalesReturnList.vue历程表的销售退货单**（329）

​					**wagesSheetList.vue历程表的工资单**（241）

​				processing_attributes

​					**processing_list.vue情况表附表**（83）

​			hr

​				**employee_management.vue员工管理**（150）

​				**employee_salary_service.vue员工工资单**（146）

​				**employee_salary_service_list.vue员工工资单便于一级审查**（158）

​			inventory

​				**inventoryCheck.vue查看库存**（170）

​			purchase

​				**Customer.vue客户（新增增加和删除）**（284）

​			sale

​				**salesReturnView.vue销售退货单**（231）

​				components

​					**SalesReturnList.vue销售退货单附表**（202）

## 共计7250行