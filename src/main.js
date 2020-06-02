import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueProgressBar from "vue-progressbar";
import echarts from 'echarts';


import { Notification,Message } from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './assets/css/reset-theme.scss';
import './components/common/directives';
import elInput from './components/common/elInput';
import timeRoll from './components/common/timeRoll';
import './utils/rem';
// import 'babel-polyfill';

//------------ 全局配置组件 开始 -----------------
import uploadFile from '@/components/common/uploadFile'   //导入组件
Vue.component('uploadFile', uploadFile)
Vue.component('elInput', elInput)
Vue.component('timeRoll', timeRoll)
//------------ 全局配置组件 结束 -----------------


import Axios from "./lib/ajax";

// import Components from "@/components"; //自定义组件
// import Directives from "@/directive"; //自定义指令

//------------ 全局配置 开始 -----------------
import AppConfig from "@/resources/appConfig";
//------------ 全局配置 结束 -----------------

Vue.config.productionTip = false;

//------------ 自定义的VUE全局对象 开始 ----------
Vue.prototype.$ajax = Axios; //http请求工具
//------------ 自定义的VUE全局对象 结束 ----------

Vue.prototype.$echarts = echarts;


// //使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title}`;
//     const role = sessionStorage.getItem('ms_user');
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     } else {
//         next();
//     }
// });

export default new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
