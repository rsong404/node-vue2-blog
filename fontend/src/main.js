import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/http.js'
import './utils/global.css'
import '../src/assets/icon/iconfont.css'
import 'highlight.js/styles/darcula.css';

Vue.config.productionTip = false
Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
