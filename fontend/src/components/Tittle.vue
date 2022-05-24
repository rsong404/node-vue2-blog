<template>
  <div id="ContainerBox">
    <div id="titleContainer" >
      <div id="tagContainer" v-if="GetBulletinState">
        <h3 style="margin-top: 15px">{{ bulletin.title }}</h3>
        <div>
          <span
            ><i class="iconfont icon-fenlei-m"></i>
            {{ bulletin.cateName }}</span
          >
          <span
            ><i class="iconfont icon-biaoqian-m"></i>
            {{ bulletin.tags[0] }}</span
          >
          <span
            ><i class="iconfont icon-wode-m"></i> {{ bulletin.userName }}</span
          >
          <span
            ><i class="iconfont icon-shijian-m"></i> {{ bulletin.time }}</span
          >
        </div>
      </div>
      <div id="bulletin" else>{{ $store.state.bulletin }}</div>

    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    GetBulletinState() {
      let state = this.$store.state.bulletin
      console.log('dfdfd',Object.prototype.toString.call(state) === '[object Object]' ? true : false)
      return Object.prototype.toString.call(state) === '[object Object]' ? true : false
    },
    ...mapState(["bulletin"]),
  },
  created() {
    // 刷新页面，重新赋值vuex数据
    // this.$store.commit('REFRESHBULLETIN')
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