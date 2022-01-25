<template>
  <el-container style="height: 705px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-active="this.$route.path" :default-openeds="['/catelist']">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-user-solid"></i>用户</template
          >
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="/userlist">用户列表</el-menu-item>
            <el-menu-item index="/createuser">新建用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
         <el-menu-item index="/catelist"><i class="el-icon-menu"></i>分类</el-menu-item>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-menu"></i>文章</template>
          <el-menu-item-group>
            <el-menu-item index="/articlelist">文章列表</el-menu-item>
            <el-menu-item index="/createarticle">新建文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-setting"></i>文章</template
          >
          <el-menu-item-group>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px"> 

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
  name:"Container",
  provide(){
    return {reload: this.reload}
  },
  data() {
    return {
      isShowRouterView: true
    }
  },
  methods: {
    reload(){
      this.isShowRouterView = false
      this.$nextTick(() => {
        this.isShowRouterView = true
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
