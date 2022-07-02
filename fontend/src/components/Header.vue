<template>
  <div style="width: 100%; height: 100%; position: relative">
    <header>
      <div @click="ReturnIndex" id="blogName">YRsong丶博客</div>
      <div id="model">
        <i
          @click="TurnModel"
          class="iconfont"
          :class="
            turnModel ? 'icon-Daytimemode-fill' : 'icon-icon-nighttime-fill'
          "
        ></i>
      </div>
      <div id="header-right">
        <div id="search">
          <div id="searchIconUp"></div>
          <input
            type="text"
            v-model.trim="searchValue"
            @input="Search(searchValue)"
            placeholder="请输入搜索"
            @focus="Focus"
            @blur="Blur"
          />
          <div id="searchIconDown"><i class="iconfont icon-sousuo"></i></div>
          <ul ref="searchBox" id="resultBox">
            <li
              v-for="item in searchList"
              :key="item._id"
              @click="CheckArticle(item)"
            >
              {{ item.title }}
            </li>
            <div
              v-if="searchList.length ? false : true"
              style="textalign: center"
            >
              无结果，请重新搜索。
            </div>
          </ul>
        </div>
        <router-link to="/main/message" tag="div" id="message"
          ><i class="iconfont icon-xiaoxi2-m"></i
        ></router-link>
      </div>
    </header>
    <div class="mobileHeader" id="mobileHeader">
      <div @click="Open" :class="IsOpen ? 'active' : ''">
        <i class="iconfont icon-fenlei1"></i>
      </div>
      <div @click="ReturnIndex">YRsong丶博客</div>
      <div>
        <div class="model">
          <i
            @click="TurnModel"
            class="iconfont"
            :class="
              turnModel ? 'icon-Daytimemode-fill' : 'icon-icon-nighttime-fill'
            "
          ></i>
        </div>
        <router-link to="/main/message" tag="div"
          ><i class="iconfont icon-xiaoxi2-m"></i
        ></router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      turnModel: true,
      nodeList: null,
      searchValue: "",
      searchList: [],
      timer: null,
      root: null,
      isOpenFold: false,
    };
  },
  mounted() {
    this.nodeList = document.querySelectorAll(".relatedColors");
    this.turnModel = this.$store.state.showModel;
    this.root = document.querySelector(":root");
    if (this.turnModel) {
      //白天
      this.root.style.setProperty("--blue1", "#bde0fe");
      this.root.style.setProperty("--blue2", "#a2d2ff");
      this.root.style.setProperty("--blue3", "#66bfff");
    } else {
      //夜间
      this.root.style.setProperty("--blue1", "var(--black1)");
      this.root.style.setProperty("--blue2", "var(--black3)");
      this.root.style.setProperty("--blue3", "var(--black1)");
    }
  },
  computed: {
    IsShowBox() {
      return this.searchList.length ? "display:block;" : "display:none;";
    },
    IsOpen() {
      return this.$store.state.isOpenFold;
    },
  },
  methods: {
    Open() {
      this.$store.commit("ISOPENFOLD");
    },
    TurnModel() {
      // 切换夜间模式
      if (this.turnModel) {
        //夜间
        this.root.style.setProperty("--blue1", "var(--black1)");
        this.root.style.setProperty("--blue2", "var(--black3)");
        this.root.style.setProperty("--blue3", "var(--black1)");
      } else {
        //白天
        this.root.style.setProperty("--blue1", "#bde0fe");
        this.root.style.setProperty("--blue2", "#a2d2ff");
        this.root.style.setProperty("--blue3", "#66bfff");
      }
      this.turnModel = !this.turnModel;
      this.$store.state.showModel = this.turnModel;
    },
    ReturnIndex() {
      //更新文章title状态
      this.$store.dispatch("bulletin");
      if (this.$route.path !== "/index") {
        this.$router.push({ name: "index" });
      }
    },
    // 搜索栏失去焦点
    Blur() {
      let timer = setTimeout(() => {
        this.$refs.searchBox.style.display = "none";
        timer = null;
      }, 200);
    },
    Focus() {
      this.$refs.searchBox.style.display = "block";
    },
    SearchResult(value) {
      let articleList = this.$store.state.articleList;
      if (value !== "") {
        this.searchList = articleList.filter((item) => {
          return item.title.includes(value);
        });
      } else {
        this.searchList = [];
      }
    },
    // 搜索输入，防抖
    Search(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.SearchResult(value);
      }, 500);
    },
    CheckArticle(item) {
      if (this.$route.name !== "article") {
        this.$router.push({ name: "article" });
      }
      this.$store.dispatch("checkArticle", item);
    },
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 780px) {
  header {
    display: none !important;
  }
  #mobileHeader {
    display: flex;
  }
}
.active {
  background-color: var(--blue1);
}
.mobileHeader {
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: none;
  background-color: var(--blue2);
  box-shadow: var(--shadow2);
  flex-shrink: 0;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  & > div {
    text-align: center;
  }
  & > div:nth-child(1) {
    font-size: 600;
    width: 50px;
    height: 100%;
    font-weight: 600;
    & > i {
      display: inline-block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  & > div:nth-child(2) {
    width: 180px;
    font-weight: 600;
  }
  .model > i {
    font-size: 20px;
    transition: 0.2s;
    &:hover {
      font-size: 30px;
    }
  }
  & > div:nth-child(3) {
    height: 100%;
    width: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
header {
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: block;
  background-color: var(--blue2);
  box-shadow: var(--shadow2);
  flex-shrink: 0;
  position: absolute;
  #model > i {
    font-size: 30px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      font-size: 34px;
    }
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
      text-align: center;
      & > i {
        font-size: 18px;
      }
      &:hover {
        background-color: var(--blue1);
      }
    }
    #search {
      width: 150px;
      height: 100%;
      position: relative;
      z-index: 999;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      input {
        width: 100px;
        height: 25px;
        border: 0;
        font-size: 12px;
        &:focus {
          outline: none;
        }
      }
      #noneBox {
        display: none;
      }
      #resultBox {
        width: 300px;
        position: absolute;
        top: 50px;
        background-color: var(--blue2);
        display: none;
        box-shadow: var(--shadow2);
        padding: 10px 0;
        cursor: pointer;

        & > li {
          text-align: center;
          margin: 5px 0;
          box-shadow: var(--shadow2);
        }
        & > li:hover {
          background-color: var(--blue2);
          background-color: var(--blue3);
        }
      }
      #searchIconDown {
        width: 25px;
        height: 25px;
        border-radius: 0 50% 50% 0;
        background-color: white;
        text-align: center;
        line-height: 25px;
        & > i {
          color: var(--black1);
        }
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