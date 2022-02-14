import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'
import './globalStyle.css'
Vue.prototype.$http = http
import {Button, DatePicker, Card, Empty, Row, Option, Col, Select, Form, FormItem, MessageBox, Message, Tag, Input, Table, TableColumn, Popover, Aside,Container,MenuItem,Menu,Submenu,MenuItemGroup,Header,Main } from 'element-ui';
Vue.use(Aside)
Vue.use(Main)
Vue.use(DatePicker)
Vue.use(Card)
Vue.use(Empty)
Vue.use(Option)
Vue.use(Select)
Vue.use(Col)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
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
