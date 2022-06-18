<template>
  <div>
    <div id="container">
      <div id="header"><my-header></my-header></div>
      <main>
        <div id="aside-left">
          <my-aside></my-aside>
        </div>
        <div id="article">
          <div id="articleContainer">
            <div id="title"><my-tittle></my-tittle></div>
            <div id="contentContainer">
              <router-view ref="artList"></router-view>
            </div>
            <div id="footerBox">
              <my-footer></my-footer>
            </div>
          </div>
        </div>
        <div id="aside-right">
          <my-rigth-aside />
        </div>
        <div id="shady" @click="IsClickShady" :class="IsShady?'isShady':''"></div>
      </main>
      <!-- <div id="aplayer"></div> -->
    </div>
  </div>
</template>

<script>
import MyHeader from "./Header.vue";
import MyTittle from "./Tittle.vue";
import MyAside from "./Aside.vue";
import MyFooter from "./Footer.vue";
import MyRigthAside from "./RigthAside.vue";
import APlayer from "aplayer"; // 引入音乐插件
import "aplayer/dist/APlayer.min.css"; // 引入音乐插件的样式
import audio from "../utils/audio";

export default {
  name: "Main",
  components: {
    MyHeader,
    MyTittle,
    MyAside,
    MyFooter,
    MyRigthAside,
  },

  data() {
    return {
      is: false,
      button: {},
      musicBox: {},
      audio,
      info: {
        fixed: true, // 不开启吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: false, // 开启自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
      },
    };
  },

  mounted() {
    // 暂时注释掉
    // this.initAudio();
    // this.FlexMusicBox();
  },
  computed:{
    IsShady(){
      return this.$store.state.isOpenFold
    }
  },
  methods: {
    IsClickShady(){
      this.$store.commit('ISOPENFOLD')
    },
    initAudio() {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      new APlayer({
        container: document.getElementById("aplayer"),
        audio: this.audio, // 音乐信息
        ...this.info, // 其他配置信息
      });
    },
    // 音乐插件隐藏与出现
    FlexMusicBox() {
      const button = document.querySelector(".aplayer-miniswitcher>button");
      const musicBox = document.querySelector(
        ".aplayer.aplayer-fixed .aplayer-body"
      );
      button.addEventListener("click", function () {
        this.is = !this.is;
        this.is
          ? musicBox.setAttribute("style", "left:0")
          : musicBox.setAttribute("style", "left:-66px");
      });
    },
  },
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 1050px) {
  #container {
    width: 100vw !important;
  }
}
@media screen and (max-width: 950px) {
  #aside-right {
    display: none;
  }
  #aside-left {
    width: 24% !important;
  }
  #article {
    width: 76% !important;
  }
}
@media screen and (max-width: 780px) {
  #aside-right {
    display: none;
  }
  #aside-left {
    width: 0 !important;
  }
}
#container {
  width: 78vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shawod1);
  #header {
    width: 100%;
    height: 8vh;
    padding-bottom: 4px;
  }
  main {
    width: 100%;
    height: 92vh;
    display: flex;
    position: relative;
    .isShady{
      display: block !important;
    }
    #shady {
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.5);
      display: none;
      position: absolute;
      z-index: 888;
      top: 0;
      // left: 100%;
    }
    #aside-left {
      width: 19%;
      height: 100%;
    }
    #aside-right {
      width: 19%;
      height: 100%;
      background-color: var(--blue2);
    }
    #article {
      flex: 1;
      width: 62%;
      height: 92vh; //要想出现滚动条就要定义好长度或宽度，不能用%单位
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      #footerBox {
        width: 100%;
        height: 60px;
      }
      #articleContainer {
        flex: 1;
        display: flex;
        flex-direction: column;
        #title {
          width: 100%;
          height: 100px;
        }
        #contentContainer {
          flex: 1;
          background-color: var(--blue1);
          // padding: 15px;
          // padding-top: 0;
        }
      }
    }
  }
}
</style>
