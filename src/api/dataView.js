import request from '../lib/ajax';


export const statisticalCaseBriefData = (params) => request.post("/dataView/statisticalCaseBriefData",  params )
export const statisticalDepartmentData = (params) => request.post("/dataView/statisticalDepartmentData",  params )
export const statisticalHuoYuan = (params) => request.post("/dataView/statisticalHuoYuan",  params )
export const statisticalWuliuShouHuo = (params) => request.post("/dataView/statisticalWuliuShouHuo",  params )
export const statisticalXiaoShouD = (params) => request.post("/dataView/statisticalXiaoShouData",  params )
export const getReportList = (params) => request.post("/report/getReportList",  params )
export const statisticalDepartmentCaseData = (params) => request.post("/dataView/statisticalDepartmentCaseData",  params )












