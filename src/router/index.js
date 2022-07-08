import Vue from "vue";
import VueRouter from "vue-router";
import { ROLE, PATH } from "../common/const";

const Error = () => import("../components/content/Error");
const Login = () => import("../views/auth/Login");
const Home = () => import("../views/Home");
const CommodityManagement = () =>
  import("../views/commodity/CommodityManagement");
const CommodityClassification = () =>
  import("../views/commodity/CommodityClassification");
const InventoryManagement = () => import("../views/inventory/InventoryManagement");
const InventoryCheck = () => import("../views/inventory/InventoryCheck");
const InventoryOperation = () =>
  import("../views/inventory/InventoryOperation");
const InventoryIn = () => import("../views/inventory/InventoryIn");
const InventoryOut = () => import("../views/inventory/InventoryOut");
const InventoryLoss = () => import("../views/inventory/InventoryLoss");
const InventoryOverflow = () => import("../views/inventory/InventoryOverflow");
const InventoryPresent = () => import("../views/inventory/InventoryPresent");
const InventoryView = () => import("../views/inventory/InventoryView");
const InventoryWarning = () => import("../views/inventory/InventoryWarning");
const PurchaseView = () => import("../views/purchase/PurchaseView");
const PurchaseReturnView = () => import("../views/purchase/PurchaseReturnView");
const SaleView = () => import("../views/sale/SaleView");
const SaleViewReturn  = () => import("../views/sale/SalesReturnView");
const CustomerView = () => import ("../views/purchase/CustomerView");
const Approval = () => import("../views/approval/Approval");
const Sale_strategy = () => import("../views/approval/SaleStrategy");
const Fin_Dollar = () => import("../views/approval/FinDollarStrategy");
const Employee_management = () => import("../views/hr/employee_management")
const Employee_salary_service = () => import("../views/hr/employee_salary_service");
const Finance_account = () => import("../views/finance/account_management");
const Finance_collection_sheet = () => import("../views/finance/collection_sheet");
const Finance_purchase_sheet = () => import("../views/finance/purchase_sheet");
const Finance_salary_sheet = () => import("../views/finance/salary_sheet");
const Finance_sale_detail = () => import("../views/finance/sale_detail");
const Finance_history_sheet = () => import("../views/finance/history_sheet");
const Finance_processing = () => import("../views/finance/processing");


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/error",
    component: Error
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: () => import("@/views/auth/register.vue")
  },
  // 商品管理
  {
    path: PATH.COMMODITY_CLASSIFICATION.path,
    component: CommodityClassification,
    meta: { requiresAuth: PATH.COMMODITY_CLASSIFICATION.requiresAuth }
  },
  {
    path: PATH.COMMODITY_MANAGEMENT.path,
    component: CommodityManagement,
    meta: { requiresAuth: PATH.COMMODITY_MANAGEMENT.requiresAuth }
  },
  // 库存管理
  {
    path: PATH.INVENTORY_MANAGEMENT.path,
    component: InventoryManagement,
    meta: { requiresAuth: PATH.INVENTORY_MANAGEMENT.requiresAuth }
  },
  {
    path: PATH.INVENTORY_CHECK.path,
    component: InventoryCheck,
    meta: { requiresAuth: PATH.INVENTORY_CHECK.requiresAuth }
  },
  {
    path: PATH.INVENTORY_OPERATION.path,
    component: InventoryOperation,
    name: "InventoryOperation",
    meta: { requiresAuth: PATH.INVENTORY_OPERATION.requiresAuth }
  },
  {
    path: PATH.INVENTORY_IN.path,
    component: InventoryIn,
    name: "InventoryIn",
    meta: { requiresAuth: PATH.INVENTORY_LOSS.requiresAuth }
  },
  {
    path: PATH.INVENTORY_OUT.path,
    component: InventoryOut,
    name: "InventoryOut",
    meta: { requiresAuth: PATH.INVENTORY_LOSS.requiresAuth }
  },
  {
    path: PATH.INVENTORY_LOSS.path,
    component: InventoryLoss,
    name: "InventoryLoss",
    meta: { requiresAuth: PATH.INVENTORY_LOSS.requiresAuth }
  },
  {
    path: PATH.INVENTORY_OVERFLOW.path,
    component: InventoryOverflow,
    name: "InventoryOverflow",
    meta: { requiresAuth: PATH.INVENTORY_OVERFLOW.requiresAuth }
  },
  {
    path: PATH.INVENTORY_PRESENT.path,
    component: InventoryPresent,
    name: "InventoryPresent",
    meta: { requiresAuth: PATH.INVENTORY_PRESENT.requiresAuth }
  },
  {
    path: PATH.INVENTORY_VIEW.path,
    component: InventoryView,
    meta: { requiresAuth: PATH.INVENTORY_VIEW.requiresAuth }
  },
  {
    path: PATH.INVENTORY_WARNING.path,
    component: InventoryWarning,
    name: "InventoryWarning",
    meta: { requiresAuth: PATH.INVENTORY_WARNING.requiresAuth }
  },
  // 销售管理
  {
    path: PATH.PURCHASE_VIEW.path,
    component: PurchaseView,
    name: "PurchaseView",
    meta: { requiresAuth: PATH.PURCHASE_VIEW.requiresAuth }
  },
  {
    path: PATH.PURCHASE_RETURN_VIEW.path,
    component: PurchaseReturnView,
    name: "PurchaseReturnView",
    meta: { requiresAuth: PATH.PURCHASE_RETURN_VIEW.requiresAuth }
  },
  {
    path: PATH.SALE_VIEW.path,
    component: SaleView,
    name: "SaleView",
    meta: { requiresAuth: PATH.SALE_VIEW.requiresAuth }
  },
  {
    path: PATH.SALE_VIEW_RETURN.path,
    component: SaleViewReturn,
    name: "SaleViewReturn",
    meta: { requiresAuth: PATH.SALE_VIEW_RETURN.requiresAuth }
  },
  {
    path: PATH.CUSTOMER_VIEW.path,
    component: CustomerView,
    name: "CustomerView",
    meta: { requiresAuth: PATH.CUSTOMER_VIEW.requiresAuth }
  },
  // 审批
  {
    path: PATH.GM_APPROVAL.path,
    component: Approval,
    meta: { requiresAuth: PATH.GM_APPROVAL.requiresAuth }
  },
  {
    path: PATH.GM_SALE_STRATEGY.path,
    component: Sale_strategy,
    meta: { requiresAuth: PATH.GM_SALE_STRATEGY.requiresAuth }
  },
  {
    path: PATH.GM_FIN_DOLLAR.path,
    component: Fin_Dollar,
    meta: { requiresAuth: PATH.GM_FIN_DOLLAR.requiresAuth }
  },
  {
    path: PATH.GM_SALE_DETAIL.path,
    component: Finance_sale_detail,
    meta: { requiresAuth: PATH.GM_SALE_DETAIL.requiresAuth }
  },
  {
    path: PATH.GM_HISTORY_SHEET.path,
    component: Finance_history_sheet,
    meta: { requiresAuth: PATH.GM_HISTORY_SHEET.requiresAuth }
  },
  {
    path: PATH.GM_PROCESSING.path,
    component: Finance_processing,
    meta: { requiresAuth: PATH.GM_PROCESSING.requiresAuth }
  },
  //HR
  {
    path: PATH.EMPLOYEE_MANAGEMENT.path,
    component: Employee_management,
    meta: { requiresAuth: PATH.EMPLOYEE_MANAGEMENT.requiresAuth }
  },
  {
    path: PATH.EMPLOYEE_SALARY_SERVICE.path,
    component: Employee_salary_service,
    meta: { requiresAuth: PATH.EMPLOYEE_SALARY_SERVICE.requiresAuth }
  },
  //FINANCE
  {
    path: PATH.FINANCE_ACCOUNT.path,
    component: Finance_account,
    meta: { requiresAuth: PATH.FINANCE_ACCOUNT.requiresAuth }
  },
  {
    path: PATH.FINANCE_COLLECTION_SHEET.path,
    component: Finance_collection_sheet,
    meta: { requiresAuth: PATH.FINANCE_COLLECTION_SHEET.requiresAuth }
  },
  {
    path: PATH.FINANCE_PURCHASE_SHEET.path,
    component: Finance_purchase_sheet,
    meta: { requiresAuth: PATH.FINANCE_PURCHASE_SHEET.requiresAuth }
  },
  {
    path: PATH.FINANCE_SALARY_SHEET.path,
    component: Finance_salary_sheet,
    meta: { requiresAuth: PATH.FINANCE_SALARY_SHEET.requiresAuth }
  },
  {
    path: PATH.FINANCE_SALE_DETAIL.path,
    component: Finance_sale_detail,
    meta: { requiresAuth: PATH.FINANCE_SALE_DETAIL.requiresAuth }
  },
  {
    path: PATH.FINANCE_HISTORY_SHEET.path,
    component: Finance_history_sheet,
    meta: { requiresAuth: PATH.FINANCE_HISTORY_SHEET.requiresAuth }
  },
  {
    path: PATH.FINANCE_PROCESSING.path,
    component: Finance_processing,
    meta: { requiresAuth: PATH.FINANCE_PROCESSING.requiresAuth }
  },





  {
    path: "*",
    redirect: "/error"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  // console.log(to.path);
  if (to.path === "/error" || to.path === "/login") {
    next();
  } else if (to.path === "/") {
    let token = sessionStorage.getItem("token");
    let role = sessionStorage.getItem("role");
    if (token == null || role == null) next("/login");
    else next();
  } else if (to.meta.requiresAuth) {
    if (
      to.meta.requiresAuth.some(
        role => role.toString() === sessionStorage.getItem("role")
      )
    ) {
      //有权限
      // console.log("获得访问权限");
      next()
    } else {
      // console.log("无权限访问");
      next("/"); //无权限,跳回主页
    }
  } else {
    // 非法路径, 直接next (跳转error)
    next();
  }
});

export default router;
