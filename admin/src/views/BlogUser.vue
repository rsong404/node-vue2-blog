<template>
  <div id="blogInformationContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>博主信息</span>
        <el-button
          @click="OnSubmit"
          style="float: right; padding: 3px 0"
          type="text"
          >修改</el-button
        >
      </div>
      <div id="pictureCard">
        <div id="avatarContainer">
          <div id="avatar"><img :src="bloguser.avatar" /></div>
        </div>
        <el-descriptions direction="vertical" :column="2" border>
          <el-descriptions-item label="姓名"
            >{{bloguser.realName}}</el-descriptions-item
          >
          <el-descriptions-item label="手机号"
            >{{bloguser.telephone}}</el-descriptions-item
          >
          <el-descriptions-item label="邮箱" 
            >{{bloguser.mail}}</el-descriptions-item
          >
          <el-descriptions-item label="微信">
            <el-tag>{{bloguser.wechat}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="勉励语"
            >{{bloguser.motto}}</el-descriptions-item
          >
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bloguser: {
        realName: "",
        telephone: 15602679045,
        mail: "",
        wechat: 15602679045,
        motto: "",
        avatar: "https://gitee.com/rs404/picgo_img/raw/master/images/logo.jpg",
      },
    };
  },
  methods: {
    async GetBlogData() {
      const result = await this.$http.get("/bloguser");
      this.bloguser = result.data[0];
    },
    async OnSubmit() {
      this.$router.push({ name: "editorBloguser", params: this.bloguser });
    },
  },
  created() {
    this.GetBlogData();
  },
};
</script>
<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  position: absolute;
  width: 480px;
  top: 50%;
  left: 50%;
  transform: translate(-30%, -50%);
}

#pictureCard {
  #avatarContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50%;
  }
  
  & img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  & > div {
    width: 100%;
    margin: 20px 0;
  }
}
</style>