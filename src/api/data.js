import request from '../lib/ajax';


export const queryWuliuList = (params) => request.post("/data/queryWuliuList",  params )

export const queryXiaoshouData = (params) => request.post("/data/queryXiaoshouData",  params )
 
export const queryPostList = (params) => request.post("/data/queryPosList",  params )

export const editWuliuInfo = (params) => request.post("/data/editWuliuInfo",  params )

export const deleteWuliuInfo = (params) => request.post("/data/deleteWuliuInfo",  params )

export const queryWuliuLast = (params) => request.post("/data/queryWuliuLast",  params )

export const queryFeifaShop = (params) => request.post("/data/queryFeifaShop",  params )

export const queryZhuanMaiHuList = (params) => request.post("/data/queryZhuanMaiHuList",  params )

export const setShopStart = (params) => request.post("/data/setShopStart",  params )

export const getDepartmentCaseData = (params) => request.post("/data/getDepartmentCaseData",  params )

export const EditCaseBrief = (params) => request.post("/user/EditCaseBrief",  params )

export const DeleteCaseBrief = (params) => request.post("/user/DeleteCaseBrief",  params )

export const deleteDepartmentInfo = (params) => request.post("/user/deleteDepartmentInfo",  params )

export const GetCaseBrief = (params) => request.post("/user/GetCaseBrief",  params )

export const getDepartmentInfo = (params) => request.post("/user/getDepartmentInfo",  params )

export const analysisData = (params) => request.post("/analysis/analysisData",  params )

export const EditDepartmentInfo = (params) => request.post("/user/EditDepartmentInfo",  params )

export const editDepartmentCaseData = (params) => request.post("/data/editDepartmentCaseData",  params )

export const createDepartmentCaseData = (params) => request.post("/data/createDepartmentCaseData",  params )

export const queryCluesData = (params) => request.post("/data/getFujinShop",  params )

 













