<template>
  <div>
    <div id="container">
      <my-header></my-header>
      <main>
        <my-aside></my-aside>
        <article>
          <div id="articl-rigthAside-container">
            <div id="articleContainer">
              <my-tittle></my-tittle>
              <div id="contentContainer">
                <div id="content">ddd</div>
              </div>
            </div>
            <my-rigth-aside></my-rigth-aside>
          </div>
          <my-footer></my-footer>
        </article>
      </main>
      <div id="aplayer"></div>
      
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
import audio from '../utils/audio'

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
      audio,
      info: {
        fixed: true, // 不开启吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: false, // 开启自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "none", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
      },
    };
  },
  
  mounted() {
    this.initAudio();
  },
  methods: {
    initAudio() {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      const ap = new APlayer({
        container: document.getElementById("aplayer"),
        audio: this.audio, // 音乐信息
        ...this.info, // 其他配置信息
      });
    },
  },
};
</script>

<style scoped lang="scss">

#container {
  width: 78vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shawod)
}

main {
  width: 100%;
  flex: 1;
  background-color: cadetblue;
  display: flex;

  article {
    flex: 1;
    height: 93vh; //要想出现滚动条就要定义好长度或宽度，不能用%单位
    background-color: chocolate;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    #articl-rigthAside-container {
      width: 100%;
      flex: 1;
      background-color: cornsilk;
      display: flex;
      #articleContainer {
        width: 100%;
        min-height: 85vh;
        #contentContainer {
          width: 100%;
          height: 700px;
          background-color: #e5e5e7;
          padding: 15px;
          margin-right: 10px;
          #content {
            width: 100%;
            height: 200px;
            background-color: rgb(223, 243, 200);
            border-radius: 8px;
          }
        }
      }
    }
  }
}
</style>
