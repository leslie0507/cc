<template>
    <div class="login-wrap">
        <div class="loading-img">
            <div class="title">
                <div class="title-text">设置</div>
                <button class="el-btn btn-1 btn-back"  @click="goSetting">
                    <span class="triangle-left"></span>
                    返回
                </button>
            </div>
            <!-- 设置信息区域-->
            <div class="setting-time-wrapper">
                <!-- 文本框区域 -->
                <div class="input-wrapper">
                    <div>
                        <input class="el-input setting-time-input" v-model="year" placeholder="年" type="text" />
                    </div>
                    <div>
                        <input class="el-input setting-time-input" v-model="month" placeholder="月" type="text" />
                    </div>
                    <div>
                        <input class="el-input setting-time-input" v-model="day" placeholder="日" type="text" />
                    </div>
                    <div>
                        <input class="el-input setting-time-input" v-model="hour" placeholder="时" type="text" />
                    </div>
                    <div>
                        <input class="el-input setting-time-input" v-model="minute" placeholder="分" type="text" />
                    </div>
                </div>
                <!-- 时间显示区域 -->
                <div class="time-show-wrapper">
                    <p>{{nowData}}</p>
                </div>
                <!-- 按钮区域 -->
                <div class="btn-wrapper">
                    <button class="el-btn btn-save" @click="saveTime">保存修改</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { SetSystemTime } from '@/api/monitor';
export default {
    data() {
        return {
            year: '',
            month: '',
            day: '',
            hour: '',
            minute: '',
            nowData:''
        };
    },
    created(){
        this.nowData = moment(new Date()).format("YYYY/M/D HH:mm");
        setTimeout(()=>{
            this.nowData = moment(new Date()).format("YYYY/M/D HH:mm");
        },1000*60)
    },
    methods: {
        saveTime(){
            SetSystemTime({
                year: this.year,
                month: this.month,
                day: this.day,
                hour: this.hour,
                minute: this.minute,
            }).then(res=>{
                console.log(res)
            })
        },
        goSetting(){
            this.$router.push({
                path: "/setting",
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.login-wrap {
    background: url(../../assets/icons/background.png) no-repeat center center;
    background-size: cover;
}
.btn-1 {
    width: 98px;
    height: 46px;
}
.btn-2 {
    width: 142px;
    height: 46px;
}
// 输入框大小
.setting-time-input {
    width: 274px;
    height: 50px;
   
}
// 重置文本框内容的输入样式
input[type='text'] {
    font-size: 24px;
    color: rgba(153, 153, 153, 1);
    // 去掉浏览器默认input内容样式
    -webkit-appearance: none;
    -moz-appearance: none;
}
.login-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading-img {
        width: 504px;
        height: 586px;
        
        background: #e1ecef;

        box-shadow: 0px 4px 10px 0px rgba(12, 3, 6, 0.2);
        border-radius: 8px;
        

        .title {
             width: 100%;
           
            height: 60px;
            display: flex;
            justify-content: center;

            align-items: center;
            background: linear-gradient(0deg, rgba(230, 230, 230, 1), rgba(255, 255, 255, 1));
            box-shadow: 0px 2px 4px 0px rgba(12, 3, 6, 0.1);
            border-radius: 8px 8px 0 0;
            font-size: 24px;
            font-weight: bold;
            color: rgba(153, 153, 153, 1);
            line-height: 30px;
            text-shadow: 0px 2px 0px rgba(255, 255, 255, 1);
            position: relative;
            // 返回按钮定位
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
        .setting-time-wrapper {
             width: 100%;
            

            .input-wrapper {
                 width: 100%;
               
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                padding: 38px 0 15px 0;
                div {
                    margin-bottom: 20px;
                }
            }
            .time-show-wrapper {
                 width: 100%;
                
                font-size: 30px;
                color: rgba(51, 153, 102, 1);
                text-align: center;
            }
            .btn-wrapper {
               
                
                display: flex;
                justify-content: flex-end;
                align-items: center;
                
                padding:27px 20px 20px 0;
                .btn-save {
                    width: 128px;
                    height: 40px;
                    background: url(../../assets/icons/blue-btn.png) no-repeat;
					background-size: cover;
                    font-size: 18px;
                    color: rgba(255, 255, 255, 1);
                    // background-color: forestgreen;
                    line-height: 40px;
					font-weight: bold;
                   
                   
                }
            }
        }
    }
}
</style>