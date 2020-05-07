import request from '../lib/ajax';

export const fetchData = query => {
    return request({
        url: '',
        method: 'get',
        params: query
    });
};

export const uploadFile = data =>  request.post('/data/uploadExcel',data,{
    headers: { 'Content-Type': 'multipart/form-data' }
})

export const checkStatus = (params) =>  request.post("/data/checkStatus",  params)
