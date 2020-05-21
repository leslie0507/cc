import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/setting'
        },
        {
            path: '/editCase',
            component: resolve=>(require(["../components/page/editCase.vue"],resolve)),
            meta: { title: '编辑病例' }
        },
        {
            path: '/monitorCase',
            component: resolve=>(require(["../components/page/monitorCase.vue"],resolve)),
            meta: { title: '监护病例' }
        },
        {
            path: '/monitor',
            component: resolve=>(require(["../components/page/monitor.vue"],resolve)),
            meta: { title: '实时监护' }
        },
        {
            path: '/login',
            component: resolve=>(require(["../components/page/login.vue"],resolve)),
            meta: { title: '登录' }
        },
        {
            path: '/setting',
            component: resolve=>(require(["../components/page/setting.vue"],resolve)),
            meta: { title: '设置' }
        },
        {
            path: '/settingTime',
            component: resolve=>(require(["../components/page/settingTime.vue"],resolve)),
            meta: { title: '时间设置' }
        },
        {
            path: '/settingUser',
            component: resolve=>(require(["../components/page/settingUser.vue"],resolve)),
            meta: { title: '用户设置' }
        },
		{
		    path: '/checkParams',
		    component: resolve=>(require(["../components/page/checkParams.vue"],resolve)),
		    meta: { title: '检测参数' }
		},
        {
            path: '/checkStart',
            component: resolve=>(require(["../components/page/checkStart.vue"],resolve)),
            meta: { title: '检测开始' }
        },
        {
            path: '/checkOn',
            component: resolve=>(require(["../components/page/checkOn.vue"],resolve)),
            meta: { title: '检测中' }
        },
        {
            path: '/checkResult',
            component: resolve=>(require(["../components/page/checkResult.vue"],resolve)),
            meta: { title: '检测结果' }
        },
        {
            path: '/loading',
            component: resolve=>(require(["../components/page/loadingPage.vue"],resolve)),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
