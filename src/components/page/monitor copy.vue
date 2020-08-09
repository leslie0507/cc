<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                <div></div>
                实时监护
                <button class="el-btn btn-1">
                    <span class="triangle-left"></span>
                    返回
                </button>
            </div>
            <div class="input-wrapper">
                <div class="userinfo">
                    <div class="img-wrapper">
                        <img src="" alt="">
                    </div>
                    <!-- 头像 -->
                    <div class="info-wrapper">
                        <div class="item">
                            <div class="label">编号:</div>
                            <div class="value">202010368</div>
                        </div>
                        <div class="item">
                            <div class="label">姓名:</div>
                            <div class="value">约翰尼德普</div>
                        </div>
                        <div class="item">
                            <div class="label">年龄:</div>
                            <div class="value">50</div>
                        </div>
                        <div class="item">
                            <div class="label">性别:</div>
                            <div class="value">男</div>
                        </div>
                    </div>

                    <div class="line"></div>

                    <div class="select-container">
                        <el-input label="脑积水" v-model="elName"></el-input>
                        <el-input label="脑血肿" v-model="elName"></el-input>
                        <el-input label="脑萎缩" v-model="elName"></el-input>
                    </div>

                    <div class="el-btn-info-lv begin-btn">开 始</div>

                    <div class="time-wrapper">
                        <div class="time-text">
                            <span>时</span>
                            <span>分</span>
                            <span>秒</span>
                        </div>
                        <div class="time-con">
                            {{hour}}:{{min}}:{{second}}
                        </div>

                        <el-input class="monitor" label="监护时间" endLabel="分钟" v-model="elName"></el-input>
                    </div>

                    <div class="btn-wrapper">
                        <div class="el-btn el-btn-info-mlv modify">修改病历</div>
                        <div class="el-btn el-btn-info-mlv print">打 印</div>
                    </div>

                    <div class="save-wrapper">
                        <div class="top">
                            <img src="" alt="">
                            <span>保存</span>
                        </div>
                        <div class="bottom">
                            <div>TIME:10:52:30</div>
                            <div>2020.5.16</div>
                        </div>
                    </div>
                </div>
                
                <div class="container">
                    <div class="left">
                        <div class="left-input">
                            <el-input label="头围" endLabel="cm" v-model="elName"></el-input>
                            <el-input label="体重" endLabel="kg" v-model="elName"></el-input>
                        </div>

                        <div class="left-item-wrapper">
                            <div class="left-item">
                                <div class="text-werapper">
                                    <div>扰动系数</div>
                                    <div style="width:100%;text-align:left;">Brain Edema</div>
                                    <div style="width:100%;text-align:left;" class="icon-wrapper">
                                        <img src="../../assets/img/boen/b-l.png" alt="">
                                        <img src="../../assets/img/boen/b-m.png" alt="">
                                        <img src="../../assets/img/boen/b-r.png" alt="">
                                    </div>
                                </div>
                                <div class="value">30</div>
                            </div>
                            <div class="left-item">
                                <div class="text-werapper">
                                    <div>水肿量</div>
                                    <div style="width:100%;text-align:left;">Brain Edema</div>
                                    <div style="width:100%;text-align:left;" class="icon-wrapper">
                                        <img src="../../assets/img/boen/b-l.png" alt="">
                                        <img src="../../assets/img/boen/b-m.png" alt="">
                                        <img src="../../assets/img/boen/b-r.png" alt="">
                                    </div>
                                </div>
                                <div class="value">66</div>
                            </div>
                            <div class="left-item">
                                <div class="text-werapper">
                                    <div>颅内压</div>
                                    <div style="width:100%;text-align:left;">Brain Edema</div>
                                    <div style="width:100%;text-align:left;" class="icon-wrapper">
                                        <img src="../../assets/img/boen/b-l.png" alt="">
                                        <img src="../../assets/img/boen/b-m.png" alt="">
                                        <img src="../../assets/img/boen/b-r.png" alt="">
                                    </div>
                                </div>
                                <div class="value">25</div>
                            </div>

                            <!-- <div class="text-info">*排除开颅、肿瘤</div> -->
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-t">

                        </div>
                        
                        <!--- 图表 ---->
                        <div class="right-chart">
                            <div id="chart1"></div>
                            <div id="chart2"></div>
                            <!-- <div id="chart3"></div> -->
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { Login } from '@/api/user';
import { queryPostList } from '@/api/data';
let passwordRule = (rule, value, callback)=>{
    if(value.length>=6) {
        callback();
    }else {
        callback(new Error('密码长度不能少于6位'));
    }
}
export default {
    data: function() {
        return {
            elName:'',
            curStartTime: '2019-07-31 08:00:00',
            day: '0',
            hour: '00',
            min: '00',
            second: '00',

            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { validator: passwordRule, trigger: 'blur' }
                ],
            },
        };
    },
    created(){
        sessionStorage.removeItem('ms_user');
        this.param.username = sessionStorage.getItem('userName');
        
        
    },
    mounted(){
        this.curStartTime = '2020-08-09'
        this.countTime();
        this.drawChatOne('rgba(197, 35, 231, 1)','rgba(197, 35, 231, 0)','chart1');
        this.drawChatOne('rgba(60, 167, 230, 1)','rgba(60, 167, 230, 0)','chart2');
        this.drawChatOne('rgba(247, 187, 87, 1)','rgba(247, 187, 87, 0)','chart3');
    },
    methods: {
        drawChatOne(color,color1,id){
            var totalFlowRate = this.$echarts.init(document.getElementById(id));
            var xAxisData=[];
            var yAxisData=[];
            for(var i=500 ;i>0;i--){
                xAxisData.push(i+"秒前");
            }
            for(i=1;i<501;i++){
                yAxisData.push(Math.round(Math.random()*1000));
            }
            var totalFlowRateOption = {
                animation:false,
                title: {
                    text: '总流量（kbps）'/*,
                    left:"110px"*/
                },
                grid: {
                    left: 50/*"50px"*/,
                    right: 15/*"15px"*/
                },
                legend: {
                    data:['当前流量']
                },
                xAxis: {
                    boundaryGap: false,
                    data: xAxisData
                },
                yAxis: {
                    boundaryGap:false
                },
                series: {
                    symbol:"none",/*去掉小圆点*/
                    name: '当前流量',
                    type: 'line',
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                width:2,//折线宽度
                                color:"#FF0000"//折线颜色
                            }
                        }
                    },
                    data: yAxisData/*,
                    smooth:true//0-1之间的数字或true或false，显示为平滑的曲线*/
                }
            };
            totalFlowRate.setOption(totalFlowRateOption);
            setInterval(function(){
                yAxisData.push(Math.round(Math.random()*1000));
                yAxisData.shift();
                totalFlowRate.setOption(totalFlowRateOption);
            },100);
        },
        // 倒计时
        countTime () {
            // 获取当前时间
            let date = new Date()
            let now = date.getTime()
            // 设置截止时间
            let endDate = new Date(this.curStartTime) // this.curStartTime需要倒计时的日期
            let end = endDate.getTime()
            // 时间差
            let leftTime = end - now
            // 定义变量 d,h,m,s保存倒计时的时间
            if (leftTime >= 0) {
                // 天
                this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
                // 时
                let h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
                this.hour = h < 10 ? '0' + h : h
                // 分
                let m = Math.floor(leftTime / 1000 / 60 % 60)
                this.min = m < 10 ? '0' + m : m
                // 秒
                let s = Math.floor(leftTime / 1000 % 60)
                this.second = s < 10 ? '0' + s : s
            } else {
                this.day = 0
                this.hour = '00'
                this.min = '00'
                this.second = '00'
            }
            // 等于0的时候不调用
            if (Number(this.hour) === 0 && Number(this.day) === 0 && Number(this.min) === 0 && Number(this.second) === 0) {
                return
            } else {
            // 递归每秒调用countTime方法，显示动态时间效果,
                setTimeout(this.countTime, 1000)
            }
        },　
    },
};
</script>

<style lang="scss" scoped>
#chart1 {
    width: 100%;
    height: 250px;
}
/deep/ .monitor {
    input {
        width: 60px;
    }
    span {
        font-size:13px;
    }
}
.container {
    .right {
        .right-chart {
            height: calc(100% - 53px);
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            div {
                flex: 1;
                width: 100%;
            }
        }
        .right-t {
            height: 53px;
            width: 100%;
            padding-left: 44px;
        }
        flex: 1;
    }
    .left {
        .left-item-wrapper {
            .text-info {
                font-size:14px;
                font-weight:400;
                color:rgba(1,146,114,1);
            }
            .left-item {
                &:not(:last-child) {
                    margin-bottom: 10px;
                }
                &:nth-child(1) {
                    background-image: url('../../assets/img/boen/bg-3.png');
                    background-size: cover;
                }
                &:nth-child(2) {
                    background-image: url('../../assets/img/boen/bg-1.png');
                    background-size: cover;
                }
                &:nth-child(3) {
                    background-image: url('../../assets/img/boen/bg-2.png');
                    background-size: cover;
                }
                padding: 0 20px 0 30px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .value {
                    font-size: 92px;
                    font-weight: bold;
                    color: #fff;
                }
                .text-werapper {
                    div {
                        &:nth-child(1){
                            width: 105px;
                        }
                    }
                    .icon-wrapper {
                        margin-top: 10px;
                        width: 100%;
                        padding-right: 30px;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: space-between;
                    }
                    div {
                        &:nth-child(1) {
                            color: rgba(255, 255, 255, 1);
                            font-size: 26px;
                            font-weight: bold;
                        }
                        &:nth-child(2) {
                            color: rgba(255, 255, 255, 1);
                            font-size: 13px;
                        }
                    }
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                }
                height: 134px;
                width: 303px;
            }
        }
        .left-input {
            margin-bottom: 23px;
            .select-wrapper {
                flex: 0 0 140px;
                span {
                    font-size: 16px;
                }
            }
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        padding-top: 14px;
        box-sizing: border-box;
        flex: 0 0 303px;
    }
    padding: 12px 10px 17px 16px;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex: 1;
    margin-top: 19px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(204, 204, 204, 1);
    box-shadow:0px 2px 5px 0px rgba(12,3,6,0.2);
    border-radius:8px;
}
.save-wrapper {
    .bottom {
        div {
            &:nth-child(1) {
                font-size:9px;
                font-weight:normal;
                color:rgba(0,0,0,.4);
            }
            &:nth-child(2) {
                font-size:14px;
                font-weight:normal;
                color:rgba(65,176,134,1);
            }
        }
    }
    .top {
        font-size:12px;
        font-weight:normal;
        color:rgba(0,0,0,.56);
    }
    height: 95px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
}
.btn-wrapper {
    height: 95px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    div {
        width:90px;
        height:45px;
        border:1px solid rgba(60, 185, 157, 1);
        box-sizing: border-box;
        box-shadow:0px 2px 0px 0px rgba(255,255,255,0.3);
        font-size:16px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:45px;
        text-align: center;
        box-sizing: border-box;
    }
}
.time-wrapper {
    .time-con {
        font-size:38px;
        font-weight:bold;
        color:rgba(1,146,114,1);
    }
    .time-text {
        span {
            display: inline-block;
            &:not(:first-child) {
                margin-left: 38px;
            }
        }
        width: 100%;
        
        font-size:19px;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    height: 100%;
    margin-right: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.begin-btn {
    width:158px;
    height: 95px;
    margin-left: 21px;
    margin-right: 15px;
    border-radius:8px;
    font-size:27px;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:95px;
    text-align: center;
}
.select-container {
    height: 95px;
    width: 140px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-end;
}
.textarea-1 {
    margin: 0 20px;
    width:464px;
    height:328px;
}
.btn-1 {
    width:98px;
    height:48px;
}
.btn-2 {
    width:84px;
    height:30px;
    font-size:14px;
    margin-top: -10px;
}
.password {
    width:250px;height:40px;
    margin-bottom: 39px;
}
.login-wrap {
    width: 100%;
    height: 100%;
    .loading-img {
        width:100%;
        height:100%;
        background:#E1ECEF;
        box-shadow:0px 4px 10px 0px rgba(12,3,6,0.2);
        border-radius:8px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-end;
        .bth-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
        .input-wrapper {
            width: 100%;
            flex: 1;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            align-items: center;
            padding: 19px 20px 20px 20px;
            box-sizing: border-box;
            .info-wrapper {
                height: 95px;
                margin-left: 16px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex-direction: column;
                align-items: flex-start;
                .item{ 
                    font-weight: bold;
                    font-size: 16px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .label {
                        color: #777F8F;
                        margin-right: 3px;
                    }
                    .value {
                        color: #4EB6CC;
                    }
                }
            }
            .userinfo {
                width: 100%;
                flex: 0 0 95px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .line {
                    width:1px;
                    height:92px;
                    background: #5D6B75;
                    opacity: 0.4;
                    margin: 0 29px;
                }
                .img-wrapper{
                    width:95px;
                    height:95px;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 2px 5px 0px rgba(12,3,6,0.2);
                    border-radius:10px;
                }
            }
        }
        .title {
            width:100%;
            flex:0 0 60px;
            padding: 0 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background:linear-gradient(0deg,rgba(230,230,230,1),rgba(255,255,255,1));
            box-shadow:0px 2px 4px 0px rgba(12,3,6,0.1), 0px -8px 18px 0px rgba(255,255,255,0.9);
            border-radius:8px 8px 0 0;
            font-size:24px;
            font-weight:bold;
            color:rgba(153,153,153,1);
            line-height:30px;
            text-shadow:0px 2px 0px rgba(255,255,255,1);
        }
    }
}
</style>