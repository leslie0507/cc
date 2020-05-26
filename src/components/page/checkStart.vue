<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                检测
                <button class="el-btn btn-1 btn-back">
                    <span class="triangle-left"></span>
                    返回
                </button>
            </div>
            <div class="btn-wrapper">
                <div class="el-btn-info-lv begin-btn">
                    <span>开始</span>
                </div>
            </div>
            <!-- 症状内容区域 -->
            <div class="symptom-wrapper">
               
                <div class="symptom-title">适 应 症</div>
                <div class="symptom-content">早期脑出血，早期脑梗塞，脑积水，脑萎缩，单纯脑水肿，脑组织坏死</div>

               
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
            elName: '',
            curStartTime: '2019-07-31 08:00:00',
            day: '0',
            hour: '00',
            min: '00',
            second: '00',

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
    mounted() {
        // this.curStartTime = '2020-08-09';
        // this.countTime();
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
.setting-user-input {
    width: 274px;
    height: 50px;
    margin-left: 14px;
}

// 墙纸
.login-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .loading-img {
        width: 504px;
        height: 286px;
        background: #e1ecef;

        box-shadow: 0px 4px 10px 0px rgba(12, 3, 6, 0.2);
        border-radius: 8px;

        .title {
            width: 504px;
            height: 60px;
            display: flex;
            justify-content: center;
            color: rgba(119, 127, 143, 1);
            align-items: center;
            background: linear-gradient(0deg, rgba(230, 230, 230, 1), rgba(255, 255, 255, 1));
            box-shadow: 0px 2px 4px 0px rgba(12, 3, 6, 0.1), 0px -8px 18px 0px rgba(255, 255, 255, 0.9);
            border-radius: 8px 8px 0 0;
            font-size: 24px;
            font-weight: bold;

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
        .btn-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 26px 0 36px 0;

            border-bottom: 1px solid rgba(153, 153, 153, 1);
            margin: 0 30px 0 22px;

            .begin-btn {
                width: 208px;
                height: 120px;
                font-size: 40px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                line-height: 120px;
                text-shadow: 0px 2px 0px rgba(12, 3, 7, 0.4);
                text-align: center;
            }
        }
        .symptom-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            text-align: center;
            font-size: 14px;
            color: #666666;
            .symptom-title {
                width: 70px;
                position: absolute;
                left: 213px;
                bottom: 31px;
                background: #e1ecef;
                 font-weight: bold;
            }
            .symptom-content {   
                text-align: center;
                padding: 10px;
            }
        }
    }
}
</style>