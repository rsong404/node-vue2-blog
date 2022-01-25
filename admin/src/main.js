import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'
Vue.prototype.$http = http
import {Button, MessageBox, Message, Tag, Input, Table, TableColumn, Popover, Aside,Container,MenuItem,Menu,Submenu,MenuItemGroup,Header,Main } from 'element-ui';
Vue.use(Aside)
Vue.use(Main)
Vue.use(Input)
Vue.use(Tag)
Vue.use(Menu)
Vue.use(Container)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Header)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
