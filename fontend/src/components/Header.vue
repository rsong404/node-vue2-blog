<template>
  <header>
    <router-link to="/index" tag="div" id="blogName">YRsong丶博客</router-link>
    <div id="model">
      <i
        @click="TurnModel"
        class="iconfont"
        :class="turnModel ? 'icon-Daytimemode-fill' : 'icon-nightmode-fill'"
      ></i>
    </div>
    <div id="header-right">
      <div id="search">
        <div id="searchIconUp"></div>
        <input type="text" placeholder="请输入搜索" />
        <div id="searchIconDown"></div>
      </div>
      <router-link to="/message" tag="div" id="message">留言</router-link>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      turnModel: true,
      nodeList: null,
    };
  },
  mounted() {
    this.nodeList = document.querySelectorAll(".relatedColors");
  },
  methods: {
    TurnModel() {
      this.turnModel = !this.turnModel;
      if (!this.turnModel) {
        for (const item of this.nodeList) {
          item.setAttribute(
            "style",
            "--backgroundColor: #0D0D0D;--whiteFontColor: #f8f8f8"
          );
        }
      } else {
        for (const item of this.nodeList) {
          item.setAttribute(
            "style",
            "--backgroundColor: #a2d2ff;--whiteFontColor: #0D0D0D"
          );
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
header {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: block;
  background-color: var(--divWhiteBackground);
  flex-shrink: 0;
  position: relative;
  #model > i {
    font-size: 30px;
    cursor: pointer;
  }
  & > div {
    margin: 0 20px;
  }
  #model {
    width: 50px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  #blogName {
    cursor: pointer;
    float: left;
    font-size: 20px;
    font-weight: 600;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  #header-right {
    float: right;

    display: flex;
    height: 100%;
    align-items: center;

    #message {
      width: 50px;
      height: 100%;
      line-height: 7vh;
      cursor: pointer;
      font-weight: 600;
      text-align: center;
      &:hover {
        background-color: var(--htmlWhiteBackground);
      }
    }
    #search {
      display: flex;
      input {
        width: 100px;
        height: 25px;
        border: 0;
        font-size: 12px;
        &:focus {
          outline: none;
          //   border: 0.5px solid rgb(177, 177, 177);
        }
      }
      #searchIconDown {
        width: 25px;
        height: 25px;
        border-radius: 0 50% 50% 0;
        background-color: white;
      }
      #searchIconUp {
        width: 20px;
        height: 25px;
        border-radius: 50% 0 0 50%;
        background-color: white;
      }
    }
  }
}
</style>