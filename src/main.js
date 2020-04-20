import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入全局样式
import './assets/css/global.css'
import ElementUI from 'element-ui'
import './styles.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
