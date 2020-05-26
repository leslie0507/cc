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
            path: '/testResult',
            component: resolve=>(require(["../components/page/testResult.vue"],resolve)),
            meta: { title: '检测结果' }
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
            path: '/setting-time',
            component: resolve=>(require(["../components/page/setting-time.vue"],resolve)),
            meta: { title: '时间设置' }
        },
        {
            path: '/setting-user',
            component: resolve=>(require(["../components/page/setting-user.vue"],resolve)),
            meta: { title: '用户设置' }
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
