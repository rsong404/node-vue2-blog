<template>
  <div id="articleContainer">
    <div id="title"><my-tittle></my-tittle></div>
    <div v-html="GetArticleItem.contents"></div>
  </div>
</template>
<script>
import myTittle from "./Tittle";

export default {
  components: {
    myTittle,
  },
  computed:{
    GetArticleItem(){
      return JSON.parse(sessionStorage.getItem("checkArticle"));
    }
  },
  
};
</script>
<style lang="scss" scoped>
#title {
  width: 100%;
  height: 100px;
}
#articleContainer {
  width: 100%;
  min-height: 100%;
  background-color: var(--blue1);
}
</style>