import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import ArticleList from '../views/ArticleList'
import MainIndex from '../views/MainIndex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'main',
    component: Main,
    redirect: { name: 'index' },
    children: [
      {
        name: 'index',
        path: 'index',
        component: ArticleList,
        props: true,
      },
      {
        name: 'article',
        path: 'article',
        component: () => import('../views/Article'),
      },
      {
        name: 'comment',
        path: 'comment',
        component: () => import('../views/Comment'),
      },
      {
        name: 'message',
        path: 'message',
        component: () => import('../views/Message'),
      },
    ],
  },
  {
    path:'/',
    name: "mainIndex",
    component: MainIndex
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
