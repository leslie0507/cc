<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                <button class="el-btn btn-2 btn-del" v-show="editCase.Id" @click="delHandle">
                    × 删除病例
                </button>
                {{editCase.Id?'编辑病例':'新增病例'}}
                <button class="el-btn btn-1" @click="$router.go(-1)">
                    <span class="triangle-left"></span>
                    返回
                </button>
            </div>
            
            <div class="container">
                <div class="left">
                    <div class="l-top">
                        <div class="img-wrapper">
                            <img src="../../assets/icons/user.png" alt="">
                        </div>
                        <div class="user-wrapper">
                            <input type="text" class="el-input" v-model="editCase.strName" placeholder="姓名"/>
					        <input type="text" class="el-input" v-model="editCase.strID" placeholder="编号"/>
                        </div>
                    </div>
                    <div class="l-bottom">
                        <h1><span></span>详细信息</h1>
                        <div class="number-wrapper">
                            <ownInput label="头围" endLabel="cm" v-model="param.tw"></ownInput>
                            <ownInput label="体重" endLabel="kg" v-model="param.tz"></ownInput>
                            <ownInput label="身高" endLabel="cm" v-model="param.sg"></ownInput>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="r-top">
                        <div class="age-wrapper">
                            <div class="value-wrapper">
                               <time-roll :default-value="param.nAge" :show-top="false" :edit-value="true" @ageChange="ageChange"></time-roll>
                            </div>
                        </div>
                        
                        <div class="sex-wrapper">
                            <div class="sex-top">
                                <div class="label">性别</div>
                                <div class="sex-btn">
                                    <div class="btn-left" :class="{'active-1':sexType==1}" @click="chooseSex(1)">男</div>
                                    <div class="btn-right" :class="{'active-2':sexType==2}" @click="chooseSex(2)">女</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="r-bottom">
                        <h1><span></span>住院诊断及简要病情</h1>
                        <textarea class="el-textarea textarea-1" name="" id="" rows="14" cols="5" v-model="editCase.Diagnosis"></textarea>
                    </div>

                    <button  style="float:right;width:250px;" v-if="btnStatus==2" class="el-btn green-btn" @click="saveItem">保存修改</button>
                    <button class="el-btn green-btn" v-else @click="creatMonitor">开始监护</button>
                </div>
            </div>
        </div>


        <modifyCase :modifyData="editCase" :show-layer="showLayer" @closeLayer="showLayer = false" :jxjh="jxjh" :xzjh="xzjh"/>
    </div>
</template>

<script>
import { Login } from '@/api/user';
import { CreateNewPatient,DeletePatient,UpdatePatientDiagnosis } from '@/api/monitor';
import modifyCase from './modifyCase';
export default {
    components:{
        modifyCase
    },
    data: function() {
        return {
            xzjh:false,
            jxjh:false,
            editCase:{
                Diagnosis:'',
                Id: '',
                IsMan: 1,
                nAge: 2012,
                strID: "",
                strName: ""
            },
            showLayer:false,
            sexType:1,
            elName:'',
            param: {
                strID: '',
                strName: '',
                nAge: '',
                IsMan: 0,
                Diagnosis: '该病人与2014年8月2日入住我院，症状有法定法搜捏握发生的江岸诶，大赛恩发斯蒂芬呢，发达思恩分单赛季，打发范德萨发违法的撒娇范德萨，范迪塞尔客服能会计法阿斯顿发额外发撒旦法额问哈看。该病人与2014年8月2日入住我院，症状有法定法搜捏握发生的江岸诶.'
            },
            btnStatus:1,
        };
    },
    created(){
        if(this.$route.query.xzjh){ 
            this.xzjh = true;
        }
        if(this.$route.query.jxjh){  //继续监护
            this.showLayer = true;
            this.jxjh = true;
            this.editCase = JSON.parse(sessionStorage.getItem('item-user-info'));
            this.btnStatus = 1;
        } else if(this.$route.query.edit) {  //编辑
            this.editCase = JSON.parse(sessionStorage.getItem('item-user-info'));
            this.btnStatus = 2;
        } else {  //新增
            delete this.editCase.Id;
            this.btnStatus = 3;
        }
        this.sexType = this.editCase.IsMan?1:2;
    },
    methods: {
        delHandle(){
            DeletePatient({
                strID:this.editCase.strID
            }).then(res=>{
                console.log(res)
                if(res.status) {
                    this.$router.push({
                        path: "/monitorCase",
                        query:{
                           type:2
                        }
                    });
                }
            })
        },
        ageChange(ev){
            this.editCase.nAge = ev[0];
            console.log(ev)
        },
        saveItem(){
            UpdatePatientDiagnosis({
                strID: this.editCase.strID,
                content: this.editCase.Diagnosis
            }).then(res=>{
                this.$router.push({
                    path: "/monitorCase",
                    query:{
                        type:2
                    }
                });
            })
        },
        creatMonitor(){
            CreateNewPatient(this.editCase).then(res=>{
                console.log(res)
                this.showLayer = true;
            })
        },
        chooseSex(index){
            this.sexType= index;
        }
    },
};
</script>

<style lang="scss" scoped>
//绿色按钮
.green-btn {
    width: 100%;
    height:56px;
    margin-top: 20px;
    color: rgba(255, 255, 255, 1);
    background: url(../../assets/img/boen/begin.png);
    background-size: cover;
    line-height: 56px;
    font-weight: bold;
}
/deep/ .select-triangle-top {
    border-right:5px solid transparent;
	border-left:5px solid transparent;
    border-bottom:5px solid #4EB4CC;
    top: 10px;
}
/deep/ .select-triangle-bottom {
    border-right:5px solid transparent;
	border-left:5px solid transparent;
    border-top:5px solid #4EB6CC;
    bottom: 10px;
}
/deep/ .select-input {
    font-size:26px !important;
    font-weight:bold !important;
    color:rgba(39,57,73,.8) !important;
    width: 92px !important;
    height: 40px !important;
}
/deep/ .label-start {
    font-size: 20px !important;
    margin-right: 13px;
}
/deep/ .label-end {
    font-size: 26px !important;
    display: inline-block;
    width: 50px;
    text-align:left;
    padding-left: 13px;
}
.select-wrapper {
    height: auto !important;
    display: flex;
    justify-content: flex-end;
    &:not(:last-child) {
        margin-bottom: 16px;
    }
}
.container {
    .right {
        flex: 1;
        .r-top {
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;  
            align-items: center;
        }
        .sex-wrapper {
            text-align: right;
            .sex-top {
                .label {
                    font-size:18px;
                    font-weight:bold;
                    color:rgba(119,127,143,1);
                }
                .sex-btn {
                    .active-1 {
                        color: #fff;
                        background: url('../../assets/icons/l_p.png') no-repeat !important;
                        background-size: cover !important;
                    }
                    .active-2 {
                        color: #fff;
                        background: url('../../assets/icons/r_p.png') no-repeat !important;
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
                        // &:nth-child(2) {
                        //     background: url('../../assets/icons/m_n.png') no-repeat;
                        //     background-size: cover;
                        // }
                        &:nth-child(2) {
                            background: url('../../assets/icons/r_n.png') no-repeat;
                            background-size: cover;
                            border-top-right-radius: 10px;
                            border-bottom-right-radius: 10px;
                        }
                        
                        height: 40px;
                        width: 60px;
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
                margin-right: 10px;
                font-size:18px;
                font-weight:bold;
                color:rgba(119,127,143,1);
            }
            .age-opt {
                span {
                    width:40px;
                    height:30px;
                    display: inline-block;
                }
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
            }
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    .left {
        flex: 0 0 370px;
        .l-bottom {
            .number-wrapper {
                padding-right: 56px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;  
            }
            h1 {
                padding-left: 122px;
            }
        }
        .l-top {
            .user-wrapper {
                input {
                    width: 212px;
                }
                input {
                    &:nth-child(1) {
                        margin-bottom: 10px;
                    }
                }
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
            }
            .img-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 29px;
                img {
                    width:80px;
                    height:80px;
                }
                width:93px;
                height:93px;
                background:rgba(255,255,255,1);
                box-shadow:0px 2px 5px 0px rgba(12,3,6,0.2);
                border-radius:10px; 
            }
            margin-bottom: 36px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }
    display: flex;
    justify-content: space-between;
    padding: 27px 20px 20px 28px;
    box-sizing: border-box;
}
.textarea-1 {
    width:470px;
    height:208px;
    font-size:14px;
    color:rgba(89,89,89,1);
    line-height:20px;
}
h1 {
    font-size:18px;
    font-weight:bold;
    color:rgba(51,153,102,1);
    line-height:35px;
    margin-bottom: 11px;
    span {
        font-size: 18px;
        display: inline-block;
        margin-right: 10px;
        width:5px;
        height:15px;
        background:rgba(51,153,102,1);
    }
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
.btn-del {
    margin-top: 0;
    width:84px;
    height:40px;
    background: url(../../assets/icons/btn-del.png) no-repeat center center;
    background-size: cover;
}
.password {
    width:250px;height:40px;
    margin-bottom: 39px;
}
.login-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(185, 198, 204, 1);
    .loading-img {
        width:890px;
        height:554px;
        background:rgba(225,236,239,1);
        box-shadow:0px 4px 10px 0px rgba(12,3,6,0.1);
        border-radius:8px;
        .bth-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
        .input-wrapper {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0px 20px 20px 20px;
            box-sizing: border-box;
            .info-wrapper {
                height: 118px;
                margin-left: 158px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: flex-start;
                .item{ 
                    margin-top: 5px;
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
                display: flex;
                justify-content: flex-start;
                align-items: flex-end;
                position: relative;
                
                .img-wrapper{
                    width:128px;
                    height:128px;
                    position: absolute;
                    top: -10px;
                    margin-right: 20px;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 2px 5px 0px rgba(12,3,6,0.2);
                    border-radius:10px;
                }
            }
        }
        .title {
            width:100%;
            height:60px;
            padding: 0 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background:linear-gradient(0deg,rgba(230,230,230,1),rgba(255,255,255,1));
            box-shadow:0px 2px 4px 0px rgba(12,3,6,0.1), 0px -8px 18px 0px rgba(255,255,255,0.5);
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