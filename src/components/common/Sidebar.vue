<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#242B3B"
            text-color="#bfcbd9"
            active-text-color="#1F5DEA"
            unique-opened
            router
            @select="handleSelect"
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                            <div :style="{'margin-left':collapse?'-10px':'2px'}" v-if="item.index=='checkInfo'&&slideNumber.wuliuCount>0||item.index=='checkInfo'&&slideNumber.addressCount>0" class="data-dot"></div>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                            {{ subItem.title }}
                            <div v-if="subItem.index=='LogisticsSurface' && (slideNumber.wuliuCount>0) || subItem.index=='locationSite'&& (slideNumber.addressCount>0)"  class="item-num">{{subItem.index=='LogisticsSurface'?slideNumber.wuliuCount:slideNumber.addressCount}}</div>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
           
        </el-menu>
        <div class="login-out" @click="loginOut">
            <img :style="{'margin-right':!collapse?'18px':' 0px','vertical-align': 'middle','opacity': '.5'}" src="../../assets/img/tuichu.png" alt="">
            <!-- <transition name="fade"> -->
                <span v-if="!collapse">退出登录</span>
            <!-- </transition> -->
        </div>
        
    </div>
</template>

<script>
import { getAuditNumber } from '@/api/auth';
import bus from '../common/bus';
export default {
    data() {
        return {
            slideNumber:{},
            collapse: false,
            item:[]
        };
    },
    computed: {
        onRoutes() {
            let routePath = this.$route.path.replace('/', '');
            if(routePath == 'createTable' || routePath == 'analysisReport' ) {
                return 'goalAnalysis'
            }
            if(routePath == 'cluesQuery' || routePath == 'cluesResult' ) {
                return 'cluesQuery'
            }
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        const role = JSON.parse(sessionStorage.getItem('ms_user'));
        if(role.user_type  == 3){
            this.items = [
                {
                    icon: 'icon-mbfx',
                    index: 'goalAnalysis',
                    title: '目标分析',
                },
                {
                    icon: 'icon-jkkb',
                    index: 'monitorCharts',
                    title: '监控看板'
                }
            ]
        } else {
            this.items = [
                {
                    icon: 'icon-mbfx',
                    index: 'goalAnalysis',
                    title: '目标分析',
                },
                {
                    icon: 'icon-xscx',
                    index: 'cluesQuery',
                    title: '线索查询'
                },
                {
                    icon: 'icon-jkkb',
                    index: 'monitorCharts',
                    title: '监控看板'
                },
                {
                    icon: 'icon-sjgx',
                    index: '3',
                    title: '数据更新',
                    subs: [
                        {
                            index: 'tobaccoData',
                            title: '烟草数据'
                        },
                        {
                            index: 'LogisticsData',
                            title: '物流数据',
                        },
                        {
                            index: 'departData',
                            title: '部门数据'
                        }
                    ]
                },
                {
                    icon: 'icon-xxsh',
                    index: 'checkInfo',
                    title: '信息审核',
                    subs: [
                        {
                            index: 'LogisticsSurface',
                            title: '物流面单'
                        },
                        {
                            index: 'locationSite',
                            title: '地址坐标',
                        }
                    ]
                },
                {
                    icon: 'icon-xsgl',
                    index: 'clewManage',
                    title: '线索管理'
                },
                {
                    icon: 'icon-yhgl',
                    index: 'userManage',
                    title: '用户管理'
                }
            ]
        }
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        this.getNumber();
    },
    methods:{
        getNumber(){
            getAuditNumber().then(res=>{
                this.slideNumber = res.data
            })
            setInterval(()=>{
                getAuditNumber().then(res=>{
                    this.slideNumber = res.data
                })
            },3000)
           
        },
        loginOut(){
            sessionStorage.removeItem('ms_user');
            this.$router.push('/login');
        },
        handleSelect(val){
            this.$emit('handleSelect',val)
        }
    }
};
</script>

<style lang="scss" scoped>
.data-dot {
    margin-bottom: 20px;
    margin-left: 2px;
    display: inline-block;
    width:8px;
    height:8px;
    background:rgba(226,50,68,1);
    border-radius:50%;
    opacity:1;
}
.item-num {
    display: inline-block;
    width:24px;
    height:16px;
    line-height: 16px;
    margin-top: 0px;
    text-align: center;
    background:rgba(226,50,68,1);
    opacity:1;
    border-radius:8px;
    font-size:12px;
    font-weight:400;
    color:rgba(255,255,255,1);
}
/deep/ .is-opened {
    
    .item-num {
        opacity: .5;
    }
    .is-active {
        .item-num {
            opacity: 1 !important;
        }
        
    }
}
/deep/ .is-opened .el-submenu__icon-arrow {
    // transform: rotateZ(0deg) !important;
    width:7px;
    height:12px;
    transform: rotateZ(-45deg) !important; 
    background: url('../../assets/img/down_icon.png') no-repeat !important;
    background-size: 90%;
    margin-top: 0px;
    background-position: bottom;
    &::before {
        content: '';
        
    }
}
/deep/ .el-submenu__icon-arrow {
    width:11px;
    height:12px;
    background: url('../../assets/img/slide_down.png') no-repeat;
    background-size: 90%;
    background-position: bottom;
    &::before {
        content: '';
        
    }
}
/depp/ .el-submenu .el-menu--inline {
    .el-menu-item {
        padding-left: 599px !important;
    }
}
/deep/ .el-submenu .el-submenu__title {
    .icon-sjgx {
        font-size:26px;
    }
}
.el-menu--inline{
   
    li {
        padding-left: 64px !important;
        font-size: 16px;
        padding-left: 30px;
    }
}
.el-menu-item,.el-submenu__title {
    i {
        font-size:18px;
    }
    span {
        margin-left: 16px;
        font-size:18px;
        // font-weight:bold;
    }
}
.sidebar {
    box-shadow: inset 0px 15px 20px -15px rgba(0, 0, 0, 0.2);
    .login-out {
        display: flex;
        align-items: center;
        padding-left: 20px;
        box-sizing: border-box;
        font-size:18px;
        font-weight:400;
        line-height:24px;
        color:rgba(255, 255, 255, .32);
        position: absolute;
        bottom: 0px;
        width: 100%;
        bottom: 15px;
        cursor: pointer;
        img {
            height: 18px;
        }
        span {
            width: 74px;
            word-break: keep-all;
            transition: all 1s;
        }
    }
    display: block;
    position: absolute;
    left: 0;
    top: 48px;
    bottom: 0;
    background: #242b3b;
    .sidebar-el-menu {
        li {
            color: rgba(255, 255, 255, .32) !important;
            &:nth-child(3) {
                .el-submenu__title {
                    span {
                        color: rgba(255, 255, 255, .32) !important;
                        margin-left: 11px !important;
                    }
                }
            }
            &:nth-child(4) {
                .el-submenu__title {
                    span {
                        color: rgba(255, 255, 255, .32) !important;
                        margin-left: 11px !important;
                    }
                }
            }
            &:nth-child(5) {
                .el-submenu__title {
                    span {
                        color: rgba(255, 255, 255, .32) !important;
                        margin-left: 18px !important;
                    }
                }
            }
        }
        padding-top: 16px;
        box-sizing: border-box;
        font-size:16px;
        .el-menu-item {
            height:48px !important;
            line-height: 48px !important;
            // width: 189px !important;
        }
        .is-active {
            background-color:#1F5DEA !important;
            // font-weight:bold;
            color:rgba(255,255,255,1) !important;
        }
    }
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 190px;
}
.sidebar > ul {
    height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  width: 0;
}
/deep/ .is-active {
    i {
        &::before {
            color: #fff !important;
        }
    }
}
/deep/ .is-opened {
    i {
        &::before {
            color: rgba(255, 255, 255, .32) !important;
        }
    }
}
</style>
