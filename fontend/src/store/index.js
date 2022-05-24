import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tagList: [],
    checkArticle: null,
    bulletin: 'tittle',
    checkCategory: [],
    articleList: [],
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

    // 选择分类
    checkCategory(context, value) {
      context.dispatch('getArticleList', value)
    },

    //获取文章列表
    async getArticleList(context, value) {
      let result = await Vue.prototype.$http.get('/article')
      let tagList = []
      if (result) {
        for (const item of result.data) {
          for (const element of item.tags) {
            tagList.push(element)
          }
        }
        context.commit('GETTAGLIST', tagList)
      }
      context.commit('GETARTICLELIST', value || result.data)
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
      console.log(state.bulletin)
    },

    // 选择分类
    CHECKCATEGORY(state, value) {
      state.checkCategory = value
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
  },

  modules: {},
})
