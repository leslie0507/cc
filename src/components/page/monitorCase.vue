<!-- 查询病例档案 -->
<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                <div></div>
                {{this.type==1?'查询病例':'病例档案'}}
                <div class="el-btn-info-bs back-btn" :class="[backType!=1?'back-btn_active':'']" @click="goHomePage"><span class="triangle-left"></span>返回</div>
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
                            <input type="text" v-model="number" @change="searchData">
                        </div>
                        <div class="item">
                            <div class="label">姓名:</div>
                            <input type="text" v-model="name" @change="searchData">
                        </div>
                    </div>
                    
                    <time-roll :show-top="false" @ageChange="ageChange"></time-roll>
                    
                    <div class="sex-wrapper">
                        <div class="sex-top">
                            <div class="label">性别</div>
                            <div class="sex-btn">
                                <div class="btn-left " :class="{'active-1':sexType==1}" @click="chooseSex(1)">男</div>
                                <div class="btn-middle" :class="{'active-2':sexType==2}" @click="chooseSex(2)">不限</div>
                                <div class="btn-right" :class="{'active-3':sexType==3}" @click="chooseSex(3)">女</div>
                            </div>
                        </div>
                        <div class="el-btn begin-btn" v-clicked>搜索</div>
                    </div>
                </div>

                <!-- 下半部 -->
                <div class="container">
                    <div class="left">
                        <h1><span></span>选择病例</h1>
                        <div class="table-wrapper">
                            <table cellspacing="0" cellpadding="0">
                                <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>姓名</td>
                                        <td>编号</td>
                                        <td>年龄</td>
                                        <td>性别</td>
                                        <td v-if="type==2">编辑</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="showDetail(item,index)" v-for="(item,index) in showData" :key="index" :class="{'isClick':clickIndex==index}">
                                        <td>{{item.Id}}</td>
                                        <td>{{item.strName}}</td>
                                        <td>{{item.strID}}</td>
                                        <td>{{item.nAge | ageText}}</td>
                                        <td>{{item.IsMan?'男':'女'}}</td>
                                        <td @click="editCase(item)" v-if="type==2">
                                            <img style="height:30px;vertical-align: middle;" src="../../assets/img/boen/edit.png" alt="">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="pagenation">
                            <div class="el-btn begin-btn" @click="preData" v-clicked>上一页</div>
                            <div class="el-btn begin-btn" @click="nextData" v-clicked>下一页</div>
                            <div class="text-wrapper">{{page}}/{{total}}</div>
                        </div>
                        
                    </div>
                    <div class="right">
                        <h1><span></span>病情摘要</h1>
                        <textarea class="el-textarea textarea-1" :style="{'height':type==1?'calc(100% - 128px)':'calc(100% - 132px)'}" name="" id="" rows="14" cols="30" v-model="chooseData.Diagnosis"></textarea>
                        <button class="el-btn green-btn" @click="checkMonitor" v-if="type==1">查阅监护数据</button>
                    </div>

                    
                </div>
            </div>
            
        </div>

        <!-- <div class="print-wrapper" v-if="showDialog">
            <div class="dialog-title">登录</div>
            <div class="dialog-content" style="padding:60px 60px;">
                <input style="width:100%;" type="password" class="el-input el-input-lg" placeholder v-model="psd" />
                <span style="color:red;font-size:14px;" v-show="status">密码错误</span>
            </div>

            <div class="dialog-btn-wrapper" style="flex-direction: row;margin-right:0px;border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;">
                <button class="el-btn blue-btn btn-1" @click="backHome">返回</button>
                <button class="el-btn blue-btn btn-2" @click="checkPsd">确认</button>
            </div>
        </div> -->

    </div>
</template>

<script>
import { ScanPatient,CheckPassword } from '@/api/monitor';
import moment from 'moment';
export default {
    data: function() {
        return {
            backType:1,
            status:false,
            psd:'',
            showDialog:false,
            page:1,
            pageSize:5,
            total:0,
            clickIndex:-1,
            tableData:[],
            sexType:2,
            searchAge:'2012',
            optType:'',
            number:'',
            name:'',
            type:1,
            chooseData:{}
        };
    },
    computed:{
        showData(){
            let arr =[];
            this.tableData.map(item=>{
                let itemAge = this.pad(item.nAge,4);
                let searchAge = this.pad(this.searchAge,4);
                console.log(itemAge,searchAge)
                if(this.optType == 1) {
                    if(itemAge > searchAge) {
                        arr.push(item)
                    }
                }else if(this.optType == 2) {
                    if(itemAge == searchAge) {
                        arr.push(item)
                    }
                }else if(this.optType == 3) {
                    if(itemAge < searchAge) {
                        arr.push(item)
                    }
                }else {
                    arr.push(item)
                }
                
            });
            this.total = Math.ceil(arr.length/5);
            arr = arr.slice((this.page-1)*this.pageSize,this.page*this.pageSize);
            arr = arr.filter(item=>{
                if(!this.name) {
                    return true;
                }
                return item.strName.indexOf(this.name)!=-1;
            })
            console.log(arr)
            arr = arr.filter(item=>{
                if(!this.number) {
                    return true;
                }
                return item.strID.indexOf(this.number)!=-1;
            })
            arr = arr.filter(item=>{
                if(this.sexType == 2){
                    return true
                }
                if(this.sexType == 1){
                    return item.IsMan
                }
                if(this.sexType == 3){
                    return !item.IsMan
                }
            })
           
            return arr;
        }
    },
    created(){
        this.type = this.$route.query.type
        console.log()
        this.getData();
        if(sessionStorage.getItem('savePsd')){
            if(sessionStorage.getItem('savePsd') < +new Date) {
                this.showDialog = true;
                sessionStorage.removeItem('savePsd');
            }
        } else {
            this.showDialog = true;
        }
    },
    methods: {
        preData(){
            if(this.page>1) {
                --this.page
            } 
        },
        nextData(){
             if(this.page<this.total) {
                ++this.page
            } 
        },
        editCase(item){
            sessionStorage.setItem('item-user-info',JSON.stringify(item));
            
            this.$router.push({
                name: "addCase",
                query:{
                    edit:true
                }
            });
        },
        checkPsd(){
            CheckPassword({
                password: this.psd
            }).then(res=>{
                this.status = !res.status;
                this.showDialog = !res.status;
                if(res.status){
                    sessionStorage.setItem('savePsd',moment(new Date()).add(6, 'hours').valueOf())
                }
                console.log(res.status)
            })
        },
        pad(num, length) {  
            return ( num + "0000000000000000"  ).substr(0,length );  
        },
        ageChange(ev,type){
            this.page = 1;
            this.searchAge = ev[0];
            this.optType = ev[1];
        },
        searchData(ev){
            console.log(ev)
        },
        chooseSex(val){
            this.sexType=val;
        },
        checkMonitor(){
            sessionStorage.setItem('item-user-info',JSON.stringify(this.chooseData));
            sessionStorage.setItem('backUrl','monitorCase');
            this.$router.push({
                name: "monitor",
                params:{
                    pathType:2
                }
            });
        },
        showDetail(item,index){
            this.clickIndex= index;
            this.chooseData= item;
        },
        getData(){
            ScanPatient().then(res=> {
                this.tableData = res.data;
            })
        },
        goHomePage(){
            this.backType = 2;
            setTimeout(()=>{
                this.$router.push({
                    path: "/kidNav",
                });
            },300)
            
        },
        backHome(){
            this.$router.push({
                path: "/kidNav",
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.green-btn {
    margin-top: 17px;
    width: 100%;
    height:56px;
    color: rgba(255, 255, 255, 1);
    background: url(../../assets/img/boen/begin.png) no-repeat;
    background-size: cover;
    line-height: 56px;
    font-weight: bold;
}
/deep/ .monitor {
    input {
        width: 60px;
    }
    span {
        font-size:13px;
    }
}

.begin-btn {
    width:270px;
    height:40px;
    border-radius:10px;
    font-size:18px;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:40px;
    text-align: center;
    float: right;
    margin-top:10px;
    background: url(../../assets/img/boen/btn-2.png) no-repeat;
    background-size: contain;
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
        .back-btn_active {
            background: url(../../assets/img/boen/back-click_active.png) no-repeat !important;
        }
        .back-btn {
            cursor:pointer;
            width:98px;
            height:48px;
            line-height: 48px;
            text-align: center;
            border:1px solid rgba(179, 179, 179, 1);
            border-radius:8px;
            color: #777F8F;
            font-size:18px;
        }
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
            padding: 20px 20px 20px 20px;
            box-sizing: border-box;

            .sex-wrapper {
                text-align: right;
                .sex-top {
                    .label {
                        font-size:18px;
                        font-weight:bold;
                        color:rgba(119,127,143,1);
                    }
                    .sex-btn {
                        .active-3 {
                            color: #fff;
                            background: url('../../assets/icons/r_p.png') no-repeat !important;
                            background-size: cover !important;
                        }
                        .active-2 {
                            color: #fff;
                            background: url('../../assets/icons/m_p.png') no-repeat !important;
                            background-size: cover !important;
                        }
                        .active-1 {
                            color: #fff;
                            background: url('../../assets/icons/l_p.png') no-repeat !important;
                            background-size: cover !important;
                        }
                        div {
                            &:nth-child(1) {
                                margin-left: 9px;
                                background: url('../../assets/icons/l_n.png') no-repeat;
                                background-size: cover;
                                border-top-left-radius: 10px;
                                border-bottom-left-radius: 10px;
                            }
                            &:nth-child(2) {
                                background: url('../../assets/icons/m_n.png') no-repeat;
                                background-size: cover;
                            }
                            &:nth-child(3) {
                                background: url('../../assets/icons/r_n.png') no-repeat;
                                background-size: cover;
                                border-top-right-radius: 10px;
                                border-bottom-right-radius: 10px;
                            }
                            
                            height: 40px;
                            width: 90px;
                            cursor: pointer;
                            text-align: center;
                            line-height: 40px;
                            font-size:16px;
                            font-weight:400;
                            color:rgba(23,125,146,1);
                        }
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                    }
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
            }

            .age-wrapper {
                .label {
                    font-size:18px;
                    font-weight:bold;
                    color:rgba(119,127,143,1);
                    line-height:30px;
                    margin-right: 15px;
                }
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .info-wrapper {
                margin-left: 147px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                .item{ 
                    display: flex;
                    align-items: center;
                    input {
                        color: #4DB5CB;
                        font-size: 18px;
                        height: 38px;
                        width: 60%;
                        font-weight: bold;
                        border: none;
                        outline: none;
                    }
                    &:nth-child(1){
                        margin-bottom: 10px;
                    }
                    width: 210px;
                    height: 40px;
                    box-sizing: border-box;
                    line-height: 40px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(105, 202, 142, 1);
                    padding-left: 9px;
                    border-radius:6px;
                    font-weight: bold;
                    font-size: 18px;
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

            .container {
                flex: 1;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                .left,.right {
                    height: 100%;
                }
                .right {
                    margin-left: 20px;
                    flex: 0 0 280px;
                }
                .left {
                    .pagenation {
                        .text-wrapper {
                            margin-left: 10px;
                            letter-spacing: 2px;
                        }
                        .begin-btn {
                            &:nth-child(1){
                                margin-right: 10px;
                            }
                            background-size: cover;
                            height: 40px;
                            margin-top: 0px !important;
                            width: 120px;
                        }
                        margin-top: 25px;
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                    }
                    flex: 1;
                    .table-wrapper {
                        height: calc(100% - 110px);
                        border-radius:8px;
                        background: #fff;
                    }
                    table {
                        border: none;
                        width: 100%;
                        tbody {
                            background: #fff;
                            .isClick {
                                background: rgba(192, 192, 192, .6);
                            }
                            tr {
                                cursor: pointer;
                                height:70px;
                            }
                            td {
                                &:nth-child(2) {
                                    color: #595959;
                                    font-weight: bold;
                                }
                                &:nth-child(5) {
                                    color: #595959;
                                    font-weight: bold;
                                }
                                height:70px;
                                line-height: 70px;
                                font-size: 18px;
                                text-align: center;
                                color: #595959;
                                border-bottom: 1px solid #E6E6E6;
                            }
                        }
                        thead {
                            border-radius:8px;
                            background:linear-gradient(0deg,rgba(225,236,239,1),rgba(255,255,255,1));
                            border-bottom:1px solid #CCC;
                            box-sizing: border-box;
                            td {
                                &:nth-child(3) {
                                    width: 190px;
                                }
                                &:first-child{
                                    border-top-left-radius:8px;
                                }
                                &:last-child{
                                    border-top-right-radius:8px;
                                }
                                height:60px;
                                line-height: 60px;
                                text-align: center;
                                font-weight:bold;
                                color:rgba(43,138,208,1);
                                font-weight: bold;
                            }
                        }
                    }
                    h1 {
                        color: #2B8AD0;
                        span {
                            background: #2B8AD0;
                        }
                    }
                }
                .textarea-1 {
                    width:280px;
                    height: calc(100% - 108px);
                }
                h1 {
                    font-size:18px;
                    font-weight:bold;
                    color:rgba(51,153,102,1);
                    line-height:35px;
                    span {
                        display: inline-block;
                        margin-right: 10px;
                        width:5px;
                        height:15px;
                        background:rgba(51,153,102,1);
                    }
                }
            }
            .userinfo {
                width: 100%;
                flex: 0 0 90px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                margin-bottom: 30px;
                .line {
                    width:1px;
                    height:92px;
                    background: #5D6B75;
                    opacity: 0.4;
                    margin: 0 29px;
                }
                .img-wrapper{
                    img {
                        width: 110px;
                    }
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width:128px;
                    height:128px;
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
.print-wrapper {
    height: 289px;
    background: #E1EBEF;
    .dialog-title {
        width: 330px;
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
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
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
        width: 330px;
        
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
.dialog-btn-wrapper {
    display: flex;
    justify-content: center;
    width: 330px;
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

    .btn-2 {
        margin-top: 0;
        // margin-left: 10px;
        width: 142px;
        height: 46px;
    }
    .btn-1 {
        margin-right: 10px;
        width: 88px;
        height: 46px;
    }
}
</style>