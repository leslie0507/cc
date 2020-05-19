<template>
    <div class="time-wrapper">
      <div class="item left">
        <div class="top select-triangle-top"></div>
        <div class="middle">5</div>
        <div class="bottom select-triangle-bottom"></div>
      </div>
      <div class="item right">
        <div class="top select-triangle-top"></div>
        <div class="middle">0</div>
        <div class="bottom select-triangle-bottom"></div>
      </div>
    </div>
</template>
<script>
export default {
    props: ['value']
};
</script>
<style lang="scss" scoped>
.time-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    
    background:linear-gradient(0deg,rgba(224, 224, 224, 1),rgba(255, 255, 255, 1));
    &::before {
      content:"";
      position: absolute;
      width:100%;
      background:linear-gradient(0deg,rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));
      border-radius:10px 10px 0 0;
      display: block;
      height: 50%;
      top: 0;
      left: 0;
    }
    .bottom {
      position: absolute;
      left: 50%;
      bottom: 7px;
      transform: translateX(-50%);
      border-right:6px solid transparent;
      border-left:6px solid transparent;
      border-top:6px solid #4EB6CC;
    }
    .top {
      position: absolute;
      left: 50%;
      bottom: 7px;
      transform: translateX(-50%);
      border-right:6px solid transparent;
      border-left:6px solid transparent;
      border-bottom:6px solid #4EB6CC;
    }
    .middle {
      position: relative;
      z-index: 2;
      font-size:58px;
      color:rgba(135,143,157,1);
    }
    &:nth-child(1) {
      border-right: 2px solid #F0F0F0;
    }
    &:nth-child(2) {
      border-left: 2px solid rgba(240,240,240,1);
    }
  }
  width:156px;
  height:90px;
  background:rgba(255,255,255,0);
  
  border-radius:10px;
}

</style>
