/*路由器对象模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../pages/login/Login";
import InfoPage from "../pages/login/InfoPage";
import Header from "../pages/common/Header";
import SideBar from "../pages/common/SideBar";
import Home from "../pages/common/Home";

//声明使用插件
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    component:  Login
  },
  {
    path: '/home',
    name:'home页',
    component:  Home,
    children: [
      {
        path: '/info',
        name:'后台首页',
        component:  InfoPage,
      },
      {
        path: '/header',
        component:  Header,
      },
      {
        path: '/sideBar',
        component:  SideBar,
      },
    ]
  },
]


export default new VueRouter({
  routes: routes,
  mode: 'history'
})

