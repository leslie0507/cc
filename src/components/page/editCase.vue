<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                <button class="el-btn btn-2">
                    删除病例
                </button>
                编辑病例
                <button class="el-btn btn-1">
                    <span class="triangle-left"></span>
                    返回
                </button>
            </div>
            <div class="input-wrapper">
                <div class="userinfo">
                    <div class="img-wrapper">
                        <img src="" alt="">
                    </div>
                    <div class="info-wrapper">
                        <div class="item">
                            <div class="label">编号:</div>
                            <div class="value">201408041110368</div>
                        </div>
                        <div class="item">
                            <div class="label">姓名:</div>
                            <div class="value">约翰尼德普</div>
                        </div>
                        <div class="item">
                            <div class="label">年龄:</div>
                            <div class="value">50</div>
                        </div>
                        <div class="item">
                            <div class="label">性别:</div>
                            <div class="value">男</div>
                        </div>
                    </div>
                </div>
            </div>

            <h1><span></span>住院诊断及简要病情</h1>

            <textarea class="el-textarea textarea-1" name="" id="" rows="14" cols="30"></textarea>
        </div>
    </div>
</template>

<script>
import { Login } from '@/api/user';
import { queryPostList } from '@/api/data';
let passwordRule = (rule, value, callback)=>{
    if(value.length>=6) {
        callback();
    }else {
        callback(new Error('密码长度不能少于6位'));
    }
}
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { validator: passwordRule, trigger: 'blur' }
                ],
            },
        };
    },
    created(){
        sessionStorage.removeItem('ms_user');
        this.param.username = sessionStorage.getItem('userName');
    },
    methods: {
        submitForm() {
           
            this.$refs.login.validate(valid => {
                if (valid) {
                    Login({
                        account:this.param.username,
                        pwd:this.param.password
                    }).then(res => {
                        console.log(this.respSuccess(res))
                        if(!this.respSuccess(res)){
                            this.resNotice.warning(res.msg,this.respMessage(res))
                            return
                        }
                        sessionStorage.setItem('ms_user', JSON.stringify(res.data));
                        queryPostList().then(res=>{
                            sessionStorage.setItem('expressList', JSON.stringify(res.data));
                            sessionStorage.setItem('userName', this.param.username);
                            this.$router.push('/');
                        })
                        
                    }).catch(err=>{
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.textarea-1 {
    margin: 0 20px;
    width:464px;
    height:328px;
}
h1 {
    padding-left: 20px;
    font-size:18px;
    font-weight:bold;
    color:rgba(51,153,102,1);
    line-height:35px;
    span {
        display: inline-block;
        margin-right: 10px;
        width:5px;
        height:15px;
        background:rgba(51,153,102,1);
    }
}
.btn-1 {
    width:98px;
    height:48px;
}
.btn-2 {
    width:84px;
    height:30px;
    font-size:14px;
    margin-top: -10px;
}
.password {
    width:250px;height:40px;
    margin-bottom: 39px;
}
.login-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading-img {
        width:504px;
        height:586px;
        background:#E1ECEF;
        box-shadow:0px 4px 10px 0px rgba(12,3,6,0.2);
        border-radius:8px;
        .bth-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
        .input-wrapper {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0px 20px 20px 20px;
            box-sizing: border-box;
            .info-wrapper {
                height: 118px;
                margin-left: 158px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: flex-start;
                .item{ 
                    margin-top: 5px;
                    font-weight: bold;
                    font-size: 16px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .label {
                        color: #777F8F;
                        margin-right: 3px;
                    }
                    .value {
                        color: #4EB6CC;
                    }
                }
            }
            .userinfo {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: flex-end;
                position: relative;
                
                .img-wrapper{
                    width:128px;
                    height:128px;
                    position: absolute;
                    top: -10px;
                    margin-right: 20px;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 2px 5px 0px rgba(12,3,6,0.2);
                    border-radius:10px;
                }
            }
        }
        .title {
            width:100%;
            height:60px;
            padding: 0 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background:linear-gradient(0deg,rgba(230,230,230,1),rgba(255,255,255,1));
            box-shadow:0px 2px 4px 0px rgba(12,3,6,0.1), 0px -8px 18px 0px rgba(255,255,255,0.9);
            border-radius:8px 8px 0 0;
            font-size:24px;
            font-weight:bold;
            color:rgba(153,153,153,1);
            line-height:30px;
            text-shadow:0px 2px 0px rgba(255,255,255,1);
        }
    }
}
</style>