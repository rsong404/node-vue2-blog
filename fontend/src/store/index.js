import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
  },
  mutations: {
    sharedTags(state,value){
      state.tagList = value
    },
    sharedArticle(state,item){
      state.article = item.contents
      console.log(item.contents)
    }

  },
  state: {
    tagList: [],
    article: ''
  },
  modules: {
  }
})
