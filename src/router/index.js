/*路由器对象模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'


//声明使用插件
Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: resolve => require(['@views/login/Login'], resolve),
  },
  {
    path: '/home',
    name: 'home页',
    component: resolve => require(['@views/common/Home'], resolve),
    children: [
      {
        path: '/info',
        name: '后台首页',
        component: resolve => require(['@views/login/InfoPage'], resolve),
      },
      {
        path: '/header',
        component: resolve => require(['@views/common/Header'], resolve),
      },
      {
        path: '/sideBar',
        component: resolve => require(['@views/menu/SideBar'], resolve),
      },
      {
        path: '/user',
        component: resolve => require(['@views/user/User'], resolve),
      },
      {
        path: '/role',
        component: resolve => require(['@views/role/Role'], resolve),
      },
      {
        path: '/menu',
        component: resolve => require(['@views/menu/Menu'], resolve),
      },
      {
        path: '/echart',
        component: resolve => require(['@views/echarts/EchartDemo'], resolve),
      },

    ]
  },
  {
    path:'/third/login/redirect',
    component: resolve => require(['@views/common/ThirdLoginRedirect'],resolve),
  }
];



const files = require.context('@views', true, /router\.js$/);

routes.push({
  path: '/',
  redirect: '/home'
});

files.keys().forEach(key => {
  routes = routes.concat(files(key).default);
});

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

export default router




