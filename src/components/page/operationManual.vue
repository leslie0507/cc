<template>
    <div class="manual-wrap">
        <!-- title -->
        <div class="op-title">
            <div class="op-title-left">
                <img src="../../assets/icons/kidNavLogo.png" alt="logo" />
                <p>© 2020 All Rights Reserved. 重庆博恩富克医疗设备有限公司</p>
            </div>
            <div class="op-title-right">
                <h3>操 作 手 册</h3>
                <p>Operation Manual</p>
            </div>
        </div>
        <!-- content -->
        <div class="op-content">
            <div class="op-process">
                <div class="op-process-step">
                    <div class="step-number">1</div>
                    <div class="step-name">前期准备</div>
                    <div class="step-en">Preliminary Preparation</div>
                </div>
                <div class="op-process-step">
                    <div class="step-number">2</div>
                    <div class="step-name">备皮脱脂</div>
                    <div class="step-en">Clean the skin</div>
                </div>
                <div class="op-process-step">
                    <div class="step-number">3</div>
                    <div class="step-name">连接导联线</div>
                    <div class="step-en">Connect the lead wires</div>
                </div>
                <div class="op-process-step">
                    <div class="step-number">4</div>
                    <div class="step-name">粘贴电极片</div>
                    <div class="step-en">Paste electrode</div>
                </div>
                <div class="op-process-step">
                    <div class="step-number">5</div>
                    <div class="step-name">开始监护</div>
                    <div class="step-en">Start monitoring</div>
                </div>
            </div>

            <div class="op-detail">
                <div class="detail-content">
                    <div class="detail-img">
                        <div class="img1">
                            <img src="../../assets/icons/op1.png" alt="主机" />
                            <p>主 机</p>
                        </div>
                        <div class="img2">
                            <img src="../../assets/icons/op2.png" alt="电极片" />
                            <p>电极片</p>
                        </div>
                    </div>
                    <div class="detail-text">检查电源线、导联线、电极片、推剪、剃须刀、酒精、棉签等物品是否准备完好。</div>
                </div>
                <div class="detail-btn">
                    <div class="pre"></div>
                    <div class="next">NEXT</div>
                </div>
            </div>
            <div class="detail-attention">
                <span>注意事项</span>
                <span>①电极片专机专用，其他心电电极无法取代。</span>
                <span>②电极片单次使用不宜超过4小时，需及时更换电极片。</span>
                <span>③电极片一次性使用，不能重复使用。</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.manual-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f6f7fb;
    .op-title {
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: space-between;
        // background-color: rgb(173, 160, 231);
        .op-title-left {
            width: 675px;
            background: url(../../assets/icons/opTitleBg.png) no-repeat 11px center;
            background-size: contain;
            img {
                width: 161px;
                height: 57px;
                margin: 23px 0px 0px 47px;
            }
            p {
                font-size: 11px;
                font-family: Adobe Heiti Std;
                font-weight: normal;
                color: rgba(0, 0, 0, 1);
                opacity: 0.5;
                margin: 45px 0px 0px 30px;
            }
        }
        .op-title-right {
            width: 231px;
            h3 {
                font-size: 22px;
                font-family: AlibabaPuHuiTi;
                font-weight: 500;
                color: rgba(0, 145, 113, 1);
                margin-top: 63px;
            }
            p {
                width: 231px;
                height: 35px;
                line-height: 35px;
                font-size: 16px;
                font-family: AlibabaPuHuiTi;
                font-weight: 300;
                color: rgba(0, 145, 113, 1);
                border-top: 1px solid #c7c8ca;
                margin-top: 6px;
            }
        }
    }
    // ---分割线---content---
    .op-content {
        width: 87%;
        // height: 618px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-top: 100px;
        // background-color: rgb(220, 246, 248);
        .op-process {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            .op-process-step {
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .step-number {
                    width: 36px;
                    height: 36px;
                    border: 2px solid rgba(124, 124, 124, 1);
                    border-radius: 50%;
                    text-align: center;
                    line-height: 36px;
                    font-size: 20px;
                    font-family: AlibabaPuHuiTi;
                    font-weight: bold;
                    color: #7c7c7c;
                }
                .step-name {
                    font-size: 15px;
                    font-family: AlibabaPuHuiTi;
                    font-weight: 500;
                    color: #7d7d7d;
                    margin-top: 29px;
                    margin-bottom: 10px;
                }
                .step-en {
                    font-size: 15px;
                    font-family: AlibabaPuHuiTi;
                    font-weight: 500;
                    color: #7d7d7d;
                }
                &:hover {
                    .step-number {
                        border: 2px solid rgba(1, 145, 113, 1);
                        background: rgba(1, 145, 113, 1);
                        border-radius: 50%;
                        color: #ffffff;
                    }
                    .step-name,
                    .step-en {
                        color: #019171;
                    }
                }
                // 默认选中第一个
                &:first-child {
                    .step-number {
                        border: 2px solid rgba(1, 145, 113, 1);
                        background: rgba(1, 145, 113, 1);
                        border-radius: 50%;
                        color: #ffffff;
                    }
                    .step-name,
                    .step-en {
                        color: #019171;
                    }
                }
            }
        }
        .op-detail {
            width: 100%;
            height: 268px;
            background: linear-gradient(180deg, rgba(96, 208, 183, 0.3), rgba(0, 138, 107, 0.3));
            box-shadow: 0px 6px 18px 0px rgba(0, 230, 179, 0.15);
            border-radius: 10px;
            .detail-content {
                display: flex;
                height: 237px;
                justify-content: space-between;
                align-items: center;
                margin: 0px 0px 0px 50px;
                .detail-img {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 290px;
                    .img1,
                    .img2 {
                        height: 204px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        align-items: center;
                        p {
                            font-size: 15px;
                            font-family: AlibabaPuHuiTi;
                            font-weight: 300;
                            color: rgba(0, 0, 0, 1);
                            line-height: 38px;
                            opacity: 0.8;
                        }
                    }
                    .img2 img {
                        margin-bottom: 15px;
                    }
                }
                .detail-text {
                    width: 290px;
                    font-size: 20px;
                    font-family: AlibabaPuHuiTi;
                    font-weight: 400;
                    // 这里的字体不够粗
                    color: rgba(0, 0, 0, 1);
                    line-height: 38px;
                    opacity: 0.8;
                    margin-right: 99px;
                }
            }
            .detail-btn {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: -13px;
                margin-right: 10px;
                .pre {
                    cursor: pointer;
                    width: 83px;
                    height: 34px;
                    border-radius: 8px;
                    background: url(../../assets/icons/pre.png) no-repeat 15px center;
                    margin-right: 5px;
                }
                .next {
                    cursor: pointer;
                    width: 83px;
                    height: 34px;
                    border-radius: 8px;
                    background: rgba(1, 145, 113, 1);
                    font-size: 13px;
                    font-family: AlibabaPuHuiTi;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                    line-height: 34px;
                    position: relative;
                    padding-left: 16px;
                    &::after {
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 83px;
                        height: 34px;
                        content: '';
                        background: url(../../assets/icons/next.png) no-repeat 64px center;
                    }
                }
            }
        }
        .detail-attention {
            font-size: 12px;
            margin-top: 20px;
            line-height: 60px;
            color: #838383;
            span {
                margin-left: 10px;
                &:nth-child(1) {
                    display: inline-block;
                    width: 70px;
                    font-family: AlibabaPuHuiTi;
                    font-weight: 600;
                    color: rgba(0, 0, 0, 1);
                    margin-left: 0px;
                    position: relative;
                    text-align: right;
                    &::after {
                        position: absolute;
                        content: '';
                        width: 16px;
                        height: 16px;
                        left: 0px;
                        top: 23px;
                        background: url(../../assets/icons/att.png) no-repeat center center;
                    }
                }
            }
        }
    }
}
</style>