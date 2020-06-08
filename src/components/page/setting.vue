<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                <div class="title-text">设置</div>
                <button class="el-btn btn-1 btn-back" @click="gohomepage">
                    <span class="triangle-left"></span>
                    返回
                </button>
            </div>
            <!-- 设置信息区域-->
            <div class="setting-wrapper">
                <ul>
                    <li @click="goSettingTime">显示设置</li>
                    <li @click="goSettingUser">用户设置</li>
                    <li @click="">后台硬件维护</li>
                    <li @click="">语言设置</li>
                    <li @click="">恢复出厂设置</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { Login } from '@/api/user';
import { queryPostList } from '@/api/data';
let passwordRule = (rule, value, callback) => {
    if (value.length >= 6) {
        callback();
    } else {
        callback(new Error('密码长度不能少于6位'));
    }
};
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { validator: passwordRule, trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        sessionStorage.removeItem('ms_user');
        this.param.username = sessionStorage.getItem('userName');
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    Login({
                        account: this.param.username,
                        pwd: this.param.password
                    })
                        .then(res => {
                            console.log(this.respSuccess(res));
                            if (!this.respSuccess(res)) {
                                this.resNotice.warning(res.msg, this.respMessage(res));
                                return;
                            }
                            sessionStorage.setItem('ms_user', JSON.stringify(res.data));
                            queryPostList().then(res => {
                                sessionStorage.setItem('expressList', JSON.stringify(res.data));
                                sessionStorage.setItem('userName', this.param.username);
                                this.$router.push('/');
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        goSettingTime(){
            this.$router.push({
                path: "/settingtime",
            });
        },
        goSettingUser(){
            this.$router.push({
                path: "/settingUser",
            });
        },
        gohomepage(){
            this.$router.push({
                path: "/kidNav",
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.btn-1 {
    width: 98px;
    height: 46px;
}
.btn-2 {
    width: 142px;
    height: 46px;
}

.password {
    width: 250px;
    height: 40px;
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
        width: 504px;
        height: 500px;
        background: #e1ecef;
        
        box-shadow: 0px 4px 10px 0px rgba(12, 3, 6, 0.2);
        border-radius: 8px;
        .bth-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        .title {
            width: 504px;
            height: 60px;
            display: flex;
            justify-content: center;

            align-items: center;
            background: linear-gradient(0deg, rgba(230, 230, 230, 1), rgba(255, 255, 255, 1));
            box-shadow: 0px 2px 4px 0px rgba(12, 3, 6, 0.1);
            border-radius: 8px 8px 0 0;
            font-size: 24px;
            font-weight: bold;
            color: rgba(153, 153, 153, 1);
            line-height: 30px;
            text-shadow: 0px 2px 0px rgba(255, 255, 255, 1);
            position: relative;
            // 返回按钮定位
            .btn-back {
            	width: 98px;
            	height: 48px;
            	position: absolute;
            	top: 6px;
            	right: 20px;
            	color: rgba(119, 127, 143, 1);
            	background: url(../../assets/icons/back-btn.png) no-repeat;
            	background-size: cover;
            }
        }
        .setting-wrapper {
            width: 504px;
            height: 440px;
           
            ul {
                list-style: none;
                margin: 0 20px;
                li {
                    cursor: pointer; 
                    width: 100%;
                    height:85px;
                    font-size: 24px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(119, 127, 143, 1);
                    text-align: center;
                   line-height: 85px;
                    border-bottom: 1px solid rgba(204,204,204,1) ;
                }
                // 去掉最后一个li下边框
                li:last-of-type{
                    border:none;
                }
            }
        }
    }
}
</style>