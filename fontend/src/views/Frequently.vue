<template>
  <div id="Container">
    <div id="tagContainer">
      <div id="subtitle">标签</div>
      <div id="tags">
        <span v-for="(item, index) in getTags" :key="index">{{ item }}</span>
      </div>
    </div>
    <div id="websiteContainer">
      <div id="subtitle">导航</div>
      <div id="website">
        <a v-for="(item, index) in website" :key="index" :href="item.website" target="_blank">{{
          item.websiteName
        }}</a>
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
    getTags() {
      console.log('didid',this.$store.state.tagList)
      return this.$store.state.tagList;
    },
  },
  methods: {
    async getWebsite() {
      let result = await this.$http.get("/website");
      this.website = result.data;
      console.log(this.website);
    },
  },
  created() {
    this.getWebsite();
  },
};
</script>
<style lang="scss" scoped>
#Container {
  #subtitle {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin-bottom: 5px;
  }
  #tagContainer {
    #tags {
      
      span {
        display: inline-block;
        padding: 5px;
        margin: 5px;
        color: white;
        background-color: rebeccapurple;
        border-radius: 5px;
      }
    }
  }
  #websiteContainer {
    #website {
      a {
        display: inline-block;
        padding: 5px;
        margin: 5px;
        color: white;
        background-color: rebeccapurple;
        border-radius: 5px;
      }
    }
  }
}
</style>