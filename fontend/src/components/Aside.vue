<template>
  <div class="AsideBox" style="width: 100%; height: 100%">
    <aside>
      <div class="avatarBox relatedColors" @click="ReturnIndex">
        <div class="avatar">
          <img src="../assets/logo.jpg" alt="" />
        </div>
        <div class="">夏日の蝉</div>
      </div>
      <div class="navigationBox">
        <div class="navigationContainer relatedColors">
          <div>
            <div class="navigation"><span>导航</span></div>
            <router-link to="/" class="navigationItem"
              ><i class="iconfont icon-biaoji-m"></i
              ><span>主页</span></router-link
            >
            <div @click="ReturnIndex" class="navigationItem">
              <i class="iconfont icon-shouye-m"></i><span>首页</span>
            </div>
            <div @click="Resume" class="navigationItem">
              <i class="iconfont icon-a-mingpianzhengjian-m"></i
              ><span>简历</span>
            </div>
            <a href="https://rs404.top" target="_blank" class="navigationItem"
              ><i class="iconfont icon-zhengcewenjian-m"></i
              ><span>技术博客</span></a
            >
            <div @click="GoComment" class="navigationItem">
              <i class="iconfont icon-xiaoxi-m"></i><span>个人说说</span>
            </div>
            <router-link id="website" to="/main/website" class="navigationItem"
              ><i class="iconfont icon-faxian2-m"></i
              ><span>常用网站</span></router-link
            >
          </div>
          <div class="catagoryContainer">
            <div class="navigation"><span>分类</span></div>
            <div class="category">
              <div
                @click="CheckCategory(item.items)"
                v-for="item in categoryList"
                :key="item._id"
                class="categoryItem"
                item
              >
                <span>{{ item.cateName }}</span>

                <span>{{ item.items.length }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="adminBox">
          <a href="https://kkan.top/admin/" target="_blank"
            ><div class="adminContainer">
              <i class="iconfont icon-shezhi-m"></i>
              <div>后台管理</div>
            </div></a
          >
        </div>
      </div>
    </aside>
    <aside class="mobileAside" :id="isOpen ? 'open' : ''">
      <div class="avatarBox relatedColors" @click="ReturnIndex">
        <div class="avatar">
          <img src="../assets/logo.jpg" alt="" />
        </div>
        <div class="">夏日の蝉</div>
      </div>
      <div class="navigationBox">
        <div class="navigationContainer relatedColors">
          <div>
            <div class="navigation"><span>导航</span></div>
            <router-link to="/" class="navigationItem"
              ><i class="iconfont icon-biaoji-m"></i
              ><span>主页</span></router-link
            >
            <div @click="ReturnIndex" class="navigationItem">
              <i class="iconfont icon-shouye-m"></i><span>首页</span>
            </div>
            <div @click="Resume" class="navigationItem">
              <i class="iconfont icon-a-mingpianzhengjian-m"></i
              ><span>简历</span>
            </div>
            <a href="https://rs404.top" target="_blank" class="navigationItem"
              ><i class="iconfont icon-zhengcewenjian-m"></i
              ><span>技术博客</span></a
            >
            <div @click="GoComment" class="navigationItem">
              <i class="iconfont icon-xiaoxi-m"></i><span>个人说说</span>
            </div>
            <router-link to="/main/website" class="navigationItem"
              ><i class="iconfont icon-faxian2-m"></i
              ><span>常用网站</span></router-link
            >
          </div>
          <div class="catagoryContainer">
            <div class="navigation"><span>分类</span></div>
            <div class="category">
              <div
                @click="CheckCategory(item.items)"
                v-for="item in categoryList"
                :key="item._id"
                class="categoryItem"
              >
                <span>{{ item.cateName }}</span>

                <span>{{ item.items.length }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="adminBox">
          <a href="https://kkan.top:6666/admin/" target="_blank"
            ><div class="adminContainer">
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
import $eventBus from "../utils/eventBus";
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
    Resume() {
      for (const item of this.categoryList) {
        if (item.cateName === "简历") {
          this.$store.dispatch("checkArticle", item.items[0]);
          if (this.$route.name !== "article")
            this.$router.push({ name: "article" });
        }
      }
    },
    //选择分类
    CheckCategory(items) {
      if (this.$route.name !== "index") {
        this.$router.push({ name: "index", params: { items } });
      }
      
      this.$store.dispatch("checkCategory", items);
    },
    // 返回首页
    ReturnIndex() {
      // 更文章title状态

      $eventBus.$emit("IndexPage"); //返回首页
      if (this.$route.name !== "index") this.$router.push({ name: "index" });
    },
    GoComment() {
      if (this.$route.name !== "comment") {
        this.$router.push({ name: "comment" });
      }
    },
  },
  created() {
    this.GetCategory();
  },
  beforeDestroy() {
    $eventBus.$off("IndexPage");
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 780px) {
  .category {
    height: calc(92vh - 480px) !important;
  }
}
@media screen and (min-width: 780px) {
  #open {
    display: none !important;
    transform: translateX(-100%) !important;
  }
}
@media screen and (max-width: 950px) {
  #website {
    display: block !important;
  }
  .category {
    height: calc(92vh - 480px) !important;
  }
}
#open {
  display: block;
  transform: translateX(0);
}
#website {
  display: none;
}
.mobileAside {
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
  .avatarBox {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px white solid;
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .author {
      width: 80px;
      height: 30px;
      margin-right: 0;
      font-weight: 600;
    }
  }

  .navigationBox {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    .navigationContainer {
      flex: 1;
      display: flex;
      flex-direction: column;

      .navigation {
        text-align: left;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        & > span {
          margin-left: 12px;
        }
      }
      .catagoryContainer {
        width: 100%;
        flex: 1;
        .category {
          height: calc(92vh - 440px);
          overflow-y: auto;
          overflow-x: hidden;
          &::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
          .categoryItem {
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
    .adminBox {
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
        .adminContainer {
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

  .navigationItem {
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
      // color: .66bfff;
    }
  }
}
</style>