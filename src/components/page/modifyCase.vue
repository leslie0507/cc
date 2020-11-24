<template>
    <div class="login-wrap" v-if="showLayer">
        <div class="loading-img">
            <div class="title">
                {{jxjh || xzjh?'临床病例':'修改病历'}}
                <button class="el-btn btn-1 btn-back" :class="[backType!=1?'back-btn_active':'']" @click="goMonitor">
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
                        <div class="time-wrapper">
                            <div class="time-left">从 <span>2019-8-26 20:50:35</span> 至</div>
                            <el-select style="margin-left:20px;" v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        
                    </div>
                    <!-- 一条 -->
                    <div class="params-item" style="padding:0 !important;">
                        <div class="left">
                            <div class="item">
                                <div class="text">脑出血</div>
                                <div class="fill-box">
                                    <button class="el-btn btn-default-single" :class="[!HemaBeforeEmpty?'btn-default-single_active':'']" @click="HemaBeforeEmpty = false;HemaBefore='';">无</button>
                                    <div class="input-box">
                                        <input type="text" v-model="HemaBefore" @change="HemaBeforeChange" class="el-input el-input-s" placeholder="手术前"/>
                                        <span>ml</span>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="text">脑积水</div>
                                <div class="fill-box">
                                    <button class="el-btn btn-default-single" :class="[!HydrocephalusValueEmpty?'btn-default-single_active':'']"  @click="HydrocephalusValueEmpty = false;HydrocephalusValue='';">无</button>
                                    <div class="input-box">
                                        <input type="text" v-model="HydrocephalusValue" @change="HydrocephalusValueChange" class="el-input el-input-s" placeholder="手术前" />
                                        <span>ml</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="right">
                            <div class="text" style="width:100%;text-align:center;">去骨瓣手术信息</div>
                            <div class="params-item" style="border-bottom:0;">
                                <div class="fill-box">
                                    <button class="el-btn btn-zuhe-actived " :class="{'el-btn-wu-actived':DCOperateFlags==0}" @click="clcikLgs(0)">无</button>
                                    <button class="el-btn el-btn-youhuaisi"  :class="{'el-btn-wu-actived_2':DCOperateFlags==1}" @click="clcikLgs(1)">单块</button>
                                    <button class="el-btn el-btn-wuhuaisi"  :class="{'el-btn-wu-actived_3':DCOperateFlags==2}" @click="clcikLgs(2)">两块</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 一条 -->
                    <div class="params-item">
                        <div class="text">脑梗塞</div>
                        <div class="fill-box">
                            <button class="el-btn btn-zuhe-actived " :class="{'el-btn-wu-actived':InfarFlags==2}" @click="clcikNgs(2)">无</button>
                            <button class="el-btn el-btn-wuhuaisi"  :class="{'el-btn-wu-actived_3':InfarFlags==1}" @click="clcikNgs(1)">有</button>
                        </div>
                    </div>

                    <div class="params-item" v-if="InfarFlags==1" style="justify-content: flex-start;flex-direction: column;padding-left:100px;box-sizing:border-box;">
                        <div class="right-wrapper">
                            <div class="fill-box">
                                <span>CT时间</span>
                                <div class="item">
                                    <div class="input-box time-packer">
                                        <el-date-picker
                                            style="width:240px;"
                                            v-model="value1"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <div class="fill-box">
                                <span>发病时间</span>
                                <div class="item">
                                    <div class="input-box time-packer">
                                        <el-date-picker
                                            style="width:240px;"
                                            v-model="value2"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="right-wrapper">
                            <div class="fill-box">
                                <span>最大梗塞面积</span>
                                <div class="item">
                                    <div class="input-box">
                                        <input v-model="InfarLayerMaxArea" type="text" class="el-input el-input-m" />
                                    </div>
                                    <span>cm²</span>
                                </div>
                            </div>
                            <div class="fill-box">
                                <span>梗塞层数</span>
                                <div class="item">
                                    <div class="input-box">
                                        <input type="text" v-model="InfarLayers" class="el-input el-input-m" />
                                    </div>
                                </div>
                            </div>

                            <div class="fill-box">
                                <span>层间距  </span>
                                <div class="item">
                                    <div class="input-box">
                                        <input type="text" v-model="InfarInterlayerDistance" class="el-input el-input-m" />
                                    </div>
                                    <span>mm</span>
                                </div>
                            </div>
                        </div> 
                        
                    </div>
                    <!-- 一条 -->
                    <div class="params-item" style="border-bottom:0;">
                        <div class="text">GCS</div>
                        <div class="fill-box">
                            <div class="input-box">
                                <input style="width:50%;" v-model="GCS" type="text" class="el-input el-input-lg" placeholder />
                            </div>
                        </div>

                        <div class="text" style="width:180px;">层中线移位</div>
                        <div class="fill-box">
                            <div class="input-box">
                                <input style="width:50%;" type="text" v-model="MidlineShiftValue" class="el-input el-input-lg" placeholder />
                                <span>mm</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 按钮区域 -->
                <div class="btn-wrapper">
                    <button class="el-btn blue-btn" @click="save">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { updatePatientData } from '@/api/monitor';
export default {
    name:'modifyCase',
    props:{
        xzjh:{
            default:false
        },
        jxjh:{
            default:false
        },
        showLayer:{
            default:true
        },
        modifyItem:{
            default:()=>{}
        },
        modifyData:{
            default:()=>{}
        }
    },
    watch:{
        modifyItem: {
            handler(next, pre) {
                console.log(next)
                this.GCS = next.GCSIndex;
                this.beginRPFIndex= next.BNRPFIndex;
                this.endRPFIndex= next.BNRPFIndex;
            },
            deep:true
        }
    },
    data() {
        return {
            backType:1,
            value1: '',
            value2: '',
            HydrocephalusValue:'', //脑积水
            HydrocephalusValueEmpty:true, 
            HemaBeforeEmpty:true,
            HemaBefore:'',  //脑出血
            InfarLayerMaxArea:'', // 最大梗塞层最大面积
            InfarLayers:'', //梗塞层数目
            InfarInterlayerDistance:'', //梗塞层间距
            GCS:'',  //GCS
            MidlineShiftValue:'',  //中线移位.
            DCOperateFlags:'',  //去骨瓣手术信息 0 1 2 
            InfarFlags:2, //脑梗塞 有坏死 无坏死 
            hasCon:false,
            options: [],
            value: '',
            lgs:1,
            DCOperateFlags:1,
            beginRPFIndex:'',
            endRPFIndex:''
        }
    },
    methods: {
        HydrocephalusValueChange(){
            this.HydrocephalusValueEmpty = true;
        },
        HemaBeforeChange(){
            this.HemaBeforeEmpty = true;
        },
        save(){
            if(this.jxjh || this.xzjh){
                this.$router.push({
                    name: "monitor",
                    params:{
                        pathType:1
                    }
                });
            }
            let params = {
                strID: this.modifyData.strID || '',
                beginRPFIndex: this.beginRPFIndex,
                endRPFIndex: this.endRPFIndex,
                AtroFlags: -1,
                GCS:this.GCS ,
                InfarFlags: this.InfarFlags,
                HydrFlags: this.HydrFlags,
                HydrocephalusValue: this.HydrocephalusValue,
                HemaFlags: 1,
                HemaBefore: this.HemaBefore,
                DCOperateFlags: this.DCOperateFlags,
                InfarLayerMaxArea:this.InfarLayerMaxArea, 
                InfarLayers: this.InfarLayers,
                InfarInterlayerDistance: this.InfarInterlayerDistance,
                MidlineShiftValue:this.MidlineShiftValue ,
                AfterPhotoTime:this.AfterPhotoTime
            }
            updatePatientData(params).then(res=>{
                console.log(res)
                this.$emit('closeLayer',true)
            })
            
        },
        clcikNgs(val){
            this.InfarFlags= val;
        },
        clcikLgs(val){
            this.DCOperateFlags= val;
        },
        goMonitor(){
            this.backType = 2;
            setTimeout(()=>{
                if(this.jxjh) {
                    this.$router.push({
                        path: "/queryMonitor"
                    });
                    return;
                }
                this.$emit('closeLayer',true)
            },300)
        }
    },
}
</script>

<style lang="scss" scoped>
/deep/ .el-input__inner {
    padding-right: 10px;
}
/deep/ .el-input__suffix {
    top: 2px !important;
}
/deep/ .el-input__suffix-inner {
    /deep/ .el-input__icon {
        line-height: 2px; 
    }
}
/deep/ .el-icon-time {
   line-height: 24px; 
}
.time-wrapper {
    .time-left {
        color: #636B7A;
        font-size: 18px;
        span {
            font-weight: bold;
            margin: 0 10px;
        }
    }
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.right-wrapper {
    .fill-box {
        flex: 1 !important;
        span {
            font-size: 14px;
            font-weight: bold;
            color: #636B7A;
            margin-right: 8px;
        }
    }
    &:nth-child(1) {
        input {
            width: 180px;
        }
    }
    &:nth-child(2) {
        margin-top: 20px;
        .fill-box {
            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            &:nth-child(1) {
                flex: 0 0 250px !important;
                input {
                    width: 60px;
                }
            }
            &:nth-child(2) {
                flex: 0 0 160px !important;
                input {
                    width: 40px;
                }
            }
            &:nth-child(3) {
                input {
                    width: 40px;
                }
            }
        }
    }
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.fill-box {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .btn-default-single {
        margin-right: 10px;
        width: 38px;
        height: 38px;
        // 弥补右边线
        border-right: 1px solid rgba(204, 204, 204, 1);

        background: url(../../assets/icons/one_us.png) no-repeat;
        background-size: cover;

        color: #636b7b;

        border-radius: 12px;
    }
    .btn-default-single_active {
        background: url(../../assets/icons/one_s.png) no-repeat;
        background-size: cover;
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
    .btn-zuhe-actived {
        width: 54px;
        height: 38px;
        background: url(../../assets/icons/l_us_5.png) no-repeat;
        background-size: contain;
        border-radius: 0px;
    }
    .el-btn-wu-actived {
        width: 54px;
        height: 38px;
        color: #ffffff;
        background: url(../../assets/icons/l_s_5.png) no-repeat;
        background-size: cover;
        border-radius: 0px;
    }
    .el-btn-wu-actived_2 {
        color: #ffffff;
        background: url(../../assets/icons/r_s_2.png) no-repeat !important;
    }
    .el-btn-wu-actived_3 {
        color: #ffffff;
        background: url(../../assets/icons/r_s.png) no-repeat !important;
        background-size: cover;
        border-radius: 0px;
    }
    .el-btn-youhuaisi {
        width: 54px;
        height: 38px;
        background: url(../../assets/icons/three_btn_m_us_5.png) no-repeat;
        background-size: contain;
        border-radius: 0px;
    }
    .el-btn-wuhuaisi {
        width: 56px;
        height: 38px;
        background: url(../../assets/icons/three_btn_r_us_5.png) no-repeat;
        background-size: contain;
        border-radius: 0px;
    }
    .el-btn-qing {
        width: 54px;
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
// 重置文本框内容的输入样式
input[type='text'] {
    font-size: 15px;
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
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.3);
    background-size: cover;
    .loading-img {
        width: 700px;
        background: #e1ecef;

        box-shadow: 0px 4px 10px 0px rgba(12, 3, 6, 0.2);
        border-radius: 8px;

        .title {
            width: 100%;
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
            .back-btn_active {
                background: url(../../assets/img/boen/back-click_active.png) no-repeat !important;
            }
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
                    .left {
                        .item {
                            width:100%;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 16px 0 15px 0;
                            &:last-child {
                                border-top: 1px solid #ccc;
                            }
                        }
                        border-right: 1px solid #ccc;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .right {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .left,.right {
                        flex: 1;
                    }
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
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
                padding-top: 16px;
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
/deep/ .el-input {
    // margin-left: 20px;
    height: 32px;
    .el-input__suffix {
        top: 5px;
    }
    input {
        height: 32px;
        font-size: 15px;
        border: none;
    }
}
</style>