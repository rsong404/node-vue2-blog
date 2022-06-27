<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加网站信息</span>
        <el-button
          @click="OnSubmit"
          style="float: right; padding: 3px 0"
          type="text"
          >确认添加</el-button
        >
      </div>
      <div id="pictureCard">
        <el-form
          label-width="80px"
        >
          <el-form-item label="网站类型" size="normal">
            <el-input placeholder="如：影视" v-model="form.type"> </el-input>
          </el-form-item>
          <el-form-item label="网站名称" size="normal">
            <el-input placeholder="如：影视" v-model="form.websiteName"> </el-input>
          </el-form-item>
          <el-form-item label="网址" size="normal">
            <el-input placeholder="如：https://rs404.top/" v-model="form.website"> </el-input>
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
      form: {
          websiteName:'',
          website:'',
          type:'',
          time:'',
      },
    };
  },
  methods: {
    async OnSubmit() {
      if (this.form.websiteName == "" || this.form.website == ''){
        this.$message.error("站名和网址不能为空！");
      } else {
        await this.$http.post("/website", this.form);
        this.$message.success("添加成功！");
        this.$router.push({ name: "websiteList" });
      }
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
}
</style>