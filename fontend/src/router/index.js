import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import ArticleList from '../views/ArticleList'
import Article from '../views/Article'
import Comment from '../views/Comment'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: { name: 'index' },
    children: [
      {
        name: 'index',
        path: 'index',
        component: ArticleList,
      },
      {
        name: 'article',
        path: 'article',
        component: Article,
      },
      {
        name: 'comment',
        path: 'comment',
        component: Comment,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
