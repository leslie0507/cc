import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/clewManage'
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
