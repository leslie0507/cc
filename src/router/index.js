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
            path: '/editCase',
            component: resolve=>(require(["../components/page/editCase.vue"],resolve)),
            meta: { title: '编辑病例' }
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
