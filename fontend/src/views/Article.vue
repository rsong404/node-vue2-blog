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
    GetArticleItem() {
      return this.$store.state.checkArticle;
    },
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
        let nodeText = item.innerHTML;
        let level = parseInt(item.tagName.replace("H", ""));
        let id = `catalog_${index}`;
        let key = item.tagName.toLocaleLowerCase();
        item.setAttribute("id", id);

        this.catalog.push({ title: nodeText, id, level, key });
      });
      this.$store.commit("CATALOG", this.catalog);
    },
    NextOrLast(is) {
      let articleList = this.$store.state.articleList;
      let checkArticle = this.$store.state.checkArticle;
      let result = articleList.indexOf(checkArticle);
      if (is) {
        if (result === articleList.length) {
          result = 0;
        }
        this.$store.dispatch("checkArticle", articleList[++result]);
      } else {
        if (result === 0) {
          result = articleList.length;
        }
        this.$store.dispatch("checkArticle", articleList[--result]);
      }
    },
  },

  mounted() {
    this.CreateCatalog();
  },
};
</script>
<style lang="scss" scoped>
#articleContainer {
  width: 100%;
  min-height: 100%;
  box-shadow: var(--shadow2);
  line-height: 30px;
  letter-spacing: 2px;

  #articleContent {
    width: 100%;
    min-height: 100%;
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
      border-radius: 5px;
      box-shadow: var(--shadow2);
      background-color: var(--blue2);
    }
  }
}
</style>