import Vue from 'vue'
import VueRouter from 'vue-router'
import CateList from '../views/CateList'
import CreateArticle from '../views/article/CreateArticle'
import ArticleList from '../views/article/ArticleList'
import EditorArticle from '../views/article/EditorArticle'
import CreateComment from '../views/comment/CreateComment'
import CommentList from '../views/comment/CommentList'
import EditorComment from '../views/comment/EditorComment'
import Carousel from '../views/AddCarousel'
import CarouselList from '../views/CarouselList'
import BlogInformation from '../views/BlogInformation'
import EditorBlogInfor from '../views/EditorBlogInfor'
import BlogUser from '../views/BlogUser'
import EditorBlogUser from '../views/EditorBlogUser'
import WebsiteList from '../views/website/WebsiteList'
import CreateWebsite from '../views/website/CreateWebsite'

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
  //轮播图
  {
    name:'createCarousel',
    path: '/createCarousel',
    component: Carousel
  },
  {
    name:'carouselList',
    path: '/carouselList',
    component: CarouselList
  },
  //blog信息
  {
    name:'blogInformation',
    path: '/blogInformation',
    component: BlogInformation
  },
  {
    name:'editorBlogInfor',
    path: '/editorBlogInfor',
    component: EditorBlogInfor,
    props: true
  },
  //博主信息
  {
    name:'bloguser',
    path: '/bloguser',
    component: BlogUser
  },
  {
    name:'editorBloguser',
    path: '/editorBloguser',
    component: EditorBlogUser,
    props: true
  },
  //站点
  {
    name:'websiteList',
    path: '/websiteList',
    component: WebsiteList
  },
  {
    name:'createWebsite',
    path: '/createWebsite',
    component: CreateWebsite,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes
})

export default router
