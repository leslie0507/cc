<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                <div class="title-text">设置</div>
                <button class="el-btn btn-1 btn-back">
                    <span class="triangle-left"></span>
                    返回
                </button>
            </div>
            <!-- 设置信息区域-->
            <div class="setting-time-wrapper">
                <!-- 文本框区域 -->
                <div class="input-wrapper">
                    <div>
                        <input class="el-input setting-time-input" type="text" />
                    </div>
                    <div>
                        <input class="el-input setting-time-input" type="text" />
                    </div>
                    <div>
                        <input class="el-input setting-time-input" type="text" />
                    </div>
                    <div>
                        <input class="el-input setting-time-input" type="text" />
                    </div>
                    <div>
                        <input class="el-input setting-time-input" type="text" />
                    </div>
                </div>
                <!-- 时间显示区域 -->
                <div class="time-show-wrapper">
                    <p>2014/9/5 15:55</p>
                </div>
                <!-- 按钮区域 -->
                <div class="btn-wrapper">
                    <button class="el-btn el-btn-primary btn-save">保存修改</button>
                </div>
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
// 输入框大小
.setting-time-input {
    width: 274px;
    height: 50px;
   
}
// 重置文本框内容的输入样式
input[type='text'] {
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
    .loading-img {
        width: 504px;
        height: 586px;
        
        background: #e1ecef;

        box-shadow: 0px 4px 10px 0px rgba(12, 3, 6, 0.2);
        border-radius: 8px;
        

        .title {
             width: 100%;
           
            height: 60px;
            display: flex;
            justify-content: center;

            align-items: center;
            background: linear-gradient(0deg, rgba(230, 230, 230, 1), rgba(255, 255, 255, 1));
            box-shadow: 0px 2px 4px 0px rgba(12, 3, 6, 0.1), 0px -8px 18px 0px rgba(255, 255, 255, 0.9);
            border-radius: 8px 8px 0 0;
            font-size: 24px;
            font-weight: bold;
            color: rgba(153, 153, 153, 1);
            line-height: 30px;
            text-shadow: 0px 2px 0px rgba(255, 255, 255, 1);
            position: relative;
            // 返回按钮定位
            .btn-back {
                position: absolute;
                top: 6px;
                right: 20px;
            }
        }
        .setting-time-wrapper {
             width: 100%;
            

            .input-wrapper {
                 width: 100%;
               
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                padding: 38px 0 15px 0;
                div {
                    margin-bottom: 20px;
                }
            }
            .time-show-wrapper {
                 width: 100%;
                
                font-size: 30px;
                color: rgba(51, 153, 102, 1);
                text-align: center;
            }
            .btn-wrapper {
               
                
                display: flex;
                justify-content: flex-end;
                align-items: center;
                
                padding:27px 20px 20px 0;
                .btn-save {
                    width: 128px;
                    height: 40px;
                    font-size: 18px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    text-shadow: 0px 1px 0px rgba(12, 3, 7, 0.4);
                    text-align: center;
                   
                   
                }
            }
        }
    }
}
</style>