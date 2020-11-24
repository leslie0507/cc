import request from '../lib/ajax';


export const queryDataInfo = (params) => request.post("/analysis/queryDataInfo",  params )

export const ScanPatient = () => request.get("/Born/ScanPatient")

export const CreateNewPatient = params => request.post("/Born/CreateNewPatient",qs.stringify(params),{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})

export const SetSystemTime = params => request.post("/Born/SetSystemTime",params,{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})

export const UserSetting = params => request.post("/Born/UserSetting",params,{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})

import qs from 'qs';
export const StartGuard = params => request.post("/Born/StartGuard", qs.stringify(params),{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})

export const StopGuard = params => request.post("/Born/StopGuard", qs.stringify(params),{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})

export const UpdateUserPassword = params => request.post("/Born/UpdateUserPassword",params,{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})

export const CheckPassword = params => request.post("/Born/CheckPassword",qs.stringify(params),{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})


export const DeletePatient = params => request.post("/Born/DeletePatient",qs.stringify(params),{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})


export const updatePatientData = params => request.post("/Born/updatePatientData",qs.stringify(params),{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})

export const UpdatePatientDiagnosis = params => request.post("/Born/UpdatePatientDiagnosis",qs.stringify(params),{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})

export const ScanPatientData = params => request.post("/Born/ScanPatientData",qs.stringify(params),{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})






