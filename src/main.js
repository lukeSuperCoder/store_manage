import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入全局样式
import './assets/css/global.css'
import ElementUI from 'element-ui'
import './styles.scss'
import './assets/font/iconfont.css'
import axios from 'axios'
Vue.prototype.$http = axios;
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
Vue.config.productionTip = false;

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
