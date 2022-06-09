<template>
  <div>
    <div style="padding: 15px">
      <div
        id="contentContainer"
        v-for="item in articleList"
        :key="item._id"
        tag="div"
        style="overflow: hidden"
        @click="CheckArticle(item)"
      >
        <div>
          <div id="coverPicture">
            <!-- :style="`backgroundImage:url(${item.coverPicture});`" -->
            <!-- ${item.coverPicture} -->
            <div id="articleTitle">
              <h2>{{ item.title }}</h2>
            </div>
          </div>
          <div id="content">
            <span
              ><i class="iconfont icon-fenlei"></i> {{ item.cateName }}</span
            >
            <span
              ><i class="iconfont icon-biaoqian-m"></i> {{ item.tags[0] }}</span
            >
            <span
              ><i class="iconfont icon-wode-m"></i> {{ item.userName }}</span
            >
            <span><i class="iconfont icon-shijian-m"></i> {{ item.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      bulletinStr: "jiodjfdoisjfods",
    };
  },
  computed: {
    ...mapState(["articleList"]),
  },
  methods: {
    //选中文章
    async CheckArticle(checkArticle) {
      this.$store.dispatch("checkArticle", checkArticle);
      this.$router.push({ name: "article" });
    },
  },
  created() {
    this.$store.dispatch("getArticleList");
  },
};
</script>
<style lang="scss" scoped>
#title {
  width: 100%;
  height: 100px;
}
#contentContainer {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0px 0px 8px #f3f3f3 inset;
  cursor: pointer;
  #coverPicture {
    background-image: url("../assets/wanye.jpg");
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
      background-color: var(--blue3);
      border-radius: 5px;
      box-shadow: 0px 0px 5px #ffffff inset;
    }
  }
}
</style>