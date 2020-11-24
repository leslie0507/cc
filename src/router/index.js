import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/kidNav'
        },
        {
            path: '/editCase',
            component: resolve=>(require(["../components/page/editCase.vue"],resolve)),
            meta: { title: '编辑病例' }
        },
        {
            path: '/addCase',
            name:'addCase',
            component: resolve=>(require(["../components/page/addCase.vue"],resolve)),
            meta: { title: '编辑病例' }
        },
        {
            path: '/queryMonitor',
            component: resolve=>(require(["../components/page/queryMonitor.vue"],resolve)),
            meta: { title: '监护病例' }
        },
        {
            path: '/monitorCase',
            component: resolve=>(require(["../components/page/monitorCase.vue"],resolve)),
            meta: { title: '监护病例' }
        },
        {
            path: '/modifyCase',
            component: resolve=>(require(["../components/page/modifyCase.vue"],resolve)),
            meta: { title: '修改病历' }
        },
        {
            name:'monitor',
            path: '/monitor',
            component: resolve=>(require(["../components/page/monitor.vue"],resolve)),
            meta: { title: '实时监护' }
        },
        {
            path: '/monitor copy',
            component: resolve=>(require(["../components/page/monitor.vue"],resolve)),
            meta: { title: '实时监护' }
        },
        // {
        //     path: '/login',
        //     component: resolve=>(require(["../components/page/login.vue"],resolve)),
        //     meta: { title: '密码登录框' }
        // },
		{
			path: '/loginBox',
			component: resolve=>(require(["../components/page/loginBox.vue"],resolve)),
			meta: { title: '登录框' }
		},
		{
			path: '/noteInfo',
			component: resolve=>(require(["../components/page/noteInfo.vue"],resolve)),
			meta: { title: '登录框' }
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
			path: '/clinicalCase',
			component: resolve=>(require(["../components/page/clinicalCase.vue"],resolve)),
			meta: { title: '临床病历' }			
		},
		{
			path: '/clinicalCase-unknown',
			component: resolve=>(require(["../components/page/clinicalCase-unknown.vue"],resolve)),
			meta: { title: '临床病历-未知' }			
        },
        {
            path: '/kidNav',
			component: resolve=>(require(["../components/page/kidNav.vue"],resolve)),
			meta: { title: '儿童版导航' }	
        },
        {
            path: '/operationManual',
			component: resolve=>(require(["../components/page/operationManual.vue"],resolve)),
			meta: { title: '操作手册' }	
        },
        {
            path: '/debugPage',
			component: resolve=>(require(["../components/page/debugPage.vue"],resolve)),
			meta: { title: '调试窗口' }	
        },
        {
            path: '/404',
			component: resolve=>(require(["../components/page/404.vue"],resolve)),
			meta: { title: '404' }	
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
