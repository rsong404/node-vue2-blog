<template>
  <div>
    <div
    id="contentContainer"
      v-for="item in articleList"
      :key="item._id"
      tag="div"
      style="overflow: hidden"
      @click="CheckArticle(item._id)"
    >
      <div >
        <div
          id="coverPicture"
          :style="`backgroundImage:url(${item.coverPicture});`"
        >
          <div id="articleTitle">
            <h2>{{ item.title }}</h2>
          </div>
        </div>
        <div id="content">
          <span><i class="iconfont icon-wode-m"></i> {{ item.userName }}</span>
          <span><i class="iconfont icon-biaoqian-m"></i> {{ item.tags[0] }}</span>
          <span><i class="iconfont icon-shijian-m"></i> {{ item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      articleList: [],
    };
  },
  methods: {
    // 获取文章列表
    async GetArticles() {
      let result = await this.$http.get("/article");
      this.articleList = result.data;
      // 获取所有文章标签
      let tagList = [];
      this.articleList.forEach((item) => {
        for (let i = 0; i < item.tags.length; i++) {
          tagList.push(item.tags[i]);
        }
      });
      sessionStorage.setItem("tagList", JSON.stringify(tagList));
    },
    async CheckArticle(_id) {
      this.articleList.forEach((item) => {
        if (item._id === _id) {
          sessionStorage.setItem("checkArticle", JSON.stringify(item));
        }
      });
      this.$router.push({ name: "article" });
    },
  },
  created() {
    this.GetArticles();
  },
};
</script>
<style lang="scss" scoped>
#contentContainer {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0px 0px 8px #f3f3f3 inset;

  cursor: pointer;
  #coverPicture {
    position: relative;
    height: 270px;
    width: 100%;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
    background-size: cover;
    background-position: center;
    box-shadow: 0px 0px 5px #ffffff inset;

    #articleTitle {
      width: 100%;
      position: absolute;
      bottom: 0;
      color: white;
      font-size: 1.2rem;
      background-image: linear-gradient(
        to top,
        rgba(16, 16, 16, 0.35) 30%,
        rgba(16, 16, 16, 0) 100%
      );
      
      h2 {
        text-align: center;
        padding: 0 10px;
      }
    }
  }
  #content {
    padding: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    span {
      margin: 5px 15px;
      padding: 5px;
      background-color:#66bfff;
      border-radius: 5px;
      box-shadow:  0px 0px 5px #ffffff inset;
    }
    
  }
}
</style>