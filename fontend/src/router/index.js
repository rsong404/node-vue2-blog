import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import ArticleList from '../views/ArticleList'
import Article from '../views/Article'
import RightAside from '../components/RigthAside.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: { name: 'article' },
    children: [
      {
        name: 'index',
        path: 'index',
        component: ArticleList,
        redirect: { name: 'article' },
        children: [
          {
            name: 'article',
            path: 'article',
            component: Article,
          },
        ],
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
