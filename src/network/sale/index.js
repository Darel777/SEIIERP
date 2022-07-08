import request from "@/network/request"
const testAPI = require("@/apis")

export const getAllSale = config => request._get(testAPI.SALE_ALL, config);//ok
export const createSale = config => request._post(testAPI.SALE_CREATE, config);//ok
export const getAllCustomer = config => request._get(testAPI.SALE_CUSTOMER_QUERY, config)//ok
export const getMaxAmountCustomerOfSalesmanByTime = config => request._get(testAPI.SALE_CUSTOMER_MAX, config)//ok
export const firstApproval = config => request._get(testAPI.SALE_FIRST_APPROVAL, config);//ok
export const secondApproval = config => request._get(testAPI.SALE_SECOND_APPROVAL, config);//ok
export const getSaleBySheetId = config => request._get(testAPI.SALE_FIND_SHEET_BY_ID, config);//ok
export const getAllSalesReturn = config => request._get(testAPI.SALE_RETURN_ALL,config);//ok
export const createSalesReturn = config => request._post(testAPI.SALE_RETURN_CREATE,config);//ok
export const returnFirstApproval = config => request._get(testAPI.SALE_RETURN_FIRST_APPROVAL,config);//ok
export const returnSecondApproval = config => request._get(testAPI.SALE_RETURN_SECOND_APPROVAL,config);//ok