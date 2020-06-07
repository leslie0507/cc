<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                <div></div>
                检测结果
                <button class="el-btn btn-1">
                    <span class="triangle-left"></span>
                    返回
                </button>
            </div>
            <div class="input-wrapper">
                <ul>
                    <li v-for="i in 2">
                       <div class="left">脑水肿</div> 
                       <div class="right">
                            <img src="" alt="">疑似
                        </div> 
                    </li>
                </ul>
            </div>

            <div class="btn-wrapper">
                <button class="el-btn btn-1">
                    重新检测
                </button>
                <button class="el-btn btn-1">
                    打印
                </button>
            </div>
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
        height:417px;
        background:#E1ECEF;
        box-shadow:0px 4px 10px 0px rgba(12,3,6,0.2);
        border-radius:8px;
        .bth-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
        .btn-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 23px 20px 20px 20px;
        }
        .input-wrapper {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 23px 20px 20px 20px;
            box-sizing: border-box;
            ul {
                background: rgba(248, 245, 250, 1);
                width: 100%;
                padding: 17px 19px;
                li {
                    font-size:24px;
                    font-weight:400;
                    color:rgba(191,191,191,1);
                    line-height:48px;
                    list-style-type: none;
                    border-bottom: 1px solid rgba(204,204,204,1);
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
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
            text-align: center;
        }
    }
}
</style>