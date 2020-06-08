<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                修改病历
                <button class="el-btn btn-1 btn-back" @click="goMonitor">
                    <span class="triangle-left"></span>
                    返回
                </button>
            </div>
            <!-- 内容显示区域-->
            <div class="main-content-wrapper">
                <!-- 参数区域 -->
                <div class="params-wrapper">
                <div class="params-item">
                        <div class="text">时间</div>
                        <button class="el-btn btn-time">07 2014-12-26 21:02:38</button>
                    </div>
                    <!-- 一条 -->
                    <div class="params-item">
                        <div class="text">脑出血</div>
                        <div class="fill-box">
                            <button class="el-btn btn-default-single">无</button>
                            <div class="input-box">
                                <input type="text" class="el-input el-input-s" placeholder="手术前" />
                                <span>ml</span>
                            </div>
                            <div class="input-box">
                                <input type="text" class="el-input el-input-s" placeholder="手术后" />
                                <span>ml</span>
                            </div>
                        </div>

                        <button class="el-btn el-btn-unknown">未知</button>
                    </div>
                    <!-- 一条 -->
                    <div class="params-item">
                        <div class="text">脑梗塞</div>
                        <div class="fill-box">
                            <button class="el-btn btn-zuhe-actived el-btn-wu-actived">无</button>
                            <button class="el-btn el-btn-youhuaisi">有坏死</button>
                            <button class="el-btn el-btn-wuhuaisi">无坏死</button>
                        </div>
                        <button class="el-btn el-btn-unknown">未知</button>
                    </div>
                    <!-- 一条 -->
                    <div class="params-item">
                        <div class="text">脑积水</div>
                        <div class="fill-box">
                            <button class="el-btn btn-default-single">无</button>
                            <div class="input-box">
                                <input type="text" class="el-input el-input-m" />
                                <span>ml</span>
                            </div>
                        </div>

                        <button class="el-btn el-btn-unknown">未知</button>
                    </div>
                    <!-- 一条 -->
                    <div class="params-item">
                        <div class="text">脑萎缩</div>
                        <div class="fill-box">
                            <button class="el-btn btn-zuhe-actived el-btn-wu-actived">无</button>
                            <button class="el-btn el-btn-qing">轻</button>
                            <button class="el-btn el-btn-zhong">中</button>
                            <button class="el-btn el-btn-chong">重</button>
                        </div>

                        <button class="el-btn el-btn-unknown">未知</button>
                    </div>
                    <!-- 一条 -->
                    <div class="params-item">
                        <div class="text">GCS</div>
                        <div class="fill-box">
                            <div class="input-box">
                                <input type="text" class="el-input el-input-lg" placeholder />
                            </div>
                        </div>
                    </div>
                    <div class="params-item last-item">
                        <div class="text">备注</div>
                        <div class="fill-box">
                            <div class="input-box">
                                <textarea class="el-textarea remarkbox" name="" id=""cols="40"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 按钮区域 -->
                <div class="btn-wrapper">
                    <button class="el-btn blue-btn">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    data() {
        return {
            
        }
    },
    methods: {
        goMonitor(){
            this.$router.push({
                path: "/monitor",
            });
        }
    },
}
</script>

<style lang="scss" scoped>
// 重置文本框内容的输入样式
input[type='text'] {
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
    // 去掉浏览器默认input内容样式
    -webkit-appearance: none;
    -moz-appearance: none;
}
//input框大小选择
.el-input-s {
    width: 100px;
    height: 32px;
}
.el-input-m {
    width: 125px;
    height: 32px;
}
.el-input-lg {
    width: 198px;
    height: 32px;
}
// 重置密码框内容的输入样式
input[type='password'] {
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
    // 去掉浏览器默认input内容样式
    -webkit-appearance: none;
    -moz-appearance: none;
}

//textarea内容样式重置
textarea {
    font-size: 14px;
    color: rgba(89, 89, 89, 1);
    line-height: 30px;
    // 隐藏滚动条
    // overflow-x:hidden;
    // overflow-y:hidden;
}

//最后一项去掉边线
.last-item {
    border: none !important;
}

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
    background: url(../../assets/icons/background.png) no-repeat center;
    background-size: cover;
    .loading-img {
        width: 561px;
        height: 680px;

        background: #e1ecef;

        box-shadow: 0px 4px 10px 0px rgba(12, 3, 6, 0.2);
        border-radius: 8px;

        .title {
            width: 561px;
            height: 60px;
            display: flex;
            justify-content: center;
            color: rgba(119, 127, 143, 1);
            align-items: center;
            background: linear-gradient(0deg, rgba(230, 230, 230, 1), rgba(255, 255, 255, 1));
            box-shadow: 0px 2px 4px 0px rgba(12, 3, 6, 0.1);
            border-radius: 8px 8px 0 0;
            font-size: 24px;
            font-weight: bold;

            line-height: 30px;
            text-shadow: 0px 2px 0px rgba(255, 255, 255, 1);
            position: relative;

            // 返回按钮定位
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

        .main-content-wrapper {
            width: 100%;
            // width: 561px;
            height: 425px;
            // background-color: red;
            box-sizing: border-box;

            padding: 20px;
            padding-top: 6px;
            // height: 214px;
            display: flex;
            flex-direction: column;
            align-items: center;

            // justify-content: space-;
            .params-wrapper {
                width: 100%;
                // background-color: yellow;
                display: flex;

                flex-direction: column;
                // align-items: center;
                justify-content: center;
                .btn-time {
                            width:304px;
                            height:38px;
                            background: url(../../assets/icons/btn-time.png) no-repeat;
                            background-size: cover;
                            position:relative;
                            &::after{
                                position: absolute;
                                content: '';
                                width: 0px;
                                height: 0px;
                                left: 268px;
                                top: 17px;
                                border: 8px solid rgba(255, 255, 255, 0);
                                border-top-color: #777f8f;
                            }
                        }
                .params-item {
                    display: flex;
                    flex-direction: row;
                    // justify-content: center;
                    align-items: center;
                    border-bottom: 1px solid #cccccc;
                    padding: 16px 0 15px 0;
                    .text {
                        width: 105px;
                        // color: green;
                        font-size: 18px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: rgba(99, 107, 123, 1);
                        padding-left: 20px;
                        box-sizing: border-box;
                    }
                    .fill-box {
                        flex: 1;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .btn-default-single {
                            margin-right: 10px;
                            width: 48px;
                            height: 48px;
                            // 弥补右边线
                            border-right: 1px solid rgba(204, 204, 204, 1);

                            background: url(../../assets/icons/one_us.png) no-repeat;
                            background-size: cover;

                            color: #636b7b;

                            border-radius: 12px;
                        }
                        .input-box {
                            padding-right: 10px;
                            span {
                                margin-left: 5px;
                                color: rgba(153, 153, 153, 1);
                            }
                            .remarkbox {
                                // width:416px;
                                height:90px;
                                overflow-y:hidden;
                            }
                        }
                        // 按钮背景色
                        .el-btn-wu {
                            width: 49px;
                            height: 38px;
                            background: url(../../assets/icons/l_us_5.png) no-repeat;
                            background-size: cover;
                            border-radius: 0px;
                        }
                        .el-btn-wu-actived {
                            width: 49px;
                            height: 38px;
                            color: #ffffff;
                            background: url(../../assets/icons/l_s_5.png) no-repeat;
                            background-size: cover;
                            border-radius: 0px;
                        }
                        .el-btn-youhuaisi {
                            width: 87px;
                            height: 38px;
                            background: url(../../assets/icons/three_btn_m_us_5.png) no-repeat;
                            background-size: cover;
                            border-radius: 0px;
                        }
                        .el-btn-wuhuaisi {
                            width: 87px;
                            height: 38px;
                            background: url(../../assets/icons/three_btn_r_us_5.png) no-repeat;
                            background-size: cover;
                            border-radius: 0px;
                        }
                        .el-btn-qing {
                            width: 49px;
                            height: 38px;
                            background: url(../../assets/icons/m_us_5.png) no-repeat;
                            background-size: cover;
                            border-radius: 0px;
                        }
                        .el-btn-zhong {
                            width: 51px;
                            height: 38px;
                            background: url(../../assets/icons/m_us_1_5.png) no-repeat;
                            background-size: cover;
                            border-radius: 0px;
                        }
                        .el-btn-chong {
                            width: 50px;
                            height: 38px;
                            background: url(../../assets/icons/r_us_5.png) no-repeat;
                            background-size: cover;
                            border-radius: 0px;
                        }
                    }
                    .el-btn-unknown {
                        width: 64px;
                        height: 38px;
                        color: #ff9933;
                        background: url(../../assets/icons/two-btn-us.png) no-repeat;
                        background-size: cover;
                        border-radius: 0px;
                    }
                }
            }

            .btn-wrapper {
                width: 100%;
                // padding-top: 20px;
                display: flex;
                justify-content: flex-end;
                align-items: center;

                //蓝色按钮
                .blue-btn {
                    width: 128px;
                    height: 40px;
                    background: url(../../assets/icons/blue-btn.png) no-repeat;
                    background-size: cover;
                    font-size: 18px;
                    color: rgba(255, 255, 255, 1);

                    line-height: 40px;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>