<template>
  <aside>
    <div id="avatarContainer">
      <div id="avatar">
        <img src="../assets/logo.jpg" alt="" />
      </div>
      <div id="author">夏日の蝉</div>
    </div>
    <div id="navigationContainer">
      <div id="navigation"><span>导航</span></div>
      <router-link to="/dd" id="navigationItem"
        ><i class="iconfont icon-namecard"></i><span>简历</span></router-link
      >
      <a href="https://rs404.top" target="_blank" id="navigationItem"
        ><i class="iconfont icon-writing"></i><span>技术博客</span></a
      >
      <router-link to="/dd" id="navigationItem"
        ><i class="iconfont icon-respond"></i><span>个人说说</span></router-link
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
    <div id="adminBox">
      <a href="http://localhost:8080/admin/" target="_blank">后台管理</a>
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
#catagoryContainer {
  width: 100%;
  height: 50%;
  #category {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
}
#adminBox {
  // position: absolute;
  width: 100%;
  height: 10%;
  background-color: rgb(250, 159, 250);
  a {
    display: block;
  }
}
aside {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  flex-direction: column;
  // justify-content: space-between;
  width: 20%;
  height: 100%;

  background-color: var(--divWhiteBackground);
  color: var(--blackFontColor);
  font-weight: var(--fontWeight);
  font-size: 1rem;
  & > div {
    cursor: pointer;
  }
  & i {
    font-size: 1.2rem;
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
  #categoryItem {
    // position: absolute;
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
  #avatarContainer {
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px white solid;
    & > div {
      margin-left: 20px;
    }
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
      line-height: 30px;
      margin-right: 0px;
      font-weight: 600;
      color: rgba($color: #000000, $alpha: 0.7);
    }
  }
}
</style>