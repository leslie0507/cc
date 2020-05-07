<template>
    <div class="header">
        <div class="header-user-con"  style="-webkit-app-region: drag">
            <div class="img-item" @click="toSmall"  style="-webkit-app-region: no-drag;margin-right:25px;">
                <img style="height:1px;" src="@/assets/img/zxh.png" alt="">
            </div>
            <div class="img-item" @click="toBig"  style="-webkit-app-region: no-drag;margin-right:25px;">
                <img style="height:12px;" v-if="!isFull" src="@/assets/img/zdh.png" alt="">
                <img  style="height:12px;" v-else src="@/assets/img/iframe_big.png" alt="">
            </div>
            <div class="img-item"  @click="toClose"  style="-webkit-app-region: no-drag;margin-right:24px;">
                <img style="height:12px;" src="@/assets/img/close.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
// const {ipcRenderer: ipc} = require('electron');

export default {
    data() {
        return {
            isFull:false
        };
    },
    methods:{
        toSmall(){
            minWin();
        },
        toBig(){
            this.isFull = !this.isFull;
            if(!this.isFull){
                resizeWin()
            } else {
                maxWin();
            }
        },
        toClose(){
            closeWin();
        },
    }
};
</script>
<style lang="scss" scoped>
.header-user-con {
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: flex-end;
    .img-item {
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:nth-child(1) {
            img {
                height: 100%;
            }
        }
        &:nth-child(2) {
            img {
                height: 100%;
            }
        }
        &:nth-child(3) {
            img {
                height: 100%;
            }
        }
       
        
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  width: 0;
}
.header {
    /* position: relative; */
    animation: all .5s;
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    font-size: 22px;
    color: #fff;
    // background-color: #242B3B;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 48px;
}
.header .logo {
    float: left;
    width: 189px;;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
    img {
        height: 32px;
    }
}
.header-right {
    float: right;
    padding-right: 20px;
}

.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
