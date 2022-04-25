<template>
  <aside>
    <div id="avatarBox" class="relatedColors">
      <div id="avatar">
        <img src="../assets/logo.jpg" alt="" />
      </div>
      <div id="">夏日の蝉</div>
    </div>
    <div id="navigationBox">
      <div id="navigationContainer" class="relatedColors">
        <div>
          <div id="navigation"><span>导航</span></div>
          <router-link to="/dd" id="navigationItem"
            ><i class="iconfont icon-namecard"></i
            ><span>简历</span></router-link
          >
          <a href="https://rs404.top" target="_blank" id="navigationItem"
            ><i class="iconfont icon-writing"></i><span>技术博客</span></a
          >
          <router-link to="/dd" id="navigationItem"
            ><i class="iconfont icon-respond"></i
            ><span>个人说说</span></router-link
          >
        </div>
        <div id="catagoryContainer">
          <div id="navigation"><span>分类</span></div>
          <div id="category">
            <div v-for="item in categoryData" :key="item._id" id="categoryItem">
              <router-link :to="`/${item.cateName}`"
                ><span>{{ item.cateName }}</span></router-link
              >
              <span>ddd</span>
            </div>
          </div>
        </div>
      </div>
      <div id="adminBox">
        <a href="http://localhost:8080/admin/" target="_blank">后台管理</a>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      categoryData: [],
    };
  },
  methods: {
    async GetCategory() {
      let result = await this.$http.get("/category");
      this.categoryData = result.data;
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
      height: 60px;
      background-color: var(--lightGray);
      a {
        display: block;
      }
    }
    #navigation {
      text-align: left;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 13px;
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
          line-height: 40px;
          text-align: left;

          &:hover {
            background-color: var(--htmlwhiteBackground);
          }
          & > a {
            margin-left: 20px;
          }
          & > span {
            float: right;
            margin-right: 20px;
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
      background-color: var(--htmlwhiteBackground);
    }
    & > span {
      margin-left: 20px;
    }
    & > i {
      float: left;
      margin-left: 20px;
    }
  }
}
</style>