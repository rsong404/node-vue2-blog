<template>
  <div id="FormContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增后台管理账号</span>
      </div>

      <div id="pictureCard">
        <el-form label-width="100px" size="normal">
          <el-form-item label="用户名">
            <el-input
              v-model="form.userName"
              placeholder="不能少于5位"
              minlength="5"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form.password"
              placeholder="不能少于5位"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="verifyPassword"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <button
            id="button"
            @click="OnSubmit"
            style="position: relative; left: 50%; transform: translateX(-50%)"
          >
            确认添加
          </button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      verifyPassword: "",
    };
  },
  methods: {
    async OnSubmit() {
      if (
        this.form.userName == "" ||
        this.form.password == "" ||
        this.verifyPassword == ""
      ) {
        this.$message.error("表格不能为空，请检查！");
        return;
      }
      if (this.form.userName.length < 5 || this.form.password.length < 5) {
        this.$message.error("账号或密码不能小于5位，请检查！");
        return;
      }
      if (this.form.password !== this.verifyPassword) {
        this.$message.error("密码不一致，请检查！");
        return;
      }
      let result = await this.$http.post("/account", this.form);
      if(!result.data.result) {
        this.$message.error(result.data.wrongMessage);
      }else{
        this.$message.success('创建成功！');
      }
      this.$router.push({ name: "accountList" });
    },
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