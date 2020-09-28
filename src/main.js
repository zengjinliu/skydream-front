/*入口js*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assert/css/main.css'
import VueCookie from 'vue-cookie'
import store from './store/index'
import Bus from '../src/api/bus'
import {Auth} from './api/auth'
import Echart from 'echarts'

//全局挂载
Vue.prototype.Auth = Auth;
Vue.prototype.$echarts = Echart;

Vue.use(ElementUI,{ size: 'small', zIndex: 3000 })
Vue.use(VueCookie)
Vue.use(Bus);



new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store
})

