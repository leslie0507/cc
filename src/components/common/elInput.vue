<template>
    <div class="select-wrapper">
        <span  class="label-start">{{label}}</span>
        <div class="select-input-wrapper">
            <input class="select-input" type="number" maxlength="3" :style="{'width':width+'px'}" v-model="newValue">
            <div class="bg"></div>
            <div class="select-triangle select-triangle-top"></div>
            <div class="select-triangle select-triangle-bottom"></div>
        </div>
        <span class="label-end">{{endLabel}}</span>
    </div>
</template>
<script>
export default {
    props: ['value','width','label','endLabel'],
    computed:{
        newValue: {
            get:function() {
                return this.value; 
            },
            set:function(value) {
                this.$emit('input', value);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.select-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 24.8px;
  span {
    font-size:16px;
    color:rgba(119,127,143,1);
    font-weight: bold;
  }
}
.select-input-wrapper {
  position: relative;
  .bg {
    height: 90%;
    width: 14px;
    position: absolute;
    right: 2%;
    top: 4%;
    border-radius: 5px;
    background-color: #fff;
  }
  input {
    height:25px;
    width: 78px;
    border:1px solid rgba(96, 174, 228, 1);
    border-radius:6px;
    padding-left: 6px;
    font-size:15px;
    font-weight:bold;
    color:rgba(39,57,73,.8);
    box-sizing: border-box;
  }
  .select-triangle{
    position: absolute;
    right: 4px;
  }
}
</style>
