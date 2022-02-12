import Vue from 'vue'
import VueRouter from 'vue-router'
import CateList from '../views/CateList'
import CreateArticle from '../views/CreateArticle'
import ArticleList from '../views/ArticleList'
import EditorArticle from '../views/EditorArticle'
import CreateComment from '../views/CreateComment'
import CommentList from '../views/CommentList'
import EditorComment from '../views/EditorComment'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/articleList'
  },
  //分类
  {
    name:'catelist',
    path: '/catelist',
    component: CateList
  },
  //文章
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
  },
  //说说
  {
    name:'createComment',
    path: '/createComment',
    component: CreateComment
  },
  {
    name:'commentList',
    path: '/commentList',
    component: CommentList
  },
  {
    name:'editorComment',
    path: '/editorComment',
    component: EditorComment,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes
})

export default router
