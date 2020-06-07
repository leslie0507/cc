<template>
    <div class="debugpage-wrap">
        <div class="debug-content">
            <div class="title">
                调试窗口
                <button class="el-btn btn-1 btn-back">
                    <span class="triangle-left"></span>
                    返回
                </button>
            </div>
            <div class="content">
                <div class="item-wrap">
                    <div class="debug-item">
                        <div class="text">连续频率测量</div>
                        <!-- <input type="checkbox" /> -->
                        <div class="check"></div>
                        <button class="el-btn btn-1 test">设备异常</button>
                    </div>
                    <div class="debug-item">
                        <div class="text">初始频率</div>
                        <input type="text" class="el-input el-input-m" />
                        <span>Hz</span>
                    </div>
                    <div class="debug-item item-flex">
                        <div class="item-dianji">
                            <p>黑色电极</p>
                            <div class="btn-se">G4(接地)</div>
                        </div>
                        <div class="item-dianji">
                            <p>红色电极</p>
                            <div class="btn-se">T0(发送)</div>
                        </div>
                        <div class="item-dianji">
                            <p>绿色电极</p>
                            <div class="btn-se">A2(接收)</div>
                        </div>
                        <div class="item-dianji">
                            <p>白色电极</p>
                            <div class="btn-se">B3(接收)</div>
                        </div>
                    </div>
                    <div class="debug-item item-flex">
                        <button class="el-btn btn-green">设置电极状态</button>
                        <button class="el-btn btn-green">XPCOM_INT</button>
                        <button class="el-btn btn-green">XPCOM_INT</button>
                    </div>
                    <div class="debug-item">
                        <div class="text">电阻</div>
                        <input type="text" class="el-input el-input-m" />
                        <span>Ω</span>
                    </div>
                </div>
                <div class="btn-wrapper">
                    <button class="el-btn blue-btn">开始</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// 重置密码框内容的输入样式
input[type='password'] {
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
    // 去掉浏览器默认input内容样式
    -webkit-appearance: none;
    -moz-appearance: none;
}
.debugpage-wrap {
    width: 100%;
    height: 100%;
    background: url(../../assets/icons/background.png) no-repeat center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .debug-content {
        width: 580px;
        height: 506px;
        background: rgba(225, 235, 239, 1);
        box-shadow: 0px 4px 10px 0px rgba(11, 3, 6, 0.2);
        border-radius: 8px;
        .title {
            width: 580px;
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
            .btn-back {
                width: 98px;
                height: 48px;
                position: absolute;
                top: 6px;
                right: 20px;
                color: rgba(119, 127, 143, 1);
                background: url(../../assets/icons/back-btn.png) no-repeat center center;
                background-size: cover;
            }
        }
        .content {
            width: 100%;
            // height: 425px;
            box-sizing: border-box;
            padding: 20px;
            padding-top: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .item-wrap {
                width: 100%;
                display: flex;
                flex-direction: column;
                // align-items: center;
                justify-content: center;
                .debug-item {
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #cccccc;
                    padding: 16px 0 15px 0;
                    .text {
                        width: 108px;
                        font-size: 18px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: rgba(99, 107, 122, 1);
                        line-height: 30px;
                        margin-right: 21px;
                    }
                    .check {
                        width: 32px;
                        height: 32px;
                        background: rgba(255, 255, 255, 1);
                        border: 1px solid rgba(105, 201, 141, 1);
                        box-shadow: 0px 2px 5px 0px rgba(11, 3, 6, 0.2);
                        border-radius: 8px;
                    }
                    .test {
                        width: 98px;
                        height: 38px;
                        background: rgba(255, 255, 255, 1);
                        border: 1px solid rgba(216, 216, 216, 1);
                        border-radius: 8px;
                        color: rgba(204, 204, 204, 1);
                        margin-left: 241px;
                    }
                    span {
                        font-size: 18px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                        line-height: 30px;
                        margin-left: 5px;
                    }
                    &:last-child {
                        border: none;
                    }
                    input {
                        width: 125px;
                        height: 32px;
                        background: rgba(255, 255, 255, 1);
                        border: 1px solid rgba(105, 201, 141, 1);
                        box-shadow: 0px 2px 5px 0px rgba(11, 3, 6, 0.2);
                        border-radius: 8px;
                    }
                }
                .item-flex {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    .item-dianji {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        p {
                            font-size: 18px;
                            font-family: Microsoft YaHei;
                            font-weight: bold;
                            color: rgba(99, 107, 122, 1);
                            margin-bottom: 10px;
                        }
                        .btn-se {
                            cursor: pointer;
                            width: 98px;
                            height: 38px;
                            border-radius: 8px;
                            line-height: 38px;
                            font-size: 16px;
                            padding-left: 10px;
                            font-family: Microsoft YaHei;
                            font-weight: bold;
                            color: rgba(99, 107, 122, 1);
                            text-shadow: 0px 1px 0px rgba(255, 255, 255, 1);
                            background: url(../../assets/icons/item-dianji.png) no-repeat center center;
                            background-size: cover;
                            position: relative;
                            &::after {
                                position: absolute;
                                content: '';
                                width: 0px;
                                height: 0px;
                                left: 85px;
                                top: 17px;
                                border: 8px solid rgba(255, 255, 255, 0);
                                border-top-color: #777f8f;
                            }
                        }
                    }
                    .btn-green {
                        width: 152px;
                        height: 46px;
                        background: url(../../assets/icons/btn-green.png) no-repeat center center;
                        background-size: cover;
                        box-shadow: 0px 2px 0px 0px rgba(255, 255, 255, 0.5);
                        border-radius: 10px;
                        font-size: 16px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: rgba(255, 255, 255, 1);
                        line-height: 48px;
                        text-shadow: 0px 2px 0px rgba(11, 3, 6, 0.4);
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