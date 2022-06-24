<template>
  <div id="Container">
    <div ref="background" id="backgroundImg"></div>
    <div ref="mainBox" class="box1">
      <div style="position: relative; width: 120px; height: 120px">
        <div id="avatar">努力奋斗！</div>
        <div
          class="avatar"
          ref="avatar"
          :style="`backgroundImage:url('${userInformation.avatar}')`"
        ></div>
      </div>
      <div id="nick"><h2>YRsong</h2></div>
      <h4 id="motto"><span ref="motto"></span><span id="cursor"></span></h4>
      <div id="navContainer">
        <router-link to="/main"
          ><i class="iconfont icon-shouye-m"></i> Main</router-link
        >
        <a href="https://rs404.top" target="_blank"
          ><i class="iconfont icon-blog"></i> Blog</a
        >
        <a href="https://github.com/" target="_blank"
          ><i class="iconfont icon-github"></i> Gighub</a
        >
        <a href="https://www.bilibili.com/" target="_blank"
          ><i class="iconfont icon-bilibili"></i> Bilibili</a
        >
      </div>
    </div>
    <div id="isShow">
      <ul id="imgContainer" @mouseover="SetStyle">
        <li
          class="imgItem"
          :style="`backgroundImage: url('${item.imgsrc}')`"
          v-for="item in pictureList"
          :key="item._id"
        ></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "MainIndex",
  data() {
    return {
      pictureList: [],
      userInformation: {},
      timer: null,
      mainBox: NodeList,
      tag: true,
    };
  },

  mounted() {
    this.mainBox = this.$refs.mainBox;
  },
  methods: {
    SetStyle($event) {
      if ($event.target.nodeName == "LI") {
        this.$refs.background.style.backgroundImage =
          $event.target.style.backgroundImage;
      }
    },
    EnterAvatar() {
      if (this.tag) {
        this.$refs.avatar.style.transform = "rotateY(180deg)";
        this.tag = false;
      } else {
        this.$refs.avatar.style.transform = "rotateY(0deg)";
        this.tag = true;
      }
    },
    async GetBloguser() {
      let result = await this.$http.get("/bloguser");
      this.userInformation = result.data[0];

      this.$store.state.motto = this.userInformation.motto;
    },
    TypeEffect() {
      let CharIndex = 0;
      let flag = true;
      let speed = 250;
      this.timer = setInterval(() => {
        if (flag) {
          this.$refs.motto.innerHTML = this.userInformation.motto.substr(
            0,
            CharIndex
          );
          CharIndex++;
          if (CharIndex === this.userInformation.motto.length + 1) flag = !flag;
        } else {
          // 所有文字输入完毕后停顿1秒再继续
          setTimeout(() => {
            CharIndex--;
            this.$refs.motto.innerHTML = this.userInformation.motto.substr(
              0,
              CharIndex
            );
          }, 1000);
          if (CharIndex === 0) flag = !flag;
        }
      }, speed);
    },
  },
  async created() {
    let result = await this.$http.get("/carousel");
    this.pictureList = result.data.filter((item, index) => {
      return index < 6;
    });
    this.GetBloguser();
    this.TypeEffect();
  },
  mounted() {
    let avatar = document.querySelector(".avatar");
    avatar.addEventListener("mouseenter", this.EnterAvatar);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    avatar.removeEventListener("mouseenter", this.EnterAvatar);
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 850px) {
  #isShow {
    display: none;
  }
  .box1 {
    position: absolute;
    z-index: 999;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
  }
}
#Container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  #backgroundImg {
    width: 100%;
    height: 100%;
    background-image: url("../assets/earth.jpg");
    background-position: center;
    background-size: cover;
    transition: all 0.5s;
  }
}
#imgContainer {
  position: absolute;
  top: 0px;
  right: 0;
  width: 120px;
  margin-right: 10px;
  height: 100%;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .imgItem {
    height: 70px;
    width: 120px;
    margin: 14px 0;
    border-radius: 5px;
    background-color: slateblue;
    box-shadow: var(--shadow2);
    background-position: center;
    background-size: cover;
  }
}
#avatar {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: rgb(40, 51, 83);
  text-align: center;
  line-height: 120px;
  font-weight: 600;
}
.box1 {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 330px;
  height: 400px;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .avatar {
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: skyblue;
    background-position: center;
    background-size: cover;
    transform-origin: left;
    transition: all 2s cubic-bezier(0.87, 0.08, 0.01, 0.98);
  }
  #nick {
    margin: 20px 0 30px 0;
  }
  #motto {
    height: 60px;
    width: 100%;
    text-align: center;
    margin: 0 0 50px 0;
    letter-spacing: 2px;
    #cursor {
      width: 1px;
      border-right: 1px white solid;
      animation: blink 0.7s step-end infinite;
    }
    @keyframes blink {
      from,
      to {
        border-color: transparent;
      }
      50% {
        border-color: white;
      }
    }
  }
  #navContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    & > a {
      display: inline-block;
      font-size: 13px;
      height: 35px;
      padding: 0 5px;
      border-radius: 5px;
      box-sizing: border-box;
      line-height: 35px;
      margin: 0 5px;
      text-align: center;
      &:hover {
        background-color: rgba($color: #4b94f5, $alpha: 0.5);
      }
    }
  }
}
</style>