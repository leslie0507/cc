import request from '../lib/ajax';


export const queryDataInfo = (params) => request.post("/analysis/queryDataInfo",  params )

export const ScanPatient = () => request.get("/Born/ScanPatient")

export const CreateNewPatient = params => request.post("/Born/CreateNewPatient",params)





