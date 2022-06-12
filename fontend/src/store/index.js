import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    checkArticle: null,
    bulletin: 'tittle',
    checkCategory: [],
    articleList: [],
    catalog: [],
    showModel: true,
  },
  actions: {
    // 选中的文章
    checkArticle(context, value) {
      context.commit('CHECKARTICLE', value)
      context.dispatch('bulletin', value)
    },

    // tittle组件相关
    bulletin(context, value) {
      context.commit('BULLETIN', value)
    },

    // 选择分类和标签
    checkCategory(context, value) {
      context.commit('CHECKCATEGORY', value)
    },

    //获取文章列表
    async getArticleList(context, value) {
      let result = await Vue.prototype.$http.get('/article')
      context.commit('GETARTICLELIST', value || result.data.reverse())
    },
  },
  mutations: {
    //选中的文章相关
    CHECKARTICLE(state, value) {
      state.checkArticle = value
    },
    //刷新tittle组件时，向sessionStorage中获取数据重新赋值给state，时数据持久化，保持状态
    REFRESHARTICLE(state) {
      state.checkArticle = JSON.parse(sessionStorage.getItem('checkArticle'))
    },

    //tittle组件数据状态相关
    BULLETIN(state, value) {
      state.bulletin = value
    },
    REFRESHBULLETIN(state) {
      state.bulletin = JSON.parse(sessionStorage.getItem('bulletin'))
    },

    // 选择分类和标签
    CHECKCATEGORY(state, value) {
      state.articleList = value
    },

    // 获取文章列表
    GETARTICLELIST(state, value) {
      state.articleList = value
    },

    // tagList
    GETTAGLIST(state, value) {
      state.tagList = value
    },

    // 防刷新页面，vuex数据持久化
    REFRESH(state) {
      let obj = JSON.parse(sessionStorage.getItem('state'))
      for (const key in obj) {
        if (state.hasOwnProperty(key)) {
          state[key] = obj[key]
        }
      }
    },

    // 文章目录
    CATALOG(state, value) {
      state.catalog = value
    },
  },

  modules: {},
})
