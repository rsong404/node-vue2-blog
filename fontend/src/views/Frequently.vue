<template>
  <div id="Container">
    <div id="tagContainer">
      <div id="subtitle">标签</div>
      <div id="tags">
        <span v-for="(item, index) in tagList" :key="index"># {{ item.tagName }}</span>
      </div>
    </div>
    <div id="websiteContainer">
      <div id="subtitle">导航</div>
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
  computed: {
    
  },
  methods: {
    // 获取常用网站列表
    async GetWebsite() {
      let result = await this.$http.get("/website");
      this.website = result.data;
    },
    // 获取标签列表
    async GetTagList(){
      let result = await this.$http.get("/tag");
      this.tagList = result.data
      console.log(result.data)
    }
    
  },
  created() {
    this.GetWebsite();
    this.GetTagList();
  },
};
</script>
<style lang="scss" scoped>
#Container {
  #subtitle {
    width: 100%;
    height: 40px;
    text-align: right;
    line-height: 40px;
    padding-right: 12px;
    font-size: 14px;
  }
  #tagContainer {
    #tags {
      padding: 5px;
      span {
        cursor: pointer;
        display: inline-block;
        padding: 5px;
        margin: 5px;
        color: white;
        background-color: #66bfff;
        border-radius: 5px;
        box-shadow:  0px 0px 5px #ffffff inset;
      }
    }
  }
  #websiteContainer {
    #website {
      a {
        display: inline-block;
        padding: 5px;
        margin: 10px;
        color: white;
        background-color: #66bfff;
        box-shadow:  0px 0px 5px #ffffff inset;

        border-radius: 5px;
      }
    }
  }
}
</style>