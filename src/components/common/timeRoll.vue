<template>
    <div class="age-wrapper">
        <div class="label">年龄</div>
        <div class="age-opt" v-if="!showText && !editValue">
            <span :class="[optType==1?'active-1':'']" @click="leHandle"> &nbsp>&nbsp </span>
            <span :class="[optType==2?'active-2':'']" @click="eqHandle">=</span>
            <span :class="[optType==3?'active-3':'']" @click="grHandle">&nbsp<&nbsp</span>
        </div>
        <div class="value-wrapper">
            <div class="time-wrapper">
              <div class="item left">
                <div class="top select-triangle-top" v-show="showTriangle" @click="addAge"></div>
                <div class="middle" :style="{'text-indent': showTop?'-5px;':'','fontSize':showTop?'':'50px'}">{{!showTop?age:age1}}
                  <span style="right:5px">岁</span>
                </div>
                <div class="bottom select-triangle-bottom" @click="subAge"></div>
              </div>
              <div class="item right">
                <div class="top select-triangle-top" v-show="showTriangle" @click="addMonth"></div>
                <div class="middle" :style="{'textIndent': showTop?'-10px':'','fontSize':showTop?'':'50px'}" v-if="showTop">{{month | showMonth}}
                  <span style="right:10px">月</span>
                </div>
                <div class="middle" :style="{'textIndent': showTop?'-10px':'','fontSize':showTop?'':'50px'}" v-else>{{!showTop?month:age2}}
                  <span style="right:8px">月</span>
                </div>
                <div class="bottom select-triangle-bottom" @click="subMonth"></div>
              </div>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    props: {
      defaultValue:{
        default:'', //1 销售数据 2 物流数据 3 专卖户数据 4 案件数据 5 市管员数据
      },
      value:{
        default:1, //1 销售数据 2 物流数据 3 专卖户数据 4 案件数据 5 市管员数据
      },
      showTriangle:{
        default:true
      },
      showTop:{
        default:true
      },
      showText:{
        default:false
      },
      editValue:{
        default:false
      }
    },
    filters:{
      showMonth(value){
        console.log(value,value.toString(),(value.toString().split('')).length)
        if((value.toString().split('')).length ==1)  {
          return '0' + value;
        }
        return value
      }
    },
    computed:{
      age1(){
        return this.age.toString().substr(0,1)
      },
      age2(){
        return this.age.toString().substr(1)
      }
    },
    data(){
      return {
        optType:'',
        age:20,
        month:12
      }
    },
    created(){
      if(this.defaultValue) {
        this.age = (this.defaultValue.toString()).substr(0,2);
        this.month = (this.defaultValue.toString()).substr(2);
      }     
    },
    methods:{
      leHandle(){
        this.optType =1;
        this.$emit('ageChange',[this.age+''+(this.month?(this.month.toString()).length==1?'0'+this.month:this.month:''),this.optType]);
      },
      eqHandle(){
        this.optType =2;
        this.$emit('ageChange',[this.age+''+(this.month?(this.month.toString()).length==1?'0'+this.month:this.month:''),this.optType]);
      },
      grHandle(){
        this.optType =3;
        this.$emit('ageChange',[this.age+''+(this.month?(this.month.toString()).length==1?'0'+this.month:this.month:''),this.optType]);
      },
      addMonth(){
        if(this.month<=11) {
          ++this.month;
        }
        this.$emit('ageChange',[this.age+''+(this.month?(this.month.toString()).length==1?'0'+this.month:this.month:''),this.optType]);
      },
      subMonth(){
        if(this.month>0) {
          --this.month;
        }
        console.log(this.month)
        this.$forceUpdate();
        this.$emit('ageChange',[this.age+''+(this.month?(this.month.toString()).length==1?'0'+this.month:this.month:''),this.optType]);
      },
      addAge(){
        if(this.age<=120) {
          ++this.age;
        }
        this.$emit('ageChange',[this.age+''+(this.month?(this.month.toString()).length==1?'0'+this.month:this.month:''),this.optType]);
      },
      subAge(){
        if(this.age>0) {
          --this.age;
        }
        this.$emit('ageChange',[this.age+''+(this.month?(this.month.toString()).length==1?'0'+this.month:this.month:''),this.optType])
      }
    }
};
</script>
<style lang="scss" scoped>
.age-wrapper {
  .label {
      font-size:18px;
      font-weight:bold;
      color:rgba(119,127,143,1);
      line-height:30px;
      margin-right: 15px;
  }
  .age-opt {
      .active-1 {
        background: url(../../assets/img/boen/add_1_active.png) no-repeat !important; 
      }
      .active-2 {
        background: url(../../assets/img/boen/add_2_active.png) no-repeat !important; 
      }
      .active-3 {
        background: url(../../assets/img/boen/add_3_active.png) no-repeat !important; 
      }
      span {
        color: #177d92;
        cursor: pointer;
        &:nth-child(1){
            background: url(../../assets/img/boen/add_1.png) no-repeat; 
            background-size: cover;
        }
        &:nth-child(2){
            background: url(../../assets/img/boen/add_2.png) no-repeat; 
            background-size: cover;
        }
        &:nth-child(3){
            background: url(../../assets/img/boen/add_3.png) no-repeat; 
            background-size: cover;
        }
        cursor: pointer;
        width:40px;
        height:30px;
        line-height: 30px;
        text-align: center;
        display: inline-block;
      }
      margin-right: 10px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.time-wrapper {
  background: url('../../assets/img/boen/time.png') no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  width:183px; 
  border-radius:10px;
  .item {
    &:nth-child(1) {
      border-radius:10px 0 0 10px;
    }
    &:nth-child(2) {
      border-radius:0 10px 10px 0;
    }
    flex: 1;
    text-align: center;
    line-height: 90px;
    position: relative;
    
    // background:linear-gradient(0deg,rgba(224, 224, 224, 1),rgba(255, 255, 255, 1));
    // &::before {
    //   content:"";
    //   position: absolute;
    //   width:100%;
    //   background:linear-gradient(0deg,rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));
    //   border-radius:10px 10px 0 0;
    //   display: block;
    //   height: 50%;
    //   top: 0;
    //   left: 0;
    // }
    .bottom {
      cursor: pointer;
      position: absolute;
      left: 50%;
      bottom: 11px;
      transform: translateX(-50%);
      border-right:6px solid transparent;
      border-left:6px solid transparent;
      border-top:6px solid #4EB6CC;
      z-index: 99;
    }
    .top {
      z-index: 99;
      cursor: pointer;
      position: absolute;
      left: 50%;
      bottom: 11px;
      transform: translateX(-50%);
      border-right:6px solid transparent;
      border-left:6px solid transparent;
      border-bottom:6px solid #4EB6CC;
    }
    .middle {
      span {
        position: absolute;
        display: inline-block;
        right: 8px;
        bottom: 26px;
        font-size:16px;
        // font-weight:bold;
        color:rgba(119,127,143,1);
        height: 16px;
        line-height: 16px;
        width: auto;
      }
      position: relative;
      z-index: 2;
      font-size:46px;
      // font-weight: bold;
      color:rgba(135,143,157,1);
    }
  }
  
}

</style>
