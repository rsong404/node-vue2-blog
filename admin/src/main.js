import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './utils/http'
import './utils/globalStyle.css'
import './utils/icon-css/iconfont.css'
// import "highlight.js/styles/monokai-sublime.css";
import "highlight.js/styles/darcula.css";


Vue.prototype.$http = http
import {Button, InputNumber, Dialog, Upload, DatePicker, Descriptions, DescriptionsItem, Card, Empty, Row, Option, Col, Select, Form, FormItem, MessageBox, Message, Tag, Input, Table, TableColumn, Popover, Aside,Container,MenuItem,Menu,Submenu,MenuItemGroup,Header,Main } from 'element-ui';
Vue.use(Aside)
Vue.use(InputNumber)
Vue.use(Main)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
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
