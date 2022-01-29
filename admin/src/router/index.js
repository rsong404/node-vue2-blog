import Vue from 'vue'
import VueRouter from 'vue-router'
import CateList from '../views/CateList'
import CreateArticle from '../views/CreateArticle'
import ArticleList from '../views/ArticleList'
import EditorArticle from '../views/EditorArticle'

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
    name:'articleList',
    path: '/articleList',
    component: ArticleList
  },
  {
    name:'createArticle',
    path: '/createArticle',
    component: CreateArticle
  },
  {
    name:'editorArticle',
    path: '/editorArticle',
    component: EditorArticle,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes
})

export default router
