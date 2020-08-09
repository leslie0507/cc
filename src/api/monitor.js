import request from '../lib/ajax';


export const queryDataInfo = (params) => request.post("/analysis/queryDataInfo",  params )

export const ScanPatient = () => request.get("/Born/ScanPatient")

export const CreateNewPatient = params => request.post("/Born/CreateNewPatient",params)

export const SetSystemTime = params => request.post("/Born/SetSystemTime",params,{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})

export const UserSetting = params => request.post("/Born/UserSetting",params,{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})

export const StartGuard = params => request.post("/Born/StartGuard",params,{
  headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
})





