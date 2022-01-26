import Vue from 'vue'
import VueRouter from 'vue-router'
import CateList from '../views/CateList'
import CreateArticle from '../views/CreateArticle'

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
    name:'createArticle',
    path: '/createArticle',
    component: CreateArticle
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes
})

export default router
