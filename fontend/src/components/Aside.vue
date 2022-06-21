<template>
  <div id="AsideBox" style="width: 100%; height: 100%">
    <aside>
      <div id="avatarBox" @click="ReturnIndex" class="relatedColors">
        <div id="avatar">
          <img src="../assets/logo.jpg" alt="" />
        </div>
        <div id="">夏日の蝉</div>
      </div>
      <div id="navigationBox">
        <div id="navigationContainer" class="relatedColors">
          <div>
            <div id="navigation"><span>导航</span></div>
            <router-link to="/" id="navigationItem"
              ><i class="iconfont icon-biaoji-m"></i
              ><span>主页</span></router-link
            >
            <div @click="ReturnIndex" id="navigationItem">
              <i class="iconfont icon-shouye-m"></i><span>首页</span>
            </div>
            <router-link to="/dd" id="navigationItem"
              ><i class="iconfont icon-a-mingpianzhengjian-m"></i
              ><span>简历</span></router-link
            >
            <a href="https://rs404.top" target="_blank" id="navigationItem"
              ><i class="iconfont icon-zhengcewenjian-m"></i
              ><span>技术博客</span></a
            >
            <div @click="GoComment" id="navigationItem">
              <i class="iconfont icon-xiaoxi-m"></i><span>个人说说</span>
            </div>
          </div>
          <div id="catagoryContainer">
            <div id="navigation"><span>分类</span></div>
            <div id="category">
              <div
                @click="CheckCategory(item.items)"
                v-for="item in categoryList"
                :key="item._id"
                id="categoryItem"
              >
                <span>{{ item.cateName }}</span>

                <span>{{ item.items.length }}</span>
              </div>
            </div>
          </div>
        </div>
        <div id="adminBox">
          <a href="http://localhost:8081/admin/" target="_blank"
            ><div id="adminContainer">
              <i class="iconfont icon-shezhi-m"></i>
              <div>后台管理</div>
            </div></a
          >
        </div>
      </div>
    </aside>
    <aside id="mobileAside" :class="isOpen ? 'open' : ''">
      <div id="avatarBox" @click="ReturnIndex" class="relatedColors">
        <div id="avatar">
          <img src="../assets/logo.jpg" alt="" />
        </div>
        <div id="">夏日の蝉</div>
      </div>
      <div id="navigationBox">
        <div id="navigationContainer" class="relatedColors">
          <div>
            <div id="navigation"><span>导航</span></div>
            <router-link to="/main" id="navigationItem"
              ><i class="iconfont icon-biaoji-m"></i
              ><span>主页</span></router-link
            >
            <div @click="ReturnIndex" id="navigationItem">
              <i class="iconfont icon-shouye-m"></i><span>首页</span>
            </div>
            <router-link to="/dd" id="navigationItem"
              ><i class="iconfont icon-a-mingpianzhengjian-m"></i
              ><span>简历</span></router-link
            >
            <a href="https://rs404.top" target="_blank" id="navigationItem"
              ><i class="iconfont icon-zhengcewenjian-m"></i
              ><span>技术博客</span></a
            >
            <div @click="GoComment" id="navigationItem">
              <i class="iconfont icon-xiaoxi-m"></i><span>个人说说</span>
            </div>
          </div>
          <div id="catagoryContainer">
            <div id="navigation"><span>分类</span></div>
            <div id="category">
              <div
                @click="CheckCategory(item.items)"
                v-for="item in categoryList"
                :key="item._id"
                id="categoryItem"
              >
                <span>{{ item.cateName }}</span>

                <span>{{ item.items.length }}</span>
              </div>
            </div>
          </div>
        </div>
        <div id="adminBox">
          <a href="http://localhost:8081/admin/" target="_blank"
            ><div id="adminContainer">
              <i class="iconfont icon-shezhi-m"></i>
              <div>后台管理</div>
            </div></a
          >
        </div>
      </div>
    </aside>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryList: [],
    };
  },
  computed: {
    isOpen() {
      return this.$store.state.isOpenFold;
    },
  },
  methods: {
    async GetCategory() {
      let result = await this.$http.get("/category");
      this.categoryList = result.data;
    },
    //选择分类
    CheckCategory(items) {
      if (this.$route.path !== "/index") {
        this.$router.push({ name: "index", params: { items } });
      }
      // 修改状态
      this.$store.dispatch("bulletin", `分类`);
      this.$store.dispatch("checkCategory", items);
    },
    // 返回首页
    ReturnIndex() {
      // 更文章title状态
      this.$store.dispatch("bulletin");
      this.$store.dispatch("getArticleList");
      if (this.$route.path !== "/index") this.$router.push({ name: "index" });
    },
    GoComment() {
      this.$store.dispatch("bulletin", "说说");
      if (this.$route.path !== "/comment") {
        this.$router.push({ name: "comment" });
      }
    },
  },
  created() {
    this.GetCategory();
  },
};
</script>
<style lang="scss" scoped>
.open {
  display: block !important;
  transform: translateX(0) !important;
}
#mobileAside {
  width: 50%;
  height: 92vh;
  position: fixed;
  z-index: 999;
  top: 8vh;
  display: none;
  transform: translateX(-100%);
  transition: all 0.2s;
  overflow: hidden;
}
aside {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: var(--blackFontColor);
  font-weight: var(--fontWeight);
  font-size: 1rem;
  background-color: var(--blue2);
  box-shadow: var(--shadow2);
  & > div {
    cursor: pointer;
  }
  & i {
    font-size: 1.2rem;
  }
  #avatarBox {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px white solid;
    #avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    #author {
      width: 80px;
      height: 30px;
      margin-right: 0;
      font-weight: 600;
    }
  }

  #navigationBox {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    #navigationContainer {
      flex: 1;
      display: flex;
      flex-direction: column;
      #navigation {
        text-align: left;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        & > span {
          margin-left: 12px;
        }
      }
      #catagoryContainer {
        width: 100%;
        flex: 1;
        #category {
          height: calc(92vh - 440px);
          overflow-y: auto;
          overflow-x: hidden;
          &::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
          #categoryItem {
            display: block;
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &:hover {
              background-color: var(--blue1);
            }
            & > span:nth-child(1) {
              display: inline-block;
              margin-left: 20px;
            }
            & > span:nth-child(2) {
              text-align: center;
              font-size: 14px;
              width: 20px;
              height: 20px;
              border-radius: 10px;
              display: inline-block;
              margin-right: 20px;
              background-color: var(--blue3);
              box-shadow: var(--shadow2);
            }
          }
        }
      }
    }
    #adminBox {
      text-align: center;
      height: 60px;
      // line-height: 60px;
      box-shadow: var(--shadow2);
      background-color: var(--blue2);

      a {
        width: 100%;
        height: 100%;
        display: inline-block;
        position: relative;
        #adminContainer {
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          i {
            display: inline-block;
            margin: 5px 0;
            font-size: 25px;
            // animation: fengche 1s linear infinite;
          }
        }
      }
    }
  }

  #navigationItem {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    &:hover {
      background-color: var(--blue1);
    }
    & > span {
      margin-left: 20px;
    }
    & > i {
      float: left;
      margin-left: 20px;
      // color: #66bfff;
    }
  }
}
</style>