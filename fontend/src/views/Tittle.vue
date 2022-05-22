<template>
  <div id="ContainerBox">
    <div id="titleContainer" style="">
      <div id="bulletin" v-if="GetBulletinState" key="dd">bulletion</div>
      <div id="tagContainer" v-else key="hh">
        <h3 style="margin-top: 15px">{{ checkArticle.title }}</h3>
        <div>
          <span
            ><i class="iconfont icon-fenlei-m"></i>
            {{ checkArticle.cateName }}</span
          >
          <span
            ><i class="iconfont icon-biaoqian-m"></i>
            {{ checkArticle.tags[0] }}</span
          >
          <span
            ><i class="iconfont icon-wode-m"></i>
            {{ checkArticle.userName }}</span
          >
          <span
            ><i class="iconfont icon-shijian-m"></i>
            {{ checkArticle.time }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkArticle: {},
    };
  },
  computed:{
    GetBulletinState(){
      return JSON.parse(sessionStorage.getItem("isBulletin"));
    }
  },
  created() {
    // sessionStorage.setItem('isBulletin',JSON.stringify(false))

    this.checkArticle = JSON.parse(sessionStorage.getItem("checkArticle"));
    
  },
  beforeDestroy() {
    // sessionStorage.setItem('isBulletin',JSON.stringify(true))
  },
  
};
</script>
<style lang="scss" scoped>
#ContainerBox {
  width: 100%;
  height: 100%;
  #titleContainer {
    width: 100%;
    height: 100%;
    background-color: var(--blue1);
    background-image: url("../assets/title.jpg");
    background-position: center;
    background-size: 100%;
    box-shadow: 0px 0px 5px #ffffff inset;
    #bulletin {
      width: 100%;
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
    #tagContainer {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      & span {
        display: inline-block;
        font-size: 10px;
        margin: 5px 15px;
        padding: 5px;
        background-color: #66bfff;
        border-radius: 5px;
        box-shadow: 0px 0px 5px #ffffff inset;
      }
    }
  }
}
</style>