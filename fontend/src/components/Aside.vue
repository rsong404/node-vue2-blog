<template>
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
          ><i class="iconfont icon-shezhi-m"></i
        ></a>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      categoryList: [],
      timer: null,
    };
  },
  methods: {
    async GetCategory() {
      let result = await this.$http.get("/category");
      this.categoryList = result.data;
    },
    //选择分类
    CheckCategory(items) {
      if (this.$route.path !== "/index") {
        this.$router.push({ name: "index" });
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$store.dispatch("checkCategory", items);
        }, 200);
      }
      // 修改状态
      this.$store.dispatch("bulletin", `分类`);

      this.$store.dispatch("checkCategory", items);
    },
    // 返回首页
    ReturnIndex() {
      // 更文章title状态
      this.$store.dispatch("bulletin", "首页");
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
    #navigationContainer {
      flex: 1;
      overflow: hidden;
    }
    #adminBox {
      text-align: center;
      height: 60px;
      line-height: 60px;
      box-shadow: var(--shadow2);
      background-color: var(--blue2);
      backdrop-filter: blur(5px);
      i {
        display: inline-block;
        font-size: 30px;
        animation: fengche 1s linear infinite;
      }
      a {
        display: inline-block;
      }
    }
    @keyframes fengche {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
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
      height: 60%;
      #category {
        height: 90%;
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