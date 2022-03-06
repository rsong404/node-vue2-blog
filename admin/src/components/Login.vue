<template>
  <div id="loginContainer">
    <div id="loingBox">
      <div id="img"></div>
      <div id="form">
        <div id="blogTitle">博 客 后 台 管 理</div>
        <div>
          <div>
            <label for="user">账 号</label>
            <input type="text" v-model.trim="form.userName" id="user" placeholder=" 请 输 入 账 号" />
          </div>
          <div>
            <label for="password">密 码</label>
            <input type="password" v-model.trim="form.password" id="password" placeholder=" 请 输 入 密 码" />
          </div>
        </div>
        <div>
          <button  @click="onSubmit">登 录</button>
        </div>
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
    document.addEventListener("keydown", this.KeyDown);
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
    KeyDown(e) {
      var event = e || window.event;
      var key = event.which || event.keyCode || event.charCode;
      if (key == 13) {
        this.onSubmit();
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.KeyDown);
  },
};
</script>
<style lang="scss" scoped>
#loginContainer {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #99ccff, #66ccff);
  background-size: cover;
  background-position: center;
  overflow: hidden;

  #loingBox {
    width: 650px;
    height: 350px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    box-shadow: 5px 5px 12px  white;
    #form {
      flex-grow: 1;
      height: 100%;
      background-color: rgb(255, 255, 255);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      #blogTitle{
        font-size: 20px;
        font-weight: 600;
        color: #409EFF;
      }
      label{
        color: #409EFF;
        font-weight: 600;
      }
      button {
        width: 90px;
        height: 40px;
        background-color: #409EFF;
        border: rgb(148, 203, 248) solid 1px;
        border-radius: 5px;
        outline: none;
        color: white;
        font-weight: 600;
        &:active {
          border: rgb(22, 147, 248) solid 2px;
        }
      }
      
      input {
        height: 35px;
        width: 250px;
        margin: 10px 15px;
        border: rgb(149, 203, 248) 1px solid;
        border-radius: 5px;
        &:focus {
          outline: none;
          border: rgb(47, 160, 252) 1px solid;
        }
      }
    }
    #img {
      width: 270px;
      height: 100%;
      text-align: center;
      background-image: url("../assets/login.jpg");
      background-position: center;
      background-size: cover;
    }
  }
}
</style>