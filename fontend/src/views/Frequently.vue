<template>
  <div id="Container">
    <div id="tagContainer">
      <div id="subtitle"><i class="iconfont icon-biaoqian-m"> </i> 标签</div>
      <div id="tags" @click="CheckTag">
        <span v-for="(item, index) in tagList" :key="index"
          ># {{ item.tagName }}</span
        >
      </div>
    </div>
    <div id="websiteContainer">
      <div id="subtitle">
        <i class="iconfont icon-faxian2-m"> </i> 导航
        <router-link to="/main/website" tag="div" class="more"
          >更多</router-link
        >
      </div>
      <div id="website">
        <a
          v-for="(item, index) in website"
          :key="index"
          :href="item.website"
          target="_blank"
          >{{ item.websiteName }}</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tagList: [],
      website: [],
    };
  },
  computed: {},
  methods: {
    // 获取常用网站列表
    async GetWebsite() {
      let result = await this.$http.get("/website");
      this.website = result.data;
    },
    // 获取标签列表
    async GetTagList() {
      let result = await this.$http.get("/tag");
      this.tagList = result.data;
    },
    // 点击标签
    async CheckTag($event) {
      if ($event.target.nodeName === "SPAN") {
        let tag = $event.target.innerHTML.replace("#", "").trim();
        let checktag = this.tagList.filter((item) => {
          return item.tagName === tag;
        });
        let checkArticle = checktag.map((item) => {
          return item.items;
        });
        // 筛选选中的标签文章,注意：因为item.items是数组，所以要剥开一层
        if (this.$route.name !== "index") {
          this.$router.push({
            name: "index",
            params: { items: checkArticle[0] },
          });
        }
        this.$store.dispatch("bulletin", tag);
        this.$store.dispatch("checkCategory", ...checkArticle);
      }
    },
  },
  created() {
    this.GetWebsite();
    this.GetTagList();
  },
};
</script>
<style lang="scss" scoped>
#Container {
  width: 100%;
  height: 100%;
  #subtitle {
    width: 100%;
    height: 40px;
    text-align: left;
    line-height: 40px;
    padding-left: 12px;
    font-size: 14px;
    i {
      font-size: 13px;
    }
    .more {
      cursor: pointer;
      float: right;
      padding: 0 5px;
    }
  }
  #tagContainer {
    width: 100%;
    height: 50%;
    #tags {
      width: 100%;
      max-height: calc(100% - 50px);
      padding: 5px;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      span {
        cursor: pointer;
        display: inline-block;
        padding: 5px;
        margin: 5px;
        color: white;
        background-color: var(--blue3);
        border-radius: 5px;
        box-shadow: 0px 0px 5px #ffffff inset;
      }
    }
  }
  #websiteContainer {
    width: 100%;
    height: 50%;
    #website {
      width: 100%;
      max-height: calc(100% - 50px);
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      a {
        display: inline-block;
        padding: 5px;
        margin: 10px;
        color: white;
        background-color: var(--blue3);
        box-shadow: 0px 0px 5px #ffffff inset;
        border-radius: 5px;
      }
    }
  }
}
</style>