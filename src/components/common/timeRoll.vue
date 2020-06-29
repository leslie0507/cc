<template>
    <div class="time-wrapper">
      <div class="item left">
        <div class="top select-triangle-top" v-show="showTop"></div>
        <div class="middle">12
          <span>岁</span>
        </div>
        <div class="bottom select-triangle-bottom"></div>
      </div>
      <div class="item right">
        <div class="top select-triangle-top" v-show="showTop"></div>
        <div class="middle">00
          <span>月</span>
        </div>
        <div class="bottom select-triangle-bottom"></div>
      </div>
    </div>
</template>
<script>
export default {
    props: {
      value:{
        default:1, //1 销售数据 2 物流数据 3 专卖户数据 4 案件数据 5 市管员数据
      },
      showTop:{
        default:true
      }
    }
};
</script>
<style lang="scss" scoped>
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
    }
    .top {
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
        right: 5px;
        bottom: 26px;
        font-size:16px;
        font-weight:bold;
        color:rgba(119,127,143,1);
        height: 16px;
        line-height: 16px;
        width: auto;
      }
      position: relative;
      z-index: 2;
      font-size:56px;
      color:rgba(135,143,157,1);
      padding-right: 14px;
    }
  }
  
}

</style>
