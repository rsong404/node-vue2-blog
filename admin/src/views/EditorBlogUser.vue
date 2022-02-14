<template>
  <div id="blogInformationContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改博主信息</span>
        <el-button
          @click="OnSubmit"
          style="float: right; padding: 3px 0"
          type="text"
          >确认修改</el-button
        >
      </div>
      <div id="pictureCard">
        <el-form label-width="100px" size="normal">
          <el-form-item label="姓名">
            <el-input v-model="bloguser.realName"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input
              maxlength="11"
              show-word-limit
              v-model="bloguser.telephone"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="bloguser.mail"></el-input>
          </el-form-item>
          <el-form-item label="微信">
            <el-input v-model="bloguser.wechat"></el-input>
          </el-form-item>
          <el-form-item label="勉励语" size="normal">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="bloguser.motto"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="头像地址">
            <el-input v-model="bloguser.avatar"></el-input>
          </el-form-item>
        </el-form>
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
    async OnSubmit() {
      const result = await this.$http.put("/bloguser", this.bloguser, {
        params: { _id: this.bloguser._id },
      });
      this.$message.success("修改成功");
      this.$router.push({ name: "bloguser" });
    },
  },
  created() {
    this.bloguser = this.$route.params;
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
  background-size: cover;
}
</style>