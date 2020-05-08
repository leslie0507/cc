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
            path: '/',
            component: resolve=>(require(["../components/common/Home.vue"],resolve)),
            meta: { title: 'home' },
            children: [
                {
                    path: '/clewManage',
                    component: resolve=>(require(["../components/page/clewManage/index.vue"],resolve)),
                    meta: { title: '线索管理' }
                },
                {
                    path: '/404',
                    component: resolve=>(require(["../components/page/404.vue"],resolve)),
                    meta: { title: '404' }
                }
            ]
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
