<template>
    <div class="kidnav-wrap">
        <div class="bg-img"></div>
        <!-- logo -->
        <div class="logo">
            <img src="../../assets/icons/kidNavLogo.png" alt="Logo" />
        </div>
        <!-- content -->
        <div class="main">
            <div class="btn-wrap">
                <div class="btn-top">
                    <img src="../../assets/icons/btn-top1.png" alt="bg1" />
                </div>
                <button class="btn-bottom" @click="goMonitor">
                    <span class="btn-icon-left icon1"></span>
                    <span class="btn-text-left">监 护</span>
                </button>
            </div>
            <div class="btn-wrap">
                <div class="btn-top">
                    <img src="../../assets/icons/btn-top2.png" alt="bg1" />
                </div>
                <button class="btn-bottom" @click="goMonitorCase">
                    <span class="btn-icon-left icon2"></span>
                    <span class="btn-text-left">查 询</span>
                </button>
            </div>
            <div class="btn-wrap">
                <div class="btn-top">
                    <img src="../../assets/icons/btn-top3.png" alt="bg1" />
                </div>
                <button class="btn-bottom" @click="goMonitorCase">
                    <span class="btn-icon-left icon3"></span>
                    <span class="btn-text-left">档 案</span>
                </button>
            </div>
            <div class="btn-wrap">
                <button class="btn-right right1" @click="goSetting">
                    <span class="btn-icon-right icon4"></span>
                    <span class="btn-text-right text1">设 置</span>
                </button>
                <button class="btn-right right2" @click="goOp">
                    <span class="btn-icon-right icon5"></span>
                    <span class="btn-text-right text2">帮 助</span>
                </button>
                <button class="btn-right right3">
                    <span class="btn-icon-right icon6"></span>
                    <span class="btn-text-right text3">关闭系统</span>
                </button>
            </div>
        </div>
        <!-- foot -->
        <div class="footer">
            <div class="title">
                <span>© 2019 All Rights Reserved. 重庆博恩富克医疗设备有限有限公司</span>
            </div>
            <div class="foot-img">
                <img src="../../assets/icons/footLogo.png" alt />
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
        goSetting(){
            this.$router.push({
                path: "/setting",
            });
        },
        goOp(){
            this.$router.push({
                path: "/operationmanual",
            });
        },
        goMonitor(){
            this.$router.push({
                path: "/monitor",
            });
        },
        goMonitorCase(){
            this.$router.push({
                path: "/monitorCase",
            });
        }
    },
}
</script>

<style lang="scss" scoped>
button {
    border: none;
    outline: none;
}
.kidnav-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .bg-img {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -8;
        width: 100%;
        height: 100%;
        background: url('../../assets/icons/kidNavBg.png') no-repeat center center;
        background-size: cover;
        filter: blur(10px);
    }
    .logo {
        width: 221px;
        height: 78px;
        margin: 72px 0px 34px 0px;
        img {
            width: 221px;
            height: 78px;
        }
    }
    .main {
        // width: 745px;
        // height: 418px;
        padding: 45px;
        border: 1px solid #e3e9eb;
        box-shadow: 0px 12px 10px #9aa5ac;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #c9d3d9;
        .btn-wrap {
            width: 163px;
            height: 326px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            margin-right: 2px;
            box-shadow: 0px 10px 10px #999fa4;
            .btn-top {
                width: 161px;
                height: 267px;
                border: 1px solid #27a288;
                border-bottom: none;
                img {
                    width: 161px;
                    height: 267px;
                }
            }
            .btn-bottom {
                cursor: pointer;
                width: 163px;
                height: 58px;
                border: 1px solid #1b7e15;
                background-image: linear-gradient(#64ceb7, #009272);
                border-radius: 0px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                .btn-icon-left {
                    width: 16px;
                    height: 16px;
                    margin: 2px 6px 0px -6px;
                    z-index: 9;
                }
                .icon1 {
                    background: url('../../assets/icons/icon1.png') no-repeat center center;
                    background-size: contain;
                }
                .icon2 {
                    background: url('../../assets/icons/icon2.png') no-repeat center center;
                    background-size: contain;
                }
                .icon3 {
                    background: url('../../assets/icons/icon3.png') no-repeat center center;
                    background-size: contain;
                }
                .btn-text-left {
                    font-size: 18px;
                    font-weight: bold;
                    font-family: Microsoft YaHei;
                    color: rgba(255, 255, 255, 1);
                    text-shadow: 0px 1px 0px rgba(11, 3, 6, 0.4);
                    z-index: 9;
                }
            }
            .btn-bottom::after {
                content: '';
                position: absolute;
                width: 163px;
                height: 29px;
                background: linear-gradient(90deg, #ffffffbd, #c5c5c562);
                top: 0px;
                left: 0px;
            }
            .btn-right {
                cursor: pointer;
                width: 163px;
                height: 106px;
                position: relative;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                background-color: #b1e6ba;
                box-shadow: 0px 5px 3px rgb(170, 170, 170);
                &::after {
                    content: '';
                    position: absolute;
                    width: 160px;
                    height: 56px;
                    background: rgba(241, 252, 243, 0.12);
                    top: 0px;
                    left: 0px;
                }
                .btn-icon-right {
                    z-index: 9;
                }
                .icon4 {
                    width: 64px;
                    height: 60px;
                    background: url('../../assets/icons/icon4.png') no-repeat center center;
                    margin-bottom: -10px;
                    background-size: cover;
                }
                .icon5 {
                    width: 41px;
                    height: 39px;
                    background: url('../../assets/icons/icon5.png') no-repeat center center;
                    background-size: cover;
                    margin-bottom: 6px;
                    margin-top: 10px;
                }
                .icon6 {
                    width: 36px;
                    height: 36px;
                    background: url('../../assets/icons/icon6.png') no-repeat center center;
                    background-size: contain;
                    margin-bottom: 8px;
                    margin-top: 8px;
                }
                .btn-text-right {
                    font-size: 18px;
                    font-weight: bold;
                    font-family: Microsoft YaHei;
                    color: rgb(24, 24, 24);
                    text-shadow: 0px 1px 0px rgba(11, 3, 6, 0.4);
                    z-index: 9;
                }
            }
            .btn-right:nth-child(1) {
                border: 1px solid #169f81;
                background: linear-gradient(#96f1de, #019373);
                &::after {
                    background: rgba(241, 252, 243, 0.3);
                    border-radius: 0px 10px 0px 0px;
                }
                .text1 {
                    color: #ffffff;
                }
            }
            .btn-right:nth-child(2) {
                border: 1px solid #4f9e43;
                background: linear-gradient(#b0e6ba, #caf6d0, #b0e6ba);
                &::after {
                    background: linear-gradient(#f1fcf3, #d5f8da);
                }
                .text2 {
                    color: #007803;
                }
            }
            .btn-right:nth-child(3) {
                border: 1px solid #555954;
                background-color: #323232;
                &::after {
                    border-top: 1px solid #8d8d8d;
                }
                .text3 {
                    color: #ffffff;
                }
            }
        }
        .btn-wrap:nth-last-child(1) {
            margin-right: 0px;
            border-radius: 0px 10px 10px 0px;
            .right1 {
                border-radius: 0px 10px 0px 0px;
            }
            .right3 {
                border-radius: 0px 0px 10px 0px;
            }
        }
        .btn-wrap:first-child {
            border-radius: 10px 0px 0px 10px;
            .btn-top {
                border-radius: 10px 0px 0px 0px;
                img {
                    border-radius: 10px 0px 0px 0px;
                }
            }
            .btn-bottom {
                border-radius: 0px 0px 0px 10px;
            }
        }
    }
    .footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 61px 0px 43px 0px;
        .title {
            width: 387px;
            height: 16px;
            font-size: 13px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #019272;
            margin-bottom: 23px;
        }
        .foot-img {
            width: 108px;
            height: 21px;
            img {
                width: 108px;
                height: 21px;
            }
        }
    }
}
</style>