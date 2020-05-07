import request from '../lib/ajax';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};


export const getUserList = params => request.post("/user/getUserList", params )

export const getDepartmentInfo = params => request.post("/user/getDepartmentInfo", params )
export const  GetCaseBrief = params => request.post("/user/GetCaseBrief", params )

export const addUser = params => request.post("/user/addUser", params )

export const updateUser = params => request.post("/user/updateUser", params )

export const deleteUser = params => request.post("/user/deleteUser", params )

export const resetUserPwd = params => request.post("/user/resetUserPwd", params )

export const unbundlingWeichat = params => request.post("/user/unbundlingWeichat", params )



export const DeleteCaseBrief = (query) => request.get("/user/DeleteCaseBrief", { params: params })

export const EditDepartmentInfo = (query) => request({
    url: '/user/EditDepartmentInfo',
    method: 'get',
    params: query
})

export const Login = (params) =>  request.post("/user/Login",  params)


export const deleteDepartmentInfo = (query) => request({
    url: '/user/deleteDepartmentInfo',
    method: 'get',
    params: query
})

export const getLoginUser = (query) => request({
    url: '/user/getLoginUser',
    method: 'get',
    params: query
})

export const userLogout = (query) => request({
    url: '/user/userLogout',
    method: 'get',
    params: query
})

