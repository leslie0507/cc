import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueProgressBar from "vue-progressbar";

import { Notification,Message } from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './assets/css/reset-theme.scss';
import './components/common/directives';
import './utils/rem';
// import 'babel-polyfill';

//------------ 全局配置组件 开始 -----------------
import uploadFile from '@/components/common/uploadFile'   //导入组件
Vue.component('uploadFile', uploadFile)
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

Vue.prototype.respSuccess = res =>{
    return res.code == 1000
}
Vue.prototype.respMessage = function(res) {
    if(res&& Object.hasOwnProperty.call(res,'msg')) {
      return res.msg;
    }else {
      return res
    }
}
Vue.prototype.resNotice = {
  info (t, d, duration = 2000) {
//     Notification.info({
//       title: t || '消息提示',
//       message: d || '',
//       duration:  duration
//     })
    Message({
        message: t,
        type: 'warning',
        duration: duration
    })
  },
  success (t, d,duration = 2000) {
    Message({
        message: t,
        type: 'warning',
        duration: duration
    })
//     Notification.success({
//       title: t || '成功提示',
//       message: d || '',
//       duration:  duration
//     })
  },
  warning (t, d,duration = 2000) {
    Message({
        message: t,
        type: 'warning',
        duration: duration
    })
//     Notification.warning({
//       title: t || '警告提示',
//       message: d || '',
//       duration:  duration
//     })
  },
  danger (t, d,duration = 2000) {
    Message({
        message: t,
        type: 'warning',
        duration: duration
    })
//     Notification.danger({
//       title: t || '错误提示',
//       message: d || '',
//       duration:  duration
//     })
  }
}

Vue.prototype.resSuccess = {
    alert(type = 'success',t='',duration = 2000) {
        Message({
            message: t,
            type: type,
            duration: duration
        })
    }
}

Vue.use(VueProgressBar, {
    color: '#1f5dea',  // 进度条颜色
    failedColor: 'red', // 失败显示的颜色
    height: '20px'  // 进度条高度
})
Vue.use(ElementUI, {
    size: AppConfig.uiSize, //设置 element-ui 默认的大小
});
// Vue.use(Directives);


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | CC`;
    const role = sessionStorage.getItem('ms_user');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        next();
    }
});

export default new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
