<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">登录</div>
            <div class="input-wrapper">
                <input class="el-input password" type="text"  placeholder="密码">
                <div class="bth-wrapper">
                    <button class="el-btn el-btn-info-bs btn-1">
                        <span class="triangle-left"></span>
                        返回
                    </button>
                    <button class="el-btn el-btn-info btn-2">登录</button>
                </div>
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

.btn-1 {
    width:98px;
    height:46px;
    border:1px solid rgba(179, 179, 179, 1);
}
.btn-2 {
    width:142px;
    height:46px;
    color: rgba(255, 255, 255, 1);
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
    background: url(../../assets/icons/background.png) no-repeat center center;
    background-size: cover;
    .loading-img {
        width:400px;
        height:274px;
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
            justify-content: center;
            flex-direction: column;
            align-items: center;
            height:214px;
            padding: 0 75px;
            box-sizing: border-box;
        }
        .title {
            width:400px;
            height:60px;
            display: flex;
            justify-content: center;
            align-items: center;
            background:linear-gradient(0deg,rgba(230,230,230,1),rgba(255,255,255,1));
            // box-shadow:0px 2px 4px 0px rgba(12,3,6,0.1), 0px -8px 18px 0px rgba(255,255,255,0.9);
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