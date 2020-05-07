import request from '../lib/ajax';


export const getAuditNumber = (params) => request.post("/auth/getAuditNumber",  params )

export const deleteWuliuCase = (params) => request.post("/auth/deleteWuliuCase",  params )

export const inputWuliuCaseData = (params) => request.post("/auth/inputWuliuCaseData",  params )

export const queryPosUpdateList = (params) => request.post("/auth/queryPosUpdateList",  params )

export const queryWuliuCaseAuditList = (params) => request.post("/auth/queryWuliuCaseAuditList",  params )

export const queryWuliuCaseDetail = (params) => request.post("/auth/queryWuliuCaseDetail",  params )

export const updateAuditStatus = (params) => request.post("/auth/updateAuditStatus",  params )

export const updateShopPos = (params) => request.post("/auth/updateShopPos",  params )

export const getWuliuCaseData = (params) => request.post("/auth/getWuliuCaseData",  params )






