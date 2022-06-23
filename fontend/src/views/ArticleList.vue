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
            <span v-if="item.stick >= 1" :class="item.stick >= 1 ? 'stick' : ''"
              ><i class="iconfont icon-biaoji-m"></i> 置顶</span
            >
            <span
              ><i class="iconfont icon-wenjianjia-m"></i>
              {{ item.cateName }}</span
            >
            <span
              ><i class="iconfont icon-biaoqian-m"></i> {{ item.tags[0] }}</span
            >
            <span
              ><i class="iconfont icon-wode-m"></i> {{ item.userName }}</span
            >
            <span v-if="!item.stick >= 1"
              ><i class="iconfont icon-shijian-m"></i> {{ item.time }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <Pagination
      :pageNo="page"
      :pageSize="pageSize"
      :total="totalArticle.length"
      :continues="continues"
      @getPageNo="getPageNo"
      v-if="totalArticle.length > pageSize"
    ></Pagination>
  </div>
</template>
<script>
import Pagination from "../components/Pagination.vue";
import { mapState } from "vuex";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      bulletinStr: "jiodjfdoisjfods",
      totalArticle: [],
      page: 1,
      pageSize: 8,
      continues: 3,
    };
  },
  computed: {
    ...mapState(["articleList"]),
  },
  methods: {
    // 获取文章列表
    async GetArticleList() {
      let result = await this.$http.get("/article");
      let stickArticle = [];
      this.totalArticle = result.data.reverse().filter((item, index) => {
        if (item.stick >= 1) stickArticle.push(item);
        return item.stick < 1;
      });
      // 置顶由大到小排序
      stickArticle.sort((a, b) => b.stick - a.stick);

      this.totalArticle.unshift(...stickArticle);
      let articleList = this.totalArticle.filter(
        (item, index) => index < this.pageSize
      );

      //如果点击了分类或标签有数据传过来时
      if (JSON.stringify(this.$route.params) !== "{}") {
        this.$store.dispatch("getArticleList", this.$route.params.items);
      } else {
        this.$store.dispatch("getArticleList", articleList);
      }
      this.$store.state.totalArticle = this.totalArticle;
    },
    //选中文章
    async CheckArticle(checkArticle) {
      this.$store.dispatch("checkArticle", checkArticle);
      this.$router.push({ name: "article" });
    },
    //点击分页
    getPageNo(page) {
      this.page = page;
      let pageArticleList;
      let start = (page - 1) * this.pageSize - 1;
      let end = page * this.pageSize;
      pageArticleList = this.totalArticle.filter((item, index) => {
        return index > start && index < end;
      });
      this.$store.dispatch("getArticleList", pageArticleList);
    },
  },
  created() {
    this.GetArticleList();
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 780px) {
  #content > span {
    font-size: 12px;
    & > i {
      font-size: 12px;
    }
  }
  #content > span:nth-child(3) {
    display: none;
  }
}
#title {
  width: 100%;
  height: 100px;
}
.stick {
  box-shadow: 0px 0px 8px #57c19e inset !important;
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