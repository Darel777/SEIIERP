// 部署url
export const REQUEST_BASE_URL_PROD = "http://ismzl.com/";
// 开发url （mock的地址
export const REQUEST_BASE_URL_DEV = "http://localhost:8080";

export const ROLE = {
  INVENTORY_MANAGER: "INVENTORY_MANAGER", //库存管理人员
  SALE_STAFF: "SALE_STAFF", // 进货销售人员
  SALE_MANAGER: "SALE_MANAGER", //销售经理
  FINANCIAL_STAFF: "FINANCIAL_STAFF", // 财务人员
  HR: "HR", // 人力资源人员
  GM: "GM", // 总经理
  ADMIN: "ADMIN" // 最高权限
};


export const PATH = {
  // INVENTORY_MANAGER
  COMMODITY_CLASSIFICATION: {
    path: '/commodityClassification',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  COMMODITY_MANAGEMENT: {
    path: '/commodityManagement',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_MANAGEMENT: {
    path: '/inventoryManagement',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_OPERATION: {
    path: '/inventoryOperation',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_CHECK: {
    path: '/inventoryCheck',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_IN: {
    path: '/inventoryIn',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_OUT: {
    path: '/inventoryOut',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_LOSS: {
    path: '/inventoryLoss',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_WARNING: {
    path: '/inventoryWarning',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_OVERFLOW: {
    path: '/inventoryOverflow',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_PRESENT: {
    path: '/inventoryPresent',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_VIEW: {
    path: '/inventoryView',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  // SALE_STAFF & SALE_MANAGER
  PURCHASE_VIEW: {
    path: '/purchaseView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  PURCHASE_RETURN_VIEW: {
    path: '/purchaseReturnView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  SALE_VIEW: {
    path: '/saleView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  SALE_VIEW_RETURN: {
    path: '/salesReturnView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  CUSTOMER_VIEW: {
    path: '/customerView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  // GM
  //审批
  GM_APPROVAL: {
    path: '/approval',
    requiresAuth: [ROLE.GM,ROLE.ADMIN,ROLE.HR]
  },
  //促销策略
  GM_SALE_STRATEGY:{
    path: '/gm-sale-strategy',
    requiresAuth: [ROLE.GM,ROLE.ADMIN]
  },
  //制定年终奖
  GM_FIN_DOLLAR:{
    path: '/gm-fin-dollar',
    requiresAuth: [ROLE.GM,ROLE.ADMIN]
  },
  //查看销售明细表
  GM_SALE_DETAIL:{
    path: '/finance-sale-detail',
    requiresAuth: [ROLE.GM,ROLE.ADMIN,ROLE.FINANCIAL_STAFF]
  },
  //查看经营历程表
  GM_HISTORY_SHEET:{
    path: '/finance-history-sheet',
    requiresAuth: [ROLE.GM,ROLE.ADMIN,ROLE.FINANCIAL_STAFF]
  },
  //查看经营情况表
  GM_PROCESSING:{
    path: '/finance-processing',
    requiresAuth: [ROLE.GM,ROLE.ADMIN,ROLE.FINANCIAL_STAFF]
  },
  //FINANCIAL
  //财务——账户管理
  FINANCE_ACCOUNT:{
    path: '/finance-account',
    requiresAuth: [ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  //财务——制定收款单
  FINANCE_COLLECTION_SHEET:{
    path: '/finance-collection-sheet',
    requiresAuth: [ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  //财务——制定付款单
  FINANCE_PURCHASE_SHEET:{
    path: '/finance-purchase-sheet',
    requiresAuth: [ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  //财务——制定工资单
  FINANCE_SALARY_SHEET:{
    path: '/finance-salary-sheet',
    requiresAuth: [ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  //财务——查看销售明细表
  FINANCE_SALE_DETAIL:{
    path: '/finance-sale-detail',
    requiresAuth: [ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  //财务——查看经营历程表
  FINANCE_HISTORY_SHEET:{
    path: '/finance-history-sheet',
    requiresAuth: [ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  //财务——查看经营情况表
  FINANCE_PROCESSING:{
    path: '/finance-processing',
    requiresAuth: [ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  //财务——期初建账
  FINANCE_SETUP:{
    path: '/finance-setup',
    requiresAuth: [ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  //HR
  //员工管理
  EMPLOYEE_MANAGEMENT:{
    path: '/employee-management',
    requiresAuth: [ROLE.HR,ROLE.ADMIN]
  },
  //员工打卡（通过按钮实现）
  //薪酬规则制定
  EMPLOYEE_SALARY_SERVICE:{
    path: '/employee-salary-service',
    requiresAuth: [ROLE.HR,ROLE.ADMIN]
  },
}
