import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import ArticleContainer from '../views/ArticleContainer'
import ArticleList from '../views/ArticleList'
import RightAside from '../components/RigthAside.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: { name: 'articleContainer' },
    children: [
      {
        name: 'index',
        path: 'index',
        component: ArticleContainer,
        redirect: { name: 'articleList' },
        children: [
          {
            name: 'articleList',
            path: 'articleList',
            component: ArticleList,
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
