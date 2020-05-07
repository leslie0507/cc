import request from '../lib/ajax';


export const assignedDepartment = (params) => request.post("/report/assignedDepartment",  params )
export const deleteReport = (params) => request.post("/report/deleteReport",  params )
export const getAnalysisData = (params) => request.post("/report/getAnalysisData",  params )
export const updateReportInfo = (params) => request.post("/report/updateReportInfo",  params )
export const getReportDetailList = (params) => request.post("/report/getReportDetailList",  params )
export const getReportList = (params) => request.post("/report/getReportList",  params )






