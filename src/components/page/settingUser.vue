<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                <div class="title-text">用户设置</div>
                <button class="el-btn btn-1 btn-back" @click="goSetting">
                    <span class="triangle-left"></span>
                    返回
                </button>
            </div>
            <!-- 设置用户信息区域-->
            <div class="setting-user-wrapper">
                <div class="input-wrapper">
                    <div class="hosp-name">
                        <span>医院名称</span>
                        <input class="el-input setting-user-input" type="text" v-model="user" @change="save"/>
                    </div>

                    <div class="user-pwd">
                        <span>用户密码</span>
                        <input class="el-input setting-user-input" type="password" v-model="password"   @change="save"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { UserSetting } from '@/api/monitor';
export default {
    data() {
        return {
            user:'',
            password:''
        };
    },
    created() {
        sessionStorage.removeItem('ms_user');
        this.param.username = sessionStorage.getItem('userName');
    },
    methods: {
        save(){
            if(!this.user || !this.password) {
                return
            }
            UserSetting({
                user:this.user,
                password:this.password
            }).then(res=>{
                console.log(res)
            })
        },
        goSetting(){
            this.$router.push({
                path: "/setting",
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
.setting-user-input {
    width: 274px;
    height: 50px;
    margin-left: 14px;
}
// 重置文本框内容的输入样式
input[type='text'] {
    font-size: 24px;
    color: rgba(153, 153, 153, 1);
    // 去掉浏览器默认input内容样式
    -webkit-appearance: none;
    -moz-appearance: none;
}
input[type='password'] {
    font-size: 24px;
    color: rgba(153, 153, 153, 1);
    // 去掉浏览器默认input内容样式
    -webkit-appearance: none;
    -moz-appearance: none;
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
        height: 290px;
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
        .setting-user-wrapper {
            width: 504px;
            height: 230px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            font-family: Microsoft YaHei;
            color: rgba(153, 153, 153, 1);
            .input-wrapper {
                div {
                    width: 464px;
                    padding: 18px 0;
                    span {
                        padding-left: 44px;
                    }
                }
                div:last-of-type {
                    border-top: 1px solid rgba(204, 204, 204, 1);
                }
            }
        }
    }
}
</style>