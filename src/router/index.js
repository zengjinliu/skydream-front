/*路由器对象模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'


//解决路由到同一个地址报错问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
//声明使用插件
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    component: resolve => require(['../pages/login/Login'],resolve),
  },
  {
    path: '/home',
    name:'home页',
    component: resolve => require(['../pages/common/Home'],resolve),
    children: [
      {
        path: '/info',
        name:'后台首页',
        component:  resolve => require(['../pages/login/InfoPage'],resolve),
      },
      {
        path: '/header',
        component: resolve => require(['../pages/common/Header'],resolve),
      },
      {
        path: '/sideBar',
        component:  resolve => require(['../pages/menu/SideBar'],resolve),
      },
      {
        path: '/user',
        component:   resolve => require(['../pages/user/User'],resolve),
      },
      {
        path: '/role',
        component:  resolve => require(['../pages/role/Role'],resolve),
      },
      {
        path: '/menu',
        component:  resolve => require(['../pages/menu/Menu'],resolve),
      },

    ]
  },
]


export default new VueRouter({
  routes: routes,
  mode: 'history'
})

