<template>
    <div class="manual-wrap">
        <!-- title -->
        <div class="op-title">
            <router-link :to="'/kidNav'">
                 <img class="back-home" src="../../assets/icons/home.png" alt="">
            </router-link>
           

            <div class="op-title-left">
                <img src="../../assets/icons/kidNavLogo.png" alt="logo" />
                <p>© 2020 All Rights Reserved. 重庆博恩富克医疗设备有限有限公司</p>
            </div>
            <div class="op-title-right">
                <h3>操 作 手 册</h3>
                <p>Operation Manual</p>
            </div>
        </div>
        <!-- content -->
        <div class="op-content">
            <div class="op-process">
                <div class="op-process-step" :class="{'active':type==1}" @click="changePage(1)">
                    <div class="step-number">1</div>
                    <div class="step-name">前期准备</div>
                    <div class="step-en">Preliminary Preparation</div>
                </div>
                <div class="op-process-step"  :class="{'active':type==2}" @click="changePage(2)">
                    <div class="step-number">2</div>
                    <div class="step-name">备皮脱脂</div>
                    <div class="step-en">Clean the skin</div>
                </div>
                <div class="op-process-step"  :class="{'active':type==3}" @click="changePage(3)">
                    <div class="step-number">3</div>
                    <div class="step-name">连接测试线</div>
                    <div class="step-en">Connect the lead wires</div>
                </div>
                <div class="op-process-step"  :class="{'active':type==4}" @click="changePage(4)">
                    <div class="step-number">4</div>
                    <div class="step-name">粘贴电极</div>
                    <div class="step-en">Paste electrode</div>
                </div>
                <div class="op-process-step" :class="{'active':type==5}" @click="changePage(5)">
                    <div class="step-number">5</div>
                    <div class="step-name">开始监护</div>
                    <div class="step-en">Start monitoring</div>
                </div>
            </div>

            <div class="op-detail">
                <div class="detail-content" v-show="type==1">
                    <div class="detail-img">
                        <img src="../../assets/icons/info/1.png" alt="">
                        <div class="title-wrapper title-wrapper-1">
                            <div>主 机</div>
                            <div>电极</div>
                        </div>
                    </div>
                    <div class="detail-text">检查电源线、测试线、电极、推剪、剃须刀、酒精、棉签等物品是否准备完好。</div>
                </div>
                <div class="detail-content" v-show="type==2">
                    <div class="detail-img" >
                        <img src="../../assets/icons/info/2.png" alt="">
                        <div class="title-wrapper title-wrapper-2">
                            <div>主 机</div>
                            <div>电极</div>
                        </div>
                    </div>
                    <div class="detail-text detail-text-2">清洁粘贴位置（右图黑色框选处）的毛发，以触之不扎手为度再用酒精脱脂备皮处 3-5 次。</div>
                </div>
                <div class="detail-content" v-show="type==3">
                    <div class="detail-img" >
                        <img class="img-3" src="../../assets/icons/info/3.png" alt="">
                        <div class="title-wrapper title-wrapper-3">
                            <div>棕色</div>
                            <div>绿色</div>
                            <div>白色</div>
                            <div>黑色</div>
                        </div>
                    </div>
                    <div class="detail-text">测试线连接设备，按照①棕色、②绿色、③白色、④黑色顺序扣上电极</div>
                </div>
                <div class="detail-content" v-show="type==4">
                    <div class="detail-img detail-img-4">
                        <img src="../../assets/icons/info/4.png" alt="">
                        <div class="title-wrapper title-wrapper-4">
                            <div class="operate-title">
                                <div>左：</div>
                                <div>
                                    <div>④前：黑色</div>
                                    <div>③后：白色</div>
                                </div>
                            </div>
                            <div class="operate-title">
                                <div>右：</div>
                                <div>
                                    <div>①前：棕色</div>
                                    <div>②后：绿色</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="detail-text detail-text-4">4个电极左右两两对称，后方电极中心（纽扣）对齐外耳道上方耳廓最高点，电极下缘与外眼角延长线重合（如右图红线所示），前方电极紧贴后方电极并排，“米”字法粘贴。</div>
                </div>
                <div class="detail-content"  v-show="type==5">
                    <div class="detail-img detail-img-5">
                        <img src="../../assets/icons/info/5.png" alt="">
                    </div>
                    <div class="detail-text detail-text-5">开机，选择“监护”，新增病例或监护已有病例，输入病人相关信息，开始监护。</div>
                </div>
                
                <div class="detail-btn">
                    <div class="pre" @click="subPage" v-show="type!=5"></div>
                    <div class="next" @click="addPage" v-show="type!=5" v-clicked>NEXT</div>
                    <div class="back" @click="subPage" v-show="type==5" v-clicked></div>
                </div>
            </div>
            <div class="detail-attention">
                <span>注意事项</span>
                <span>①电极专机专用，其他心电电极无法取代。</span>
                <span>②电极单次使用不宜超过4小时，需及时更换电极。</span>
                <span>③电极一次性使用，不能重复使用。</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'',
    data() {
        return {
            type:1
        }
    },
    methods:{
        changePage(val){
            this.type= val;
        },
        subPage(){
            if(this.type==1) {
                return
            }
            --this.type;
        },
        addPage(){
            if(this.type==5) {
                return
            }
            ++this.type;
        }
    }
}
</script>
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
        position: relative;
        .back-home{
            position: absolute;
            right: 0;
            top: 0;
            width: 50px;
            cursor: pointer;
        }
        width: 891px;
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
        width: 891px;
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
            // 默认选中第一个
            .active {
                .step-number {
                    border: 2px solid rgba(1, 145, 113, 1) !important;;
                    background: rgba(1, 145, 113, 1) !important;;
                    border-radius: 50%;
                    color: #ffffff !important;
                }
                .step-name,
                .step-en {
                    color: #019171 !important;;
                }
            }
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
                // &:hover {
                //     .step-number {
                //         border: 2px solid rgba(1, 145, 113, 1);
                //         background: rgba(1, 145, 113, 1);
                //         border-radius: 50%;
                //         color: #ffffff;
                //     }
                //     .step-name,
                //     .step-en {
                //         color: #019171;
                //     }
                // }
               
            }
        }
        .op-detail {
            width: 891px;
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
                .detail-img-5 {
                    img {
                        margin-top: 15px;
                        height: 225px !important;
                    }
                }
                .detail-img-4 {
                    img {
                        height: 145px !important;
                    }
                    margin-top: 40px !important;
                }
                .detail-img {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-direction: column;
                    width: 290px;
                    margin-top: 15px;
                    .img-3 {
                        height: auto !important;
                        width: 300px !important;
                        margin-top: 30px;
                    }
                    .title-wrapper-4 {
                        padding: 0 25px 0 10px;
                    }
                    .title-wrapper-3 {
                        padding: 0 15px 0 0px;
                    }
                    .title-wrapper-2 {
                        padding: 0 65px 0 55px;
                    }
                    .title-wrapper-1 {
                        padding: 0 35px 0 55px;
                    }
                    .operate-title {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-top: 20px;
                        div {
                            line-height: 25px !important;
                            font-weight: bold !important;
                            opacity: 1 !important;
                        }
                    }
                    .title-wrapper {
                        div {
                            font-size:16px;
                            font-weight:300;
                            color:rgba(0,0,0,1);
                            line-height:38px;
                            opacity:0.8
                        }
                        width: 100%;
                        box-sizing: border-box;
                        flex: 1;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    img {
                        height: 150px;
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
                    .img1 img {
                        width: 150px;
                        height: 166px;
                    }
                    .img2 img {
                        width: 78px;
                        height: 61px;
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
                .detail-text-2 {
                    width: 340px;
                    margin-right: 80px;
                }   
                .detail-text-5 {
                    width: 450px;
                    margin-right: 30px;
                }   
                .detail-text-4 {
                    width: 460px;
                    margin-right: 40px;
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
                .back {
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
                        border-radius: 10px;
                        left: 0px;
                        top: 0px;
                        width: 83px;
                        height: 34px;
                        content: '';
                        background: url(../../assets/icons/bank_icon.png) no-repeat center;
                    }
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
                    border-radius: 10px;
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