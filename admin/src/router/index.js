import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Container from '../components/Container'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/bloguser'
  },
  {
    path:'/container',
    name:'container',
    component: Container,
    redirect:'/bloguser',
    children:[
      //分类
      {
        name:'catelist',
        path: '/catelist',
        component:  () => import('../views/CateList')
      },
      //文章
      {
        name:'articleList',
        path: '/articleList',
        component: () => import('../views/article/ArticleList')
      },
      {
        name:'createArticle',
        path: '/createArticle',
        component: () => import('../views/article/CreateArticle')
      },
      {
        name:'editorArticle',
        path: '/editorArticle',
        component: () => import('../views/article/EditorArticle'),
        props: true
      },
      //说说
      {
        name:'createComment',
        path: '/createComment',
        component: () => import('../views/comment/CreateComment')
      },
      {
        name:'commentList',
        path: '/commentList',
        component: () => import('../views/comment/CommentList')
      },
      {
        name:'editorComment',
        path: '/editorComment',
        component: () => import('../views/comment/EditorComment'),
        props: true
      },
      //轮播图
      {
        name:'createCarousel',
        path: '/createCarousel',
        component: () => import('../views/AddCarousel')
      },
      {
        name:'carouselList',
        path: '/carouselList',
        component: () => import('../views/CarouselList')
      },
      //blog信息
      {
        name:'blogInformation',
        path: '/blogInformation',
        component: () => import('../views/BlogInformation')
      },
      {
        name:'editorBlogInfor',
        path: '/editorBlogInfor',
        component: () => import('../views/EditorBlogInfor'),
        props: true
      },
      //博主信息
      {
        name:'bloguser',
        path: '/bloguser',
        component: () => import('../views/BlogUser')
      },
      {
        name:'editorBloguser',
        path: '/editorBloguser',
        component: () => import('../views/EditorBlogUser'),
        props: true
      },
      //站点
      {
        name:'websiteList',
        path: '/websiteList',
        component: () => import('../views/website/WebsiteList'),
      },
      {
        name:'createWebsite',
        path: '/createWebsite',
        component: () => import('../views/website/CreateWebsite'),
      },
      //管理账号
      {
        name:'accountList',
        path: '/accountList',
        component: () => import('../views/account/AccountList'),
      },
      {
        name:'createAccount',
        path: '/createAccount',
        component: () => import('../views/account/CreateAccount'),
      },
      // 留言
      {
        name:'createMessage',
        path: '/createMessage',
        component: () => import('../views/message/CreateMessage'),
        props: true
      },
      {
        name:'messageList',
        path: '/messageList',
        component: () => import('../views/message/MessageList'),
      },
      // 标签管理
      
    ]
  },
  
  //登录
  {
    name:'login',
    path:'/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})


router.beforeEach((to, from, next) => {
  let isAuthenticated = window.localStorage.token;
  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
  else next()
})

export default router
