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
                        <img src="../../assets/icons/user.png" alt="">
                    </div>
                    <!-- 头像 -->
                    <div class="info-wrapper">
                        <div class="item">
                            <div class="label">编号:</div>
                            <div class="value">{{userInfo&&userInfo.strID}}</div>
                        </div>
                        <div class="item">
                            <div class="label">姓名:</div>
                            <div class="value">{{userInfo&&userInfo.strName}}</div>
                        </div>
                        <div class="item">
                            <div class="label">年龄:</div>
                            <div class="value">{{userInfo&&userInfo.nAge | ageText}}</div>
                        </div>
                        <div class="item">
                            <div class="label">性别:</div>
                            <div class="value">{{userInfo&&userInfo.IsMan?'男':'女'}}</div>
                        </div>
                    </div>

                    <div class="line"></div>

                    <div class="select-container">
                        <ownInput label="头围"  endLabel="kg" v-model="HemaBefore"></ownInput>
                        <ownInput label="体重"  endLabel="cm" v-model="HydrocephalusValue"></ownInput>
                        <ownInput label="身高"  endLabel="cm" v-model="elName"></ownInput>
                    </div>

                    <div class="el-btn-info-lv begin-btn" @click="beginWatch" v-if="pathType==1&&!isBegin">开 始</div>
                    <div class="el-btn-info-lv begin-btn" @click="cloaseWatch" v-if="pathType==1&&isBegin">停止监护</div>
                    <div class="time-wrapper" v-show="pathType==1">
                        <div class="time-text">
                            <span>时</span>
                            <span>分</span>
                            <span>秒</span>
                        </div>
                        <div class="time-con">
                            {{hour}}:{{min}}:{{second}}
                        </div>

                        <ownInput class="monitor" label="监护时间" endLabel="分钟" v-model="guardTime"></ownInput>
                    </div>

                    <div class="btn-wrapper">
                        <div class="el-btn el-btn-info-mlv modify" @click="goModifyCase">修改病历</div>
                        <div class="el-btn el-btn-info-mlv print" @click="showPrint = true;">打 印</div>
                    </div>

                    <div class="save-wrapper">
                        <div class="top">
                            <span>时间</span>
                            <span>{{nowTime}}</span>
                        </div>
                        <div class="bottom">
                            <div>{{nowYear}}</div>
                            <div>{{nowDate}}</div>
                        </div>
                    </div>
                </div>
                
                <div class="container">
                    <div class="left">
                        <div class="left-input">
                            <ownInput label="脑积水" v-model="elName"></ownInput>
                            <ownInput label="脑出血" v-model="elName"></ownInput>
                        </div>

                        <div class="left-item-wrapper">
                            
                            <div class="left-item bg-1" v-if="showCon==1 || showCon == 2">
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
                            <div class="left-item bg-2"  v-if="showCon==1 || showCon == 3">
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
                                <div class="unit" v-if="showItem&&showItem.EdemaValue">ml</div>
                            </div>
                            <!-- <div class="left-item left-item-disabled" v-if="!isClose" style="position:relative;">
                                <div class="label">颅内压<span>Brain Edema</span></div>
                                <div class="switch closed" @click="switchItem">
                                    <div class="switch-wrapper">
                                        <div class="switch-radio"></div>
                                    </div>
                                </div>
                            </div> -->
                            <div class="time-label">时间 <span>time</span> </div>
                            <!-- <div class="left-item" v-if="isClose" style="position:relative;">
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
                            </div> -->

                            <!-- <div class="text-info">*排除开颅、肿瘤</div> -->
                        </div>

                        <div class="status-icon">
                            <div class="icon" :class="[isBegin?'active_1':'']"></div>
                            <div class="icon" :class="[isBegin?'active_2':'']"></div>
                            <div class="btn" @click="isShowChart = !isShowChart;">{{isShowChart?'收起实时数据':'查看实时数据'}}</div>
                            <div class="chart-wrapper" v-show="isShowChart">
                                <div id="chartOnline" style="height:200px;width:200px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                       
                        <div class="right-t">
                            <div class="select" @click="chooseCircle = true;">
                                <div>单一数据/ 全部数据</div>
                            </div>
                            <div class="x-y" :class="[xyNum==2?'active':'']" @click="changeXY">
                                <span>X</span>
                                <span>Y</span>
                            </div>
                            <div class="left-top" @click="toPosition">
                                <span :class="[xyNum==2?'active_t':'']">左</span>
                                <span :class="[xyNum==1?'active_t':'']">上</span>
                            </div>
                            <div class="right-bottom" @click="toPositionTwo">
                                <span :class="[xyNum==2?'active_t':'']">右</span>
                                <span :class="[xyNum==1?'active_t':'']">下</span>
                            </div>
                            <div class="fd" @click="scaleBig">放大</div>
                            <div class="sx" @click="scaleSmall">缩小</div>
                            <div class="fw" @click="resetStatus">复位</div>
                        </div>
                        
                        <!--- 图表 ---->
                        <div class="right-chart">
                            <div id="chart1"  v-show="showCon==1 || showCon == 2"></div>
                            <div id="chart2"  v-show="showCon==1 || showCon == 3"></div>
                            <div id="chart3-wrapper">
                                <div id="chart3"></div>
                            </div>

                            <div class="chart1-text" :class="[showCon == 2?'chart1-text_height':'']"  v-show="showCon==1 || showCon == 2">
                                <span class="text">250</span>
                                <span class="text">200</span>
                                <span class="text">150</span>
                                <span class="text">100</span>
                                <span class="text">50</span>
                                <span class="text">0</span>
                            </div>

                            <div class="chart1-text text-two" :class="[showCon == 3?'chart2-text_height':'']" v-show="showCon==1 || showCon == 3">
                                <span class="text">200</span>
                                <span class="text">150</span>
                                <span class="text">100</span>
                                <span class="text">50</span>
                                <span class="text">0</span>
                            </div>
                            <!-- <div id="chart3" :style="{'visibility':!isClose?'hidden':''}"></div> -->
                            <!-- BNPerturbValue   扰动系数
                            BNEdemaValue   水肿系数
                            BNICPValue   颅内压 -->
                            <!-- <div class="time-text">
                                
                            </div> -->
                           
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        <modifyCase :modify-data="userInfo" :modify-item="modifyItem" :show-layer="showLayer" @closeLayer="showLayer = false"/>

        <div class="print-wrapper" v-if="showPrint">
            <div class="dialog-title">选择打印数据</div>
            <div class="dialog-content">
                <div class="item">
                    <span>开始时间</span>
                    <input style="width:50%;" type="text" class="ownInput ownInput-lg" placeholder />
                </div>
                <div class="item">
                    <span>结束时间</span>
                    <input style="width:50%;" type="text" class="ownInput ownInput-lg" placeholder />
                </div>
            </div>

            <div class="dialog-btn-wrapper" style="flex-direction: row;margin-right:0px;border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;">
                <button class="el-btn blue-btn" @click="showPrint=false">取消</button>
                <button class="el-btn blue-btn">确认</button>
            </div>
        </div>

        <div class="print-wrapper" v-if="chooseCircle">
            <div class="dialog-title">选择曲线</div>
            <div class="dialog-content">
                <div class="item" style="justify-content: center;">
                    <div class="radio-item" @click="chooseIndex=1">
                        <span class="check-radio" :class="{'check-radio-actived':chooseIndex==1}"></span>
                        <span>全部数据</span>
                    </div>
                </div>
                <div class="item" style="justify-content: center;" >
                   <div class="radio-item" @click="chooseIndex=2" >
                        <span class="check-radio" :class="{'check-radio-actived':chooseIndex==2}"></span>
                        <span>扰动系数</span>
                    </div>
                    <div class="radio-item" style="margin-left:40px"  @click="chooseIndex=3" >
                        <span class="check-radio" :class="{'check-radio-actived':chooseIndex==3}"></span>
                        <span>水肿系数</span>
                    </div>
                </div>
            </div>

            <div class="dialog-btn-wrapper" style="flex-direction: row;margin-right:0px;border-bottom-left-radius: 8px;border-bottom-right-radius: 8px; justify-content:center;">
                <button class="el-btn blue-btn" @click="confirmType">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { Login } from '@/api/user';
import { queryPostList } from '@/api/data';
import { StartGuard,StopGuard,ScanPatientData } from '@/api/monitor';
import modifyCase from './modifyCase';

let timer,timerTwo;
export default {
    components:{
        modifyCase
    },
    data: function() {
        return {
            modifyItem:{},
            isShowChart:false,
            splitNumberOne:6,
            splitNumberTwo:4,
            minMaxTop:{
                min:0,
                max:250
            },
            minMaxBottom:{
                min:0,
                max:200
            },
            isPos:false,  //是否不是初始位置
            posX:0,
            rangeNum:8,
            scalcNum:0,
            startY:0,
            endY:100,
            start:0,
            end:100,
            xyNum:1,
            showCon: 1,  //1 全部  2 第一个 3第二个
            nowTime:'', //当前时间
            nowDate:'', //当前时间
            nowYear:'', //当前时间
            showPrint:false,
            chooseCircle:false,
            chooseIndex:1,
            showLayer:false,
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
            

            strID:'',
            guardTime:15, //监护时间
            AtroFlags:0,
            GCS:4,
            InfarFlags:0,
            HydrFlags:0,
            HydrocephalusValue:'',
            HemaFlags:-1,
            HemaBefore:'',
            HemaAfter:'',

            userInfo:{},
            myChartOne:'',
            chartDataOne:[],
            myChartTwo:'',
            myChartThree:'',
            chartDataTwo:[],

            pathType:1,
            isBegin:false
        };
    },
    beforeDestroy(){
        //页面销毁时关闭长连接
        this.cloaseWatch();
        this.websock.close();
    },
    created(){
        this.userInfo = JSON.parse(sessionStorage.getItem('item-user-info')) || this.$route.params;
        this.strID = this.userInfo.strID;
        this.pathType = this.$route.params.pathType?this.$route.params.pathType:1;
        timerTwo = setInterval(()=>{
            if(this.websock && this.pathType==2) {
                ScanPatientData({
                    strID:this.strID
                }).then(res=>{
                    clearInterval(timerTwo);
                    this.chartData = res.data.map(item=>{
                        item.dateTime =''+ moment(item.BNDT).format('hh:mm MM-DD') + ' '; //19:08 10-17
                        return item;
                    });
                    console.log(this.chartData)
                    this.setData();
                })
            }
        },1000)
       
        // if(this.pathType==2){
        //     setTimeout(()=>{
        //         this.beginWatch();
        //     },2000)
        // }

        this.nowDate = moment(new Date()).format('YYYY');
        this.nowYear = moment(new Date()).format('MM.DD');
        setInterval(()=>{
            this.nowTime = moment(new Date()).format('HH:mm:ss');
        },1000)
        
       
        this.initWebSocket();
    },
    mounted(){
        
        this.myChartOne = this.$echarts.init(document.getElementById('chart1'));
        this.myChartTwo = this.$echarts.init(document.getElementById('chart2'));
        this.myChartThree = this.$echarts.init(document.getElementById('chart3'));
        this.myChartOnline = this.$echarts.init(document.getElementById('chartOnline'));
       
       

        this.curStartTime = '2020-08-09'
        this.drawChart();
        setTimeout(()=>{
            this.drawOnline();

            window.onresize = ()=>{
                this.myChartOne.resize();
                this.myChartTwo.resize();
                this.myChartThree.resize();
            };
            let canvasDom =document.querySelectorAll('canvas');
            console.log(canvasDom)
            for(let i=1;i<canvasDom.length;i++){
                if(i<3){
                    canvasDom[i].style.border= `solid 2px ${i==1?'rgba(197, 35, 231, 1)':'rgba(60, 167, 230, 1)'}`;
                    canvasDom[i].style.borderRadius= '10px'
                }
            }
           
        },0)
    },
    computed:{
        showItem(){
            let lastItem = this.chartData.slice(-1) || []
            console.log(lastItem)
            return lastItem[0];
        }
    },
    filters:{
        ageText(val){
            // console.log(val)
            return (val+'').substr(0,2) || '';
        }
    },
    methods: {
        toPosition(){
            this.isPos = true;
            if(this.xyNum == 1) {
                if(this.start>this.rangeNum) {
                    this.start -= this.rangeNum*2;
                    this.end -= this.rangeNum*2;
                }
            } else {
                this.minMaxTop = {
                    min:this.minMaxTop.min-15,
                    max:this.minMaxTop.max-15
                };
                 this.minMaxBottom = {
                    min:this.minMaxBottom.min-15,
                    max:this.minMaxBottom.max-15
                };
                
            }
            
            this.setData();
        },
        toPositionTwo(){
            this.isPos = true;
            if(this.xyNum == 1) {
        
                if((this.end+this.rangeNum)<100) {
                    this.start += this.rangeNum*2;
                    this.end += this.rangeNum*2;
                }
            } else {
                this.minMaxTop = {
                    min:this.minMaxTop.min+15,
                    max:this.minMaxTop.max+15
                };
                this.minMaxBottom = {
                    min:this.minMaxBottom.min+15,
                    max:this.minMaxBottom.max+15
                };
            }
            console.log( this.minMaxBottom)
            this.setData();
        },
        scaleBig(){
            if(this.endY>100 || this.startY<0){
                return
            }
            this.splitNumberOne+=3;
            this.splitNumberTwo+=3;
            // this.minMaxTop = {
            //     min:this.minMaxTop.min+35,
            //     max:this.minMaxTop.max+35
            // };
            // this.minMaxBottom = {
            //     min:this.minMaxBottom.min+35,
            //     max:this.minMaxBottom.max+35
            // };
            this.startY+=3;
            this.endY-=3;
            console.log(this.startY,this.endY,this.splitNumberOne,this.splitNumberTwo)
            this.setData();
        },
        scaleSmall(){
            if(this.startY<0 || this.endY>100){
                return
            }
            this.splitNumberOne-=3;
            this.splitNumberTwo-=3;
            // this.minMaxTop = {
            //     min:this.minMaxTop.min-35,
            //     max:this.minMaxTop.max-35
            // };
            // this.minMaxBottom = {
            //     min:this.minMaxBottom.min-35,
            //     max:this.minMaxBottom.max-35
            // };
            console.log(this.startY,this.endY,this.splitNumberOne,this.splitNumberTwo)
            this.startY-=3;
            this.endY+=3;
            this.setData();
        },
        resetStatus(){
            this.isPos = false;
            this.minMaxTop = {
                min:0,
                max:250
            };
            this.minMaxBottom = {
                min:0,
                max:200
            };
            this.startY = 0;
            this.endY = 100;
            this.computedPosition(this.chartTime.length);
            this.setData();
        },
        changeXY(){
            this.xyNum = this.xyNum == 1?2:1;
        },
        confirmType(){
            this.chooseCircle = false;
            this.showCon=this.chooseIndex;
            setTimeout(()=>{
                this.myChartOne.resize();
                this.myChartTwo.resize();
                this.myChartThree.resize();
            },100)
           
        },
        cloaseWatch(){
            
            StopGuard().then(res=>{
                this.isBegin = false;
                timer && clearInterval(timer);
            })
        },
        beginWatch(){
            this.isBegin = true;
            this.myChartOne.showLoading({
                text: '数据获取中...',
                textStyle: { fontSize : 30 , color: '#444' },
                effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
            });
            this.myChartTwo.showLoading({
                text: '数据获取中...',
                textStyle: { fontSize : 30 , color: '#444' },
                effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
            });
            this.loadTime(this.guardTime);
            console.log(this.strID)
            StartGuard({
                strID:this.strID,
                guardTime:this.guardTime,
                AtroFlags:this.AtroFlags,
                GCS:this.GCS,
                InfarFlags:this.InfarFlags,
                HydrFlags:this.HydrFlags,
                HydrocephalusValue:this.HydrocephalusValue,
                HemaFlags:this.HemaFlags,
                HemaBefore:this.HemaBefore,
                HemaAfter:this.HemaAfter
            }).then(res=>{
                console.log(res)
            })
        },
        loadTime(time){
            if(!time) {
                return
            }
            
            timer && clearInterval(timer);
            let end =  moment(new Date()).add(time, 'minutes').valueOf() + 1000;//设置截止时间
            let countTime = ()=>{
                let now = new Date().getTime();    
                let leftTime = end - now; //时间差
                let d, h, m, s, ms;
                if(leftTime >= 0) {
                    // d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                    h = Math.floor(leftTime / 1000 / 60 / 60);
                    m = Math.floor(leftTime / 1000 / 60 % 60);
                    s = Math.floor(leftTime / 1000 % 60);
                    ms = Math.floor(leftTime % 1000);
                    if(ms < 100) {
                        ms = "0" + ms;
                    }
                    if(s < 10) {
                        s = "0" + s;
                    }
                    if(m < 10) {
                        m = "0" + m;
                    }
                    if(h < 10) {
                        h = "0" + h;
                    }
                } else {
                    clearInterval(timer)
                    this.cloaseWatch();
                    console.log('已截止')
                }
                this.hour = h;
                this.min = m;
                this.second = s ;
                // console.log(h,m,s)
            }
            timer = setInterval(()=>{
                countTime();
            }, 1000);
        },
        switchItem(){
           this.isClose= !this.isClose; 
        },
        goHomePage(){
            let url = sessionStorage.getItem("backUrl");
            this.$router.push({
                path:'/' + url,
                query:{
                    type:1
                }
            });
        },
        goModifyCase(){
            this.showLayer = true;
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
            that.startFun();
        },
        startFun(){//开启心跳
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
            this.startFun();
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
        },
        // BNPerturbValue   扰动系数
        // BNEdemaValue   水肿系数
        // BNICPValue   颅内压
        websocketonmessage(event) {//接收服务器推送的信息
            //打印收到服务器的内容
            console.log('接受到数据',event.data);
            let resData = JSON.parse(event.data);
            
            if(!resData.hasOwnProperty('status')) {
                let item = JSON.parse(resData[0]);
                item.dateTime = moment(item.datetime).format("mm:ss MM-DD ");
                item.secondTime = moment(item.datetime).format("mm:ss");
                this.chartData.push(item);

                this.myChartOne.hideLoading();
                this.myChartTwo.hideLoading();
                if(!this.isPos){
                    this.setData();
                }
                
            }
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
            // this.drawChatOne('rgba(247, 187, 87, 1)','rgba(247, 187, 87, 0)','chart3','ICPValue');
        },
        drawOnline(){
            let option = {
                backgroundColor: '#2c343c',
                grid:{
                    left:'2%',
                    right:'0',
                    top:'10%',
                    bottom:'1%',
                    containLabel:true
                },
                xAxis: {
                    show:false,
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: { //轴文字标签
                        textStyle: {
                            color: '#B0CEFC',
                        }
                    },
                    min: 200
                },
                series: [{
                    itemStyle: {
                        normal: {
                            color: '#fff', //改变折线点的颜色
                            lineStyle: {
                                color: '#fff' //改变折线颜色
                            }
                        }
                    },
                    label: {
                        color: 'rgba(255, 255, 255, 1)'
                    },
                    data: [210, 225, 247, 246, 245, 230, 236],
                    type: 'line',
                    smooth: true
                }]
            };
            this.myChartOnline.setOption(option);
        },
        drawChatOne(color,color1,id,type){      
            let optionLine =  {
                animation: true,
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
                    left:0,
                    right: 0,
                    bottom: 0,
                    top:0,
                    containLabel: true
                },
                xAxis: {
                    splitLine: {
                        show: true,
                    },
                    type: 'category',
                    // // inverse:true,   //此属性控制方向,默认为false,改为true就达到你要的要求了
                    boundaryGap:false,
                    label: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {//y轴文字的配置
                        show: true,
                        textStyle: {
                            color: '#566278'
                        },
                        formatter:function(value){  
                            return value.split(" ").join("\n");  
                        }  
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: color,
                            width: 2,
                            type: "solid"
                        },
                    },
                    splitNumber:this.splitNumberOne,
                    data:this.chartTime
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: true
                    },
                    axisTick: {
                        show: true
                    },
                    axisLabel: {//y轴文字的配置
                        show: false,
                        textStyle: {
                            fontSize: '14',
                            color: "rgba(86, 98, 120, 1)",
                        },
                    },
                    axisLine: {//y轴线的颜色以及宽度
                        show: false,
                        lineStyle: {
                            color: color,
                            width: 0,
                            type: "solid"
                        },
                    },
                    // EdemaValue ICPValue PerturbValue
                    min:0,
                    splitNumber: this.splitNumberTwo, 
                    max:type=='PerturbValue'?250:type=='EdemaValue'?200:50,
                    // minInterval:type=='PerturbValue'?50:type=='EdemaValue'?40:10
                },
                series: [
                    {
                        type:'line',
                        symbol: 'circle',
                        smooth:true,
                        symbolSize: 5,
                        sampling: 'average',
                        itemStyle: {
                            color: 'rgba(197, 35, 231, .7)'
                        },
                        markLine: {
                            symbol: ['none', 'none'],
                            label: {show: false},
                            data: [
                                {xAxis: 1},
                                {xAxis: 3},
                                {xAxis: 5},
                                {xAxis: 7}
                            ]
                        },
                        areaStyle: {normal: {}},
                        data:this.yDataValue,
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
            
            if(id=='chart1'){
                this.myChartOne.setOption(optionLine);
            } else {
                this.myChartTwo.setOption(optionLine);
            }
            this.myChartThree.setOption(optionLine);
            this.myChartOne.off('click');
            this.myChartOne.on('click', 'series',  (parmas)=> {
                console.log(parmas.data.obj)
                this.modifyItem = parmas.data.obj;
            });
            this.myChartTwo.off('click');
            this.myChartTwo.on('click', 'series',  (parmas)=> {
                console.log(parmas.data.obj)
                this.modifyItem = parmas.data.obj;
            });
        },
        computedPosition(length) {
            if(this.isPos) {
                return;
            }
            this.end = 100;
            length <= this.rangeNum
            ? this.start = 0
            : this.start = (100 - Math.floor(this.rangeNum / length * 100));
           
            
            // this.start = (this.start-this.scalcNum)>0?(this.start-this.scalcNum):this.start;
            // this.end = (this.end-this.scalcNum)>0?(this.end-this.scalcNum):this.end;;
            // length <= this.rangeNum ? this.start = 0: this.start = (100 - Math.floor(this.rangeNum / length * 100));
            // return this.start;
        },
        setData(){
            console.log('开始加载图表')
            this.chartDataOne = [];
            this.chartDataTwo = [];
            this.chartTime = [];
            this.chartData.map(item=>{
                this.chartDataOne.push({
                    value:item['PerturbValue'],
                    obj:item
                })
                this.chartDataTwo.push({
                    value:item['EdemaValue'],
                    obj:item
                })
                this.chartTime.push(item.dateTime);
            });
            
            this.computedPosition(this.chartTime.length);
            let dataZoom = [];
            dataZoom= [
                {
                    type: 'slider',
                    show: false,
                    xAxisIndex: 0,
                    end: this.end,
                    start: this.start//xArraylength是x轴返回的数据的个数
                },
                {
                    type: 'slider',
                    show: false,
                    yAxisIndex: 0,
                    start:this.startY,
                    end:this.endY,
                }
            ];

            console.log('dataZoom++++++',dataZoom,this.start,this.end)
            this.myChartOne.setOption({
                dataZoom: dataZoom,
                yAxis: {
                    axisLine: {//y轴线的颜色以及宽度
                        show: false,
                    },
                    min:this.minMaxTop.min,
                    max: this.minMaxTop.max
                    // minInterval:type=='PerturbValue'?50:type=='EdemaValue'?40:10
                },
                xAxis: {
                    splitLine: {
                        show: true,
                    },
                    type: 'category',
                    // // inverse:true,   //此属性控制方向,默认为false,改为true就达到你要的要求了
                    boundaryGap:false,
                    label: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {//y轴文字的配置
                        show: false,
                        textStyle: {
                            color: '#566278'
                        },
                        formatter:function(value){  
                            return value.split(" ").join("\n");  
                        }  
                    },
                    axisLine: {
                        show: false,
                        // lineStyle: {
                        //     color: color,
                        //     width: 2,
                        //     type: "solid"
                        // },
                    },
                    splitNumber:this.splitNumberOne,
                    data:this.chartTime
                },
                series: [{
                    data: this.chartDataOne
                }]
            });
            
            let options = {
                dataZoom: dataZoom,
                xAxis: {
                    splitLine: {
                        show: true,
                    },
                    type: 'category',
                    // // inverse:true,   //此属性控制方向,默认为false,改为true就达到你要的要求了
                    boundaryGap:false,
                    label: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        textStyle:{
                            color:"#566278", //刻度颜色
                            fontSize:18  //刻度大小
                        },
                        formatter:function(value){  
                            return value.split(" ").join("\n");  
                        }  
                    },
                    axisLine: {
                        show: false,
                        // lineStyle: {
                        //     color: color,
                        //     width: 2,
                        //     type: "solid"
                        // },
                    },
                    splitNumber:6,
                    data:this.chartTime
                },
                yAxis: {
                    axisLine: {//y轴线的颜色以及宽度
                        show: false,
                    },
                    min:this.minMaxBottom.min,
                    max: this.minMaxBottom.max
                    // minInterval:type=='PerturbValue'?50:type=='EdemaValue'?40:10
                },
                series: [{
                    data: this.chartDataTwo
                }]
            };
            this.myChartTwo.setOption(options);
            options.xAxis.axisLabel= {
                show: true,
                textStyle:{
                    color:"#566278", //刻度颜色
                    fontSize:17  //刻度大小
                },
                formatter:function(value){  
                    return value.split(" ").join("\n");  
                }  
            };
            options.yAxis.min = 0;
            options.yAxis.max = 200;
            this.myChartThree.setOption(options);
        },
    },
};
</script>

<style lang="scss" scoped>
/deep/ #chartOnline {
    canvas {
        border-radius: 5px;
    }
}
.radio-item {
    display: flex;
    justify-content:center;
    align-items: center;
}
.check-radio-actived {
    cursor: pointer;
    background: url(../../assets/img/boen/raiod_active.png) no-repeat !important;
    background-size: cover;
    background-position: center center;
}
.check-radio {
    cursor: pointer;
    display: inline-block;
    margin-right: 5px;
    width: 18px;
    height: 18px;
    background: url(../../assets/img/boen/raiod.png) no-repeat;
    background-size: cover;
}

.dialog-btn-wrapper {
    width: 338px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #E1EBEF;
    padding:  0 30px 30px;
    box-sizing: border-box;
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
.print-wrapper {
    height: 289px;
    background: #E1EBEF;
    .dialog-title {
        width: 338px;
        height: 60px;
        line-height: 60px;
        background: linear-gradient(0deg, #E5E5E5, #FFFFFF);
        font-size: 22px;
        font-weight: bold;
        color: #777F8F;
        text-shadow: 0px 1px 0px #FFFFFF;
        text-align: center;
        
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .dialog-content {
        background: #E1EBEF;
        .item {
            input {
                height: 26px;
                width: 65%;
            }
            width: 100%;
            height: 90px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:first-child {
                border-bottom: 1px solid #CBCBCB;
            }
            span {
                font-size: 17px;
                font-weight: bold;
                color: #777F8F;
            }
        }
        padding:  0 30px 0px;
        box-sizing: border-box;
        width: 338px;
        
        box-shadow: 0px 4px 10px 0px rgba(11, 3, 6, 0.2);
    }
    border-radius: 8px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgba(0,0,0,.3);
}
#chart1 {
    margin-bottom: 15px;    
}
#chart2 {
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
        display: flex;
        flex-direction: column;
        .right-chart {
            flex:1;
            .chart1-text_height {
                .text {
                    &:nth-child(1) {
                        // margin-top: 50px;
                    }
                    &:nth-child(2) {
                        margin-top:50px !important;
                    }
                    &:nth-child(3) {
                        margin-top: 55px !important;
                    }
                    &:nth-child(4) {
                        margin-top: 55px !important;
                    }
                    &:nth-child(5) {
                        margin-top: 55px !important;
                    }
                    &:nth-child(6) {
                        margin-top: 55px !important; 
                    }
                }
            }

            .chart2-text_height {
                top: 0 !important;
                .text {
                    font-size: 16px;
                    color: #333;
                    &:nth-child(1) {
                        // margin-top: 50px;
                    }
                    &:nth-child(2) {
                        margin-top:72px !important;
                    }
                    &:nth-child(3) {
                        margin-top: 77px !important;
                    }
                    &:nth-child(4) {
                        margin-top: 80px !important;
                    }
                    &:nth-child(5) {
                        margin-top: 75px !important;
                    }
                    &:nth-child(6) {
                        margin-top: 55px !important; 
                    }
                }
            }
            .chart1-text {
                width: 6%;
                padding-right: 10px;
                box-sizing: border-box;
                .text {
                    color: rgb(88,100,121);
                    font-size: 16px;
                    color: #333;
                    &:nth-child(1) {
                        // margin-top: 50px;
                    }
                    &:nth-child(2) {
                        margin-top: 12px;
                    }
                    &:nth-child(3) {
                        margin-top: 20px;
                    }
                    &:nth-child(4) {
                        margin-top: 20px;
                    }
                    &:nth-child(5) {
                       margin-top: 15px; 
                    }
                    &:nth-child(6) {
                       margin-top: 15px; 
                    }
                }
                top: 0;
                left: 0;
                position:absolute;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
            .text-two {
                .text {
                    font-size: 16px;
                    color: #333;
                    &:nth-child(1) {
                        margin-top: 5px;
                    }
                    &:nth-child(2) {
                        margin-top: 25px;
                    }
                    &:nth-child(3) {
                        margin-top: 25px;
                    }
                    &:nth-child(4) {
                        margin-top: 30px;
                    }
                    &:nth-child(5) {
                       margin-top: 25px; 
                    }
                }
                top: 196px;
            }
            margin-top: 10px;
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            flex-direction: column;
            padding-right: 2%;
            box-sizing:border-box;
            #chart3-wrapper {
                overflow: hidden;
                #chart3 {
                    position: absolute;
                    width: 100%;
                    height: 196px;
                    bottom: -18%;
                    left: 0;
                }
                width: 94%;
                flex:0 0 40px !important;
                position: relative;
                margin-top: 30px;
            }
            div {
                // overflow: hidden;
                width: 94%;
                border-radius: 10px;
                flex: 1;
                // &:nth-child(1) {
                //     height: 196px;
                // }
                // &:nth-child(2) {
                //     height: 196px;
                // }
            }
        }
        #chart3-wrapper {
            flex: 0 0 100px;
        }
        .right-t {
            font-size:16px;
            font-weight:bold;
            color: #777F8F;
            padding-left: 48px;
            padding-right: 15px;
            box-sizing: border-box;
            .select {
                cursor: pointer;
                color: #777F8F;
                line-height: 53px;
                text-align: left;
                padding-left: 8px;
                width:200px;
                height:53px;
                background: url('../../assets/img/boen/jx.png') no-repeat;
                background-size: contain;
            }
            .active {
                background-image: url('../../assets/img/boen/XY_active.png') !important;
                background-size: cover;
                span {
                    &:nth-child(1){
                        color:#777f8f !important;
                    }
                    &:nth-child(2){
                        color:#fff !important;
                    }
                }
            }
            .x-y {
                span {
                    flex: 1;
                    text-align: center;
                    &:nth-child(1){
                        color:#fff;
                    }
                }
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                width:77px;
                height:53px;
                background-image: url('../../assets/img/boen/XY.png');
                background-size: cover;
            }
            .left-top {
                .active_t{
                    color:#C0C4CC;
                }
                cursor: pointer;
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
                .active_t {
                    color:#C0C4CC;
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
        // padding-left: 20px;
        box-sizing: border-box;
        flex: 1;
    }
    .left {
        // <div class="status-icon">
        //                     <div class="icon"></div>
        //                     <div class="icon"></div>

        //                     <div class="chart-wrapper">
        //                         <div class="btn"></div>
        //                         <div id="chartOnline" style="height:200px;width:200px;"></div>
        //                     </div>
        //                 </div>
        .status-icon {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .chart-wrapper {
                flex: 1;
            }
            .active_1 {
                background-image: url('../../assets/icons/radio-g.png') !important;
            }
            .active_2 {
                background-image: url('../../assets/icons/radio-b.png') !important;
            }
            .btn {
                cursor: pointer;
                margin-left: 10px;
                line-height: 24px;
                font-size: 12px;
                padding: 0 10px;
                color: #777F8F;
                font-weight: bold;
                background-image: url('../../assets/icons/btn_1.png') !important;
                background-repeat: no-repeat;
                background-size: cover;
            }
            .icon {
                &:nth-child(2) {
                    margin-left: 5px;
                }
                width:18px;
                height:18px;
                background-image: url('../../assets/icons/radio-us.png');
                background-size: cover;
            }
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            .chart-wrapper {
                position: relative;
                #chartOnline {
                    position: absolute;
                    bottom: -10px;
                    right: -5px;
                }
            }
        }
        position: relative;
        display: flex;
        flex-direction: column;
        .time-label {
            width: auto;
            font-size:14px;
            font-weight:400;
            color:rgba(1,146,114,1);
            position: absolute;
            right: 0px;
            bottom: 4px;
        }
        .left-item-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-bottom: 60px;
            box-sizing: border-box;
            .text-info {
                font-size:14px;
                font-weight:400;
                color:rgba(1,146,114,1);
            }
            .left-item-disabled {
                flex: 1;
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
            .bg-1 {
                background-image: url('../../assets/img/boen/bg-3.png');
                background-size: cover;
            }
            .bg-2 {
                background-image: url('../../assets/img/boen/bg-1.png');
                background-size: cover;
            }
            .left-item {
                flex: 1;
                .unit {
                    position: absolute;
                    right: 20px;
                    bottom: 30px;
                    font-weight: bold;
                    color: #fff;
                    font-size: 16px;
                }
                position: relative;
                border-radius:15px;
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
                // height: 200px;
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
    padding: 12px 0px 17px 20px;
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
            &:nth-of-type(2) {
                letter-spacing: 1.5px;
            }
            font-size: 20px;
            font-weight: bold;
            color: #42B086;
            line-height: 21px;
        }
    }
    .top {
        span {
            color: rgba(0,0,0,.4);
            font-weight: bold;
            line-height: 17px;
            font-size: 13px;
        }
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
                    img {
                        width: 100%;
                        border-radius:10px;
                    }
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