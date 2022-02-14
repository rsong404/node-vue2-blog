<template>
  <div id="blogInformationContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改博客信息</span>
        <el-button
          @click="OnSubmit"
          style="float: right; padding: 3px 0"
          type="text"
          >确认修改</el-button
        >
      </div>
      <div id="pictureCard">
        <el-form label-width="100px" size="normal">
          <el-form-item label="博客名">
            <el-input v-model="blogInformation.blogName"></el-input>
          </el-form-item>
          <el-form-item label="作者名">
            <el-input v-model="blogInformation.userName"></el-input>
          </el-form-item>
          <el-form-item label="默认图片">
            <el-input v-model="blogInformation.defcoverPicture"></el-input>
          </el-form-item>
          <el-form-item label="公告" size="normal">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="blogInformation.bulletin"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="博客开始时间">
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker
                v-model="blogInformation.startTime"
                placeholder="选择日期"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="备案号">
            <el-input v-model="blogInformation.recordNumber"></el-input>
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
      blogInformation: {
        blogName: "",
        userName: "",
        defcoverPicture: "",
        bulletin:'',
        startTime: "",
        recordNumber: "",
      },
    };
  },
  methods: {
    async OnSubmit() {
      const result = await this.$http.put("/blog", this.blogInformation, {
        params: { _id: this.blogInformation._id },
      });
      this.$message.success("修改成功");
      this.$router.push({ name: "blogInformation" });
    },
  },
  created() {
    this.blogInformation = this.$route.params;
    console.log(this.blogInformation);
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
#pictureCard {
}
</style>