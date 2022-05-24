<template>
  <div id="articleContainer">
    <div v-html="GetArticleItem.contents"></div>
  </div>
</template>
<script>

export default {
  components: {
  },
  computed:{
    GetArticleItem(){
      return this.$store.state.checkArticle;
    }
  },
  created() {
    // 刷新页面，重新赋值vuex数据
    // this.$store.commit('REFRESHARTICLE')
  },
  
};
</script>
<style lang="scss" scoped>
#articleContainer {
  width: 100%;
  min-height: 100%;
  background-color: var(--blue1);
}
</style>