<template>
  <div id="container">
    <el-card>
      <el-upload
      class="avatar-uploader"
        action="http://localhost:3000/admin/api/upload"
        list-type="picture"
        :headers="headers"
        :on-success="SuccessUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-card>
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加图片地址</span>
        <el-button
          @click="OnSubmit"
          style="float: right; padding: 3px 0"
          type="text"
          >确认添加</el-button
        >
      </div>
      <div id="pictureCard">
        <el-input placeholder="请输入图片地址" v-model="imgsrc"> </el-input>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgsrc: "",
      imageUrl: "",
      
      headers: {
        Authorization: "",
      },
    };
  },
  methods: {
    async OnSubmit() {
      if (this.imgsrc == "") {
        this.$message.error("表格不能为空！");
      } else {
        await this.$http.post("/carousel", { imgsrc: this.imgsrc });
        this.$message.success("添加成功！");
        this.$router.push({ name: "carouselList" });
      }
    },
    async SuccessUpload(res) {
      this.imageUrl = res;
      await this.$http.post("/carousel", { imgsrc: res });
        this.$message.success("添加成功！");
        this.$router.push({ name: "carouselList" });
    },

  },
  created() {
    this.headers.Authorization = window.localStorage.token;
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
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

#container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .box-card {
    // position: absolute;
    width: 480px;
    // top: 50%;
    // left: 50%;
    // transform: translate(-30%, -50%);
    //   background-image: url('');
  }
}
</style>