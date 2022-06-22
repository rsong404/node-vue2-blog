<template>
  <div id="ContainerBox">
    <div id="titleContainer">
      <div id="tagContainer" v-if="GetBulletinState">
        <h3 style="margin-top: 15px">{{ bulletin.title }}</h3>
        <div>
          <span
            ><i class="iconfont icon-wenjianjia-m"></i>
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
      <div id="bulletin" v-if="!GetBulletinState">
        <span>{{ $store.state.bulletin }}</span>
      </div>
    </div>
    <div id="wave">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    GetBulletinState() {
      let state = this.$store.state.bulletin;
      return Object.prototype.toString.call(state) === "[object Object]"
        ? true
        : false;
    },
    ...mapState(["bulletin"]),
  },
};
</script>
<style lang="scss" scoped>
#ContainerBox {
  width: 100%;
  height: 100%;
  position: relative;
  #wave {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .wave {
    background: url(../assets/wave.svg) repeat-x;
    position: absolute;
    bottom: 0;
    width: 6400px;
    height: 85%;
    animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    transform: translate3d(0, 0, 0);
    opacity: 0.7;
  }

  .wave:nth-of-type(2) {
    animation: wave 7.5s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
      swell 7s ease -1.25s infinite;
    opacity: 1;
  }
  .wave:nth-of-type(3) {
    animation: wave 5s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
      swell 8s ease -1.25s infinite;
    opacity: 0.4;
  }
  .wave:nth-of-type(4) {
    height: 75%;
    border: 0;
    animation: wave 6s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
      swell 6s ease -1.25s infinite;
    opacity: 0.4;
  }

  @keyframes wave {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -1600px;
    }
  }

  @keyframes swell {
    0%,
    100% {
      transform: translate3d(0, -25deg, 0);
    }
    50% {
      transform: translate3d(0, 0, 0);
    }
  }

  #titleContainer {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 888;
    background-position: center;
    background-size: 100%;
    box-shadow: 0px 0px 5px #ffffff inset;
    #bulletin {
      width: 100%;
      height: 100px;
      position: relative;
      span {
        display: inline-block;
        width: 100%;
        text-align: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        white-space: pre-wrap;
      }
    }
    #tagContainer {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      & > h3 {
        width: 100%;
        padding: 0 10px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & > div {
        width: 100%;
        white-space: nowrap;
        text-align: center;
      }
      & span {
        cursor: pointer;
        display: inline-block;
        font-size: 10px;
        margin: 5px 10px;
        padding: 5px;
        background-color: var(--blue3);
        border-radius: 5px;
        box-shadow: var(--shadow2);
      }
    }
  }
}
</style>