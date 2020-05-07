<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="login-wrapper">
                <div class="logo-img">
                    <img src="../../assets/img/jianwei_logo.png" alt="">
                    <div class="line"></div>
                    <div class="title">
                        <span>CC</span>
                        <span>tobacco market Intelligent supervision system</span>
                    </div>
                </div>
            </div>

            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="icon-User-Icon"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="icon-Lock-Icon"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>

        <systemOpt />
    </div>
</template>

<script>
import systemOpt from '@/components/common/systemOpt'
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
    components:{
        systemOpt
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
/deep/ .el-input-group__prepend {
    padding:0 18px;
}
/deep/ .icon-User-Icon {
    font-size: 18px;
}
/deep/ .icon-Lock-Icon{
    font-size: 18px;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #666;
  font-size: 18px;
}

input:-moz-placeholder, textarea:-moz-placeholder {
  color: #666;
  font-size: 18px;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: #666;
  font-size: 18px;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #666;
  font-size: 18px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 24px;
}
/deep/ .el-form-item__content {
    .el-input-group__prepend {
        background:rgba(255,255,255,.16);
        border: none;
    }
    .el-input__inner {
        padding-left: 0;
        height: 54px;
        font-size: 18px;
        color: #fff;
        background:rgba(255,255,255,.16);
        border: none;
    }
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 10.7%;
    top: 50%;
    width: 400px;
    margin: -190px 0 0 0;
    border-radius: 5px;
    /* background: rgba(255, 255, 255, 0.3); */
    overflow: hidden;
    .logo-img {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
            width:112px;
            height:48px;
        }
        .line {
            width:1px;
            height:40px;
            background:rgba(255,255,255,1);
            opacity:0.16;
            display: inline-block;
        }
        .title {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span {
                &:nth-child(1) {
                    font-size:24px;
                    font-weight:300;
                    line-height:36px;
                    color:rgba(255,255,255,1);
                }
                &:nth-child(2){
                    font-size:12px;
                    color:rgba(255,255,255,1);
                    opacity:0.32;
                }
            }
        }
    }
}
.ms-content {
    margin-top: 52px;
    // padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    width:400px;
    height:48px;
    background:rgba(31,93,234,1);
    border: none;
    opacity:1;
    border-radius:4px;
    font-size:20px;
    font-weight:400;
    line-height:26px;
    color:rgba(255,255,255,1);
    opacity:1;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
/deep/ .icon-User-Icon ,/deep/ .icon-Lock-Icon{
    &::before {
        color: #fff !important;
    }
}
</style>