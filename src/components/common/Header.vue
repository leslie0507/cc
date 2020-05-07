<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <transition name="fade">
            <div class="logo"  v-if="!collapse"  style="-webkit-app-region: drag">
                <img src="../../assets/img/jianwei_logo.png" alt="">
            </div>
        </transition>
        
        <div class="collapse-btn" :style="{'transform': collapse?'rotateY(180deg)':''}" @click="collapseChage" style="-webkit-app-region: no-drag;">
            <!-- <i v-if="!collapse" class="el-icon-s-fold"></i> -->
            <img style="width:16px;" src="@/assets/img/collapse.png" alt="">
            <!-- <i v-else class="el-icon-s-unfold"></i> -->
        </div>
        <systemOpt />
    </div>
</template>
<script>
import AppConfig from "@/resources/appConfig";
import systemOpt from '@/components/common/systemOpt'
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'linxin',
        };
    },
    components:{
        systemOpt
    },
    computed: {
        username() {
            let username = sessionStorage.getItem('ms_user');
            return username ? username : this.name;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                sessionStorage.removeItem('ms_user');
                this.$router.push('/login');
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            AppConfig.collopse = this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1280) {
            this.collapseChage();
        }
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
    background-color: #242B3B;
}
.collapse-btn {
    float: left;
    padding: 0 21px 0 16px;
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
        height: 30px;
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
