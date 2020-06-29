<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                <div></div>
                实时监护
                <button class="el-btn btn-1" @click="goHomePage">
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
                        <div class="el-btn el-btn-info-mlv modify" @click="goModifyCase">修改病历</div>
                        <div class="el-btn el-btn-info-mlv print">打 印</div>
                    </div>

                    <div class="save-wrapper">
                        <div class="top">
                            <img src="../../assets/img/boen/save.png" alt="">
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
                                <div class="value">{{showItem&&showItem.PerturbValue}}</div>
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
                                <div class="value">{{showItem&&showItem.EdemaValue}}</div>
                            </div>
                            <div class="left-item left-item-disabled" v-if="!isClose" style="position:relative;">
                                <div class="label">颅内压<span>Brain Edema</span></div>
                                <div class="switch closed" @click="switchItem">
                                    <div class="switch-wrapper">
                                        <div class="switch-radio"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="left-item" v-if="isClose" style="position:relative;">
                                <div class="text-werapper">
                                    <div>颅内压</div>
                                    <div style="width:100%;text-align:left;">Brain Edema</div>
                                    <div style="width:100%;text-align:left;" class="icon-wrapper">
                                        <img src="../../assets/img/boen/b-l.png" alt="">
                                        <img src="../../assets/img/boen/b-m.png" alt="">
                                        <img src="../../assets/img/boen/b-r.png" alt="">
                                    </div>
                                </div>
                                <div class="value">{{showItem&&showItem.ICPValue}}</div>
                                <div class="switch " @click="switchItem">
                                    <div class="switch-wrapper">
                                        <div class="switch-radio"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-info">*排除开颅、肿瘤</div>
                        </div>
                    </div>
                    <div class="right">
                       
                        <div class="right-t">
                            <div class="select">
                                <div>单一数据/ 全部数据</div>
                            </div>
                            <div class="x-y">
                                <span>X</span>
                                <span>Y</span>
                            </div>
                            <div class="left-top">
                                <span>左</span>
                                <span>上</span>
                            </div>
                            <div class="right-bottom">
                                <span>右</span>
                                <span>下</span>
                            </div>
                            <div class="fd">放大</div>
                            <div class="sx">缩小</div>
                            <div class="fw">复位</div>
                        </div>
                        
                        <!--- 图表 ---->
                        <div class="right-chart">
                            <div id="chart1"></div>
                            <div id="chart2"></div>
                            <div id="chart3" :style="{'visibility':!isClose?'hidden':''}"></div>
                            <!-- BNPerturbValue   扰动系数
                            BNEdemaValue   水肿系数
                            BNICPValue   颅内压 -->
                            <!-- <div class="time-text">
                                
                            </div> -->
                            <div class="time-label">时间</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { Login } from '@/api/user';
import { queryPostList } from '@/api/data';
export default {
    data: function() {
        return {
            isClose:true,
            websock: null,//建立的连接
            lockReconnect: false,//是否真正建立连接
            timeout: 5*1000,//30秒一次心跳
            timeoutObj: null,//心跳心跳倒计时
            serverTimeoutObj: null,//心跳倒计时
            timeoutnum: null,//断开 重连倒计时
            chartData:[],
            chartTime:[],

            elName:'',
            curStartTime: '2019-07-31 08:00:00',
            day: '0',
            hour: '00',
            min: '00',
            second: '00',

        };
    },
    created(){
        this.initWebSocket();
    },
    destroyed: function() {
        //页面销毁时关闭长连接
        this.websocketclose();
    },
    mounted(){
        this.curStartTime = '2020-08-09'
        this.countTime();
        this.drawChart()
    },
    computed:{
        showItem(){
            let lastItem = this.chartData.slice(-1) || []
            console.log(lastItem)
            return lastItem[0];
        }
    },
    methods: {
        switchItem(){
           this.isClose= !this.isClose; 
        },
        goHomePage(){
            this.$router.go(-1);
        },
        goModifyCase(){
            this.$router.push({
                path: "/modifyCase",
            });
        },
        initWebSocket(){//建立连接
            //初始化weosocket
            //const wsuri = "ws://sms.填写您的地址.com/websocket/" + this.charId; //ws地址
           const wsuri = "ws://127.0.0.1:5000/WebSocketGd" 
           //建立连接
            this.websock = new WebSocket(wsuri);
            //连接成功
            this.websock.onopen = this.websocketonopen;
            //连接错误
            this.websock.onerror = this.websocketonerror;
            //接收信息
            this.websock.onmessage = this.websocketonmessage;
            //连接关闭
            this.websock.onclose = this.websocketclose;
        },
        reconnect() {//重新连接
            var that = this;
            if(that.lockReconnect) {
                return;
            };
            that.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            that.timeoutnum && clearTimeout(that.timeoutnum);
            that.timeoutnum = setTimeout(function () {
                //新连接
                that.initWebSocket();
                that.lockReconnect = false;
            },5000);
        },
        reset(){//重置心跳
            var that = this;
            //清除时间
            clearTimeout(that.timeoutObj);
            clearTimeout(that.serverTimeoutObj);
            //重启心跳
            that.start();
        },
        start(){//开启心跳
            var self = this;
            self.timeoutObj && clearTimeout(self.timeoutObj);
            self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
            self.timeoutObj = setTimeout(function(){
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                if (self.websock.readyState == 1) {//如果连接正常
                    self.websock.send(JSON.stringify({ 'status': true }));
                }else{//否则重连
                    self.reconnect();
                }
                self.serverTimeoutObj = setTimeout(function() {
                    //超时关闭
                    self.websock.close();
                }, self.timeout);

            }, self.timeout)
        },
        websocketonopen() {//连接成功事件
            //开启心跳
            this.start();
        },
        
        websocketonerror(e) {//连接失败事件
            //错误
            console.log("WebSocket连接发生错误");
            //重连
            this.reconnect();
        },
        websocketclose(e) {//连接关闭事件
            //关闭
            console.log( e );
            //重连
            this.reconnect();
        },
        // BNPerturbValue   扰动系数
        // BNEdemaValue   水肿系数
        // BNICPValue   颅内压
        websocketonmessage(event) {//接收服务器推送的信息
            //打印收到服务器的内容
            console.log(JSON.parse(event.data));
            let resData = JSON.parse(event.data);
            
            if(!resData.hasOwnProperty('status')) {
                let item = JSON.parse(resData[0]);
                item.dateTime = moment(item.datetime).format("mm:ss MM-DD ");
                item.secondTime = moment(item.datetime).format("mm:ss");
                this.chartTime.push(item.dateTime);
                this.chartData.push(item);
                this.drawChart();
            }
            console.log(this.chartData)
            //收到服务器信息，心跳重置
            this.reset();
        },
        websocketsend(msg) {//向服务器发送信息
            //数据发送
            this.websock.send(msg);
        },
        drawChart(){
            this.drawChatOne('rgba(197, 35, 231, 1)','rgba(197, 35, 231, 0)','chart1','PerturbValue');
            this.drawChatOne('rgba(60, 167, 230, 1)','rgba(60, 167, 230, 0)','chart2','EdemaValue');
            this.drawChatOne('rgba(247, 187, 87, 1)','rgba(247, 187, 87, 0)','chart3','ICPValue');
        },
        drawChatOne(color,color1,id,type){
            let xData = this.chartTime.slice(-7);
            let yData = this.chartData.slice(-7);
            let yDataValue = [];
            yData.map(item=>{
                console.log(item[type],type,item)
                yDataValue.push(item[type]*1*Math.random())
            })            
            console.log(xData,yDataValue)
            var myChartLine = this.$echarts.init(document.getElementById(id));
            let optionLine =  {
                animation: false,
                tooltip: {
                    trigger: 'axis'
                },
                lineStyle:{
                    normal:{
                        color:'#32A8FF'
                    }
                },
                areaStyle:{
                    normal:{
                    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
                            offset: 0,
                            color: 'rgba(80,141,255,0.39)'
                        }, {
                            offset: .34,
                            color: 'rgba(56,155,255,0.25)'
                        },{
                            offset: 1,
                            color: 'rgba(38,197,254,0.00)'
                        }])
                    }
                },
                grid: {
                    left: type=='ICPValue'?'4%':'3%',
                    right: '2%',
                    bottom: '3%',
                    top:'10',
                    containLabel: true
                },
                xAxis: {
                    splitLine: {
                        show: true,
                    },
                    type: 'category',
                    inverse:true,   //此属性控制方向,默认为false,改为true就达到你要的要求了
                    boundaryGap:false,
                    // label: {
                    //     show: false
                    // },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {//y轴文字的配置
                        show: type=='ICPValue',
                        textStyle: {
                            color: '#566278'
                        },
                        formatter:function(value){  
                            return value.split(" ").join("\n");  
                        }  
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: color,
                            width: 2,
                            type: "solid"
                        },
                    },
                    splitNumber:6,
                    data:xData
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {//y轴文字的配置
                        textStyle: {
                            fontSize: '14',
                            color: "rgba(86, 98, 120, 1)",
                        },
                    },
                    axisLine: {//y轴线的颜色以及宽度
                        show: true,
                        lineStyle: {
                            color: color,
                            width: 2,
                            type: "solid"
                        },
                    },
                    // EdemaValue ICPValue PerturbValue
                    min:0,
                    splitNumber: 4, 
                    max:type=='PerturbValue'?250:type=='EdemaValue'?200:50,
                    // minInterval:type=='PerturbValue'?50:type=='EdemaValue'?40:10
                },
                series: [
                    {
                        name:'浏览次数',
                        type:'line',
                        stack: '总量1',
                        symbol: 'circle',
                        symbolSize: 5,
                        sampling: 'average',
                        itemStyle: {
                            color: 'rgba(197, 35, 231, .7)'
                        },
                        markLine: {
                            symbol: ['none', 'none'],
                            label: {show: false},
                            data: [
                                {xAxis: 2},
                                {xAxis: 3},
                                {xAxis: 5},
                                {xAxis: 7}
                            ]
                        },
                        areaStyle: {normal: {}},
                        data:yDataValue,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: color //'rgba(197, 35, 231, 1)'
                                }, {
                                    offset: 1,
                                    color: color1
                                }]),
                                opacity: 1,
                            }
                        }
                    }
                ]
            }
            myChartLine.setOption(optionLine);
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
            .time-label {
                width: auto;
                font-size:14px;
                font-weight:400;
                color:rgba(1,146,114,1);
                position: absolute;
                right: 4px;
                bottom: 4px;
            }
            position: relative;
            height: calc(100% - 53px);
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            div {
                &:nth-child(1) {
                    flex: 1;
                }
                &:nth-child(2) {
                    flex: 1;
                }
                &:nth-child(3) {
                    flex: 1;
                }
                width: 100%;
            }
        }
        .right-t {
            font-size:17px;
            font-weight:bold;
            color: #777F8F;
            padding-left: 58px;
            padding-right: 15px;
            box-sizing: border-box;
            .select {
                color: #777F8F;
                line-height: 53px;
                text-align: center;
                width:180px;
                height:53px;
                background-image: url('../../assets/img/boen/jx.png');
                background-size: contain;
            }
            .x-y {
                span {
                    flex: 1;
                    text-align: center;
                    &:nth-child(1){
                        color:#fff;
                    }
                }
                display: flex;
                justify-content: center;
                align-items: center;
                width:77px;
                height:53px;
                background-image: url('../../assets/img/boen/XY.png');
                background-size: cover;
            }
            .left-top {
                span {
                    &:nth-child(2){
                        color:#C0C4CC;
                    }
                }
                width:55px;
                height:53px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                background-image: url('../../assets/img/boen/Left.png');
                background-size: cover;
            }
            .right-bottom {
                span {
                    &:nth-child(2){
                        color:#C0C4CC;
                    }
                }
                width:55px;
                height:53px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                background-image: url('../../assets/img/boen/Left.png');
                background-size: cover;
            }
            .fd {
                line-height: 53px;
                text-align: center;
                width:55px;
                height:53px;
                font-size:17px;
                font-weight:bold;
                color:rgba(119,127,143,1);
                background-image: url('../../assets/img/boen/Left.png');
                background-size: cover;
            }
            .sx {
                width:55px;
                height:53px;
                line-height: 53px;
                text-align: center;
                font-size:17px;
                font-weight:bold;
                color:rgba(119,127,143,1);
                background-image: url('../../assets/img/boen/Left.png');
                background-size: cover;
            }
            .fw {
                width:63px;
                height:53px;
                line-height: 53px;
                font-size:17px;
                font-weight:bold;
                text-align: center;
                color:rgba(119,127,143,1);
                background-image: url('../../assets/img/boen/Reset.png');
                background-size: cover;
            }
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 53px;
            width: 100%;
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
            .left-item-disabled {
                padding: 0 20px 0 10px !important;
                background-image: none !important;
                font-weight: bold;
                span {
                    font-weight: normal;
                    margin-left: 4px;
                }
                .label {
                    color: rgba(218, 118, 0, 1);
                }
                align-items: flex-start !important;
            }
            .left-item {
                .closed {
                    .switch-radio {
                        left: 1px !important;         
                    }     
                    background:#ccc !important;   
                }
                .switch {
                    .switch-wrapper {
                        .switch-radio {
                            top: 1px;
                            right: 1px;
                            position: absolute;
                            width:13px;
                            height:13px;
                            background:rgba(255,255,255,1);
                            border-radius:50%;
                        }
                        position: relative;
                        width: 100%;
                        height: 100%;
                    }
                    cursor: pointer;
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    width:30px;
                    height:16px;
                    background:rgba(0,215,0,1);
                    box-shadow:1px 0px 2px 0px rgba(0, 0, 0, 0.28);
                    border-radius:8px;
                }
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
        img {
            margin-bottom: 5px;
        }
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
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
        width: 145px;
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
    cursor: pointer;
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
    background-image: url('../../assets/img/boen/bg-white.png');
    background-size: contain;
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
                        color: rgba(1, 146, 114, 1);
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