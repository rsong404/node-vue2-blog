<template>
  <el-container style="height: 705px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        background-color="#b3c0d1"
        text-color="white"
        active-text-color="#6699CC"
        router
        :default-active="this.$route.path"
        unique-opened
      >
        <el-menu-item index="/bloguser"
          ><i class="el-icon-s-custom"></i>博主信息</el-menu-item
        >
        <el-menu-item index="/accountList">
          <template slot="title"
            ><i class="el-icon-user-solid"></i>用户</template
          >
        </el-menu-item>
        <el-menu-item index="/catelist"
          ><i class="el-icon-menu"></i>分类</el-menu-item
        >
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-s-management"></i>文章</template
          >
          <el-menu-item-group>
            <el-menu-item index="/articleList">文章列表</el-menu-item>
            <el-menu-item index="/createArticle">新建文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-s-comment"></i>说说</template
          >
          <el-menu-item-group>
            <el-menu-item index="/commentList">说说列表</el-menu-item>
            <el-menu-item index="/createComment">发表说说</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/messageList"
          ><i class="el-icon-s-order"></i>留言</el-menu-item
        >
        <el-submenu index="4">
          <template slot="title"
            ><i class="el-icon-picture"></i>轮播图</template
          >
          <el-menu-item-group>
            <el-menu-item index="/carouselList">流播图</el-menu-item>
            <el-menu-item index="createCarousel">添加轮播图</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/websiteList"
          ><i class="el-icon-star-on"></i>站点</el-menu-item
        >
        <el-menu-item index="/blogInformation"
          ><i class="el-icon-s-tools"></i>博客信息</el-menu-item
        >
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div>夏日丶蝉</div>
        <div>
          <img :src="blogUser.avatar" alt="" />
          <div>{{ blogUser.realName }}</div>
        </div>
      </el-header>
      <el-main>
        <!-- 路由显示 -->
        <div v-if="isShowRouterView">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Container",
  provide() {
    return { reload: this.reload };
  },
  data() {
    return {
      isShowRouterView: true,
      blogUser: {},
    };
  },

  methods: {
    reload() {
      this.isShowRouterView = false;
      this.$nextTick(() => {
        this.isShowRouterView = true;
      });
    },
    async GetBlogUser() {
      let result = await this.$http.get("/bloguser");
      this.blogUser = result.data[0];
    },
  },
  mounted() {
    this.GetBlogUser();
  },
};
</script>

<style scoped lang="scss">
.el-menu {
  font-weight: 600;
}
i {
  color: white;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  div {
    font-size: 14px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: white;

    &:last-child {
      img {
        display: inline-block;
        width: 40px;
        border-radius: 50%;
      }
      div {
        display: inline-block;
        color: white;
        font-weight: 600;
        margin: 0 10px;
      }
    }
  }
}

.el-aside {
  color: #333;
}
</style>
