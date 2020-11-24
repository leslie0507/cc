<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
/*滚动条样式：谷歌浏览器下*/
::-webkit-scrollbar{
  cursor: pointer;
  width: 10px;
  height: 10px;
  background-color: rgb(244,244,244);
}
/*滚动条的轨道*/
::-webkit-scrollbar-track{
  /*box-shadow: inset 0 0 5px rgba(0,0,0,.3);*/
  background-color: rgb(244,244,244);
 
}
/*滚动条的滑块按钮*/
::-webkit-scrollbar-thumb{
  cursor: pointer;
  border-radius: 10px;
  background-color: #CECECE;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #B1B1B1;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);
}
</style>