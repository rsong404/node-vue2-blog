<template>
  <div id="articleContainer">
    <div v-html="checkArticle.contents"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkArticle: {}
    }
  },
  created() {
   this.checkArticle = JSON.parse(sessionStorage.getItem('checkArticle')) 
  },
}
</script>
<style lang="scss" scoped>
#articleContainer {
  width: 100%;
  min-height: 100%;
}
</style>