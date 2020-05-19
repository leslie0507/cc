<!-- 查询病例档案 -->
<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                <div></div>
                查询病例档案
                <div class="el-btn-info-bs back-btn"><span class="triangle-left"></span>返回</div>
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
                    </div>

                    <div class="age-wrapper">
                        <div class="label">年龄</div>
                        <div class="age-opt">
                            <span>+</span>
                            <span></span>
                            <span>-</span>
                        </div>
                        <div class="value-wrapper">
                            <time-roll></time-roll>
                        </div>
                    </div>
                    
                    <div class="sex-wrapper">
                        <div class="sex-top">
                            <div class="label">性别</div>
                            <div class="sex-btn">
                                <div class="btn-left active-1">男</div>
                                <div class="btn-middle">不限</div>
                                <div class="btn-right">女</div>
                            </div>
                        </div>
                        <div class="el-btn-info-lightBlue begin-btn">搜索</div>
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
                                        <td>类别</td>
                                        <td>编辑</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in tableData" :key="index">
                                        <td>{{index}}</td>
                                        <td>{{item.name}}</td>
                                        <td>{{item.code}}</td>
                                        <td>{{item.age}}</td>
                                        <td>{{item.sex}}</td>
                                        <td>{{item.type}}</td>
                                        <td>2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    <div class="right">
                        <h1><span></span>病情摘要</h1>
                        <textarea class="el-textarea textarea-1" name="" id="" rows="14" cols="30"></textarea>
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
            tableData:[{
                name:'约翰尼德普',
                code:'201408041110368',
                age:'50',
                sex:'男',
                type:'E',
            }],
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
        this.countTime()
    },
    methods: {
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
            console.log( this.day ,
                this.hour ,
                this.min,
                this.second ,leftTime)
            if (Number(this.hour) === 0 && Number(this.day) === 0 && Number(this.min) === 0 && Number(this.second) === 0) {
                return
            } else {
            // 递归每秒调用countTime方法，显示动态时间效果,
                setTimeout(this.countTime, 1000)
            }
        },　
        submitForm() {
           
            this.$refs.login.validate(valid => {
                if (valid) {
                    Login({
                        account:this.param.username,
                        pwd:this.param.password
                    }).then(res => {
                        console.log(this.respSuccess(res))
                        if(!this.respSuccess(res)){
                            this.resNotice.warning(res.msg,this.respMessage(res))
                            return
                        }
                        sessionStorage.setItem('ms_user', JSON.stringify(res.data));
                        queryPostList().then(res=>{
                            sessionStorage.setItem('expressList', JSON.stringify(res.data));
                            sessionStorage.setItem('userName', this.param.username);
                            this.$router.push('/');
                        })
                        
                    }).catch(err=>{
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
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
        .back-btn {
            width:98px;
            height:48px;
            line-height: 48px;
            text-align: center;
            border:1px solid rgba(179, 179, 179, 1);
            border-radius:8px;
            color: #777F8F;
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
                        .active-1 {
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
            .info-wrapper {
                margin-left: 147px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                .item{ 
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
                    flex: 1;
                    .table-wrapper {
                        height: calc(100% - 35px);
                        border-radius:8px;
                        background: #fff;
                    }
                    table {
                        border: none;
                        width: 100%;
                        tbody {
                            background: #fff;
                            tr {
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
                    height: calc(100% - 35px);
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
</style>