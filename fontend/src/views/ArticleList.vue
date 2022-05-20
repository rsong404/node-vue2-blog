<template>
  <div>
    <div
      v-for="item in articleList"
      :key="item._id"
      tag="div"
      style="overflow: hidden"
      @click="Check(item._id)"
    >
      <div id="contentContainer">
        <div
          id="coverPicture"
          :style="`backgroundImage:url(${item.coverPicture});`"
        >
          <div id="articleTitle">
            <h2>{{item.title}}</h2>
          </div>
        </div>
        <div id="content">
          <span>{{ item.userName }}</span>
          <span>{{ item.tags[0] }}</span>
          <span>{{ item.time }}</span>
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
    async GetArticles() {
      let result = await this.$http.get("/article");
      this.articleList = result.data;
      let tagList = [];
      this.articleList.forEach(item => {
        for (let i = 0; i < item.tags.length; i++) {
          tagList.push(item.tags[i])
        }

      });
      this.$store.commit('sharedTags',tagList)
      console.log(this.articleList);
    },
    async Check(_id){
      this.articleList.forEach(item => {
        if(item._id === _id){
          this.$store.commit('sharedArticle',item)
        }
      });
      this.$router.push({name:'article'})
    }
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
  padding-bottom: 10px;
  cursor: pointer;
  #coverPicture {
    position: relative;
    height: 270px;
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    background-size: cover;
    background-position: center;
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
        padding: 0 10px;
      }
    }
  }
  #content {
    padding: 10px 0;
    width: 100%;
    display: flex;
    span {
      margin: 5px;
      padding: 5px;
      margin-left: 0;
      background-color: white;
      border-radius: 5px;
    }
  }
}
</style>