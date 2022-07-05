<template>
  <div id="articleContainer">
    <div id="articleContent" v-html="GetArticleItem.contents"></div>
    <div id="foot">
      <div @click="NextOrLast(false)">上一篇</div>
      <div @click="NextOrLast(true)">下一篇</div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      articleElement: NodeList,
      titleList: ["h1", "h2", "h3", "h4", "h5", "h6"],
      articleTittleList: [],
      catalog: [],
    };
  },
  
  computed: {
    ...mapState({GetArticleItem:'checkArticle'})
  },
  methods: {
    CreateCatalog() {
      //获取整个HTML中的标题
      let allTittle = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
      //获取 #articleContent 文章里的标题
      this.articleElement = document.querySelector("#articleContent");
      this.titleList.forEach((item) => {
        let title = this.articleElement.getElementsByTagName(item);
        this.articleTittleList.push(...title);
      });
      //过滤出文章的标题，使文章标题顺序正确
      let articleTittleList = Array.from(allTittle).filter((item) => {
        return Array.from(this.articleTittleList).includes(item);
      });

      articleTittleList.forEach((item, index) => {
        let nodeText = item.innerHTML.replace(/&nbsp;/ig,"").replace(/<\/?b>/ig,'')
        let level = parseInt(item.tagName.replace("H", ""));
        let id = `catalog_${index}`;
        let key = item.tagName.toLocaleLowerCase();
        item.setAttribute("id", id);
        this.catalog.push({ title: nodeText, id, level, key });
      });
      this.$store.commit("CATALOG", this.catalog);
    },
    NextOrLast(is) {
      let articleList = this.$store.state.totalArticle;
      let checkArticle = this.$store.state.checkArticle;
      let result = 0;
      articleList.forEach((item, index) => {
        if (item._id === checkArticle._id) {
          result = index;
        }
      });

      if (is) {
        if (result === articleList.length - 1) {
          result = 0;
        } else {
          result += 1;
        }
        this.$store.dispatch("checkArticle", articleList[result]);
      } else {
        if (result === 0) {
          result = articleList.length - 1;
        } else {
          result -= 1;
        }
        this.$store.dispatch("checkArticle", articleList[result]);
        
      }
    },
  },
  updated() {
    this.catalog = []
   this.CreateCatalog()
  },
  mounted() {
    this.$store.dispatch('bulletin',this.GetArticleItem) //更新标题状态
    this.CreateCatalog();
    this.$store.commit('ISCATALOG',true)
  },
  beforeDestroy() {
        this.$store.commit('ISCATALOG',false)

  },
};
</script>
<style lang="scss" scoped>
#articleContainer {
  width: 100%;
  height: 100%;
  box-shadow: var(--shadow2);
  line-height: 30px;
  letter-spacing: 1px;

  #articleContent {
    width: 100%;
    min-height: 90%;
    background-color: var(--blue2);
    box-shadow: var(--shadow2);
    padding: 15px;
    line-height: 30px;
  }
  #foot {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div {
      cursor: pointer;
      display: inline-block;
      width: 65px;
      text-align: center;
      margin: 10px 5px;
      border-radius: 4px;
      box-shadow: var(--shadow2);
      background-color: var(--blue2);
    }
  }
}
