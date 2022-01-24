import Vue from 'vue'
import VueRouter from 'vue-router'
import CateList from '../views/CateList'
import CreateCate from '../views/CreateCate'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/catelist'
  },
  {
    name:'catelist',
    path: '/catelist',
    component: CateList
  },
  {
    name:'createcate',
    path: '/createcate',
    component: CreateCate
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes
})

export default router
