/*入口js*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueCookie from 'vue-cookie'
import store from './store/index'

Vue.use(ElementUI,{ size: 'small', zIndex: 3000 })
Vue.use(VueCookie)

new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store
})

