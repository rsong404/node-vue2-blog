<template>
  <div id="loginContainer">
    <div id="loingBox">
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>请登录账号</span>
          </div>
          <div>
            <el-form
              :model="form"
              ref="form"
              label-width="80px"
              :inline="false"
              size="normal"
            >
              <el-form-item label="用户名">
                <el-input v-model="form.userName"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password" type="password"></el-input>
              </el-form-item>
              <el-button
                type="primary"
                style="
                  position: relative;
                  left: 50%;
                  transform: translateX(-50%);
                "
                @click="onSubmit"
                >立即登录</el-button
              >
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
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
    };
  },
  mounted() {
    document.addEventListener("keydown", async (e) => {
      let key = window.event.keyCode;
      if (key == 13) {
        this.onSubmit()
      }
    });
  },
  methods: {
    async onSubmit() {
      if (this.form.userName === "" || this.form.password === "") {
        this.$message.error("账号或密码不能为空，请检查！");
      } else {
        let result = await this.$http.post("/login", this.form);
        window.localStorage.token = result.data.token;
        this.$router.push({ name: "container" });
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener('keydown')
  },
};
</script>
<style lang="scss" scoped>
#loginContainer {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #99ccff, #66ccff);
  overflow: hidden;
  .box-card {
    width: 440px;
  }
  #loingBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>