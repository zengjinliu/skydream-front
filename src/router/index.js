/*路由器对象模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import HomeIndex from "../pages/home/HomeIndex"

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
    path:'/home',
    component: Home,
  },
  {
    path:'/index',
    component: HomeIndex,
    name:'homeIndex'
  }
]


export default new VueRouter({
  routes: routes,
  mode: 'history'
})

