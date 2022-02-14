<template>
  <div id="blogInformationContainer" >
    <el-card class="box-card" :style="{'background-image': `url(${blogInformation.defcoverPicture})`}">
      <div slot="header" class="clearfix">
        <span>博客信息</span>
        <el-button @click="OnSubmit" style="float: right; padding: 3px 0" type="text"
          >修改</el-button
        >
      </div>
      <div id="pictureCard">
        <el-form label-width="100px" size="normal">
          <el-form-item label="博客名">
            <el-input disabled v-model="blogInformation.blogName"></el-input>
          </el-form-item>
          <el-form-item label="作者名">
            <el-input disabled v-model="blogInformation.userName"></el-input>
          </el-form-item>
          <el-form-item label="默认图片">
            <el-input disabled v-model="blogInformation.defcoverPicture"></el-input>
          </el-form-item>
          <el-form-item label="公告" size="normal">
            <el-input
            disabled
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="blogInformation.bulletin"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="博客开始时间">
            <div class="block" >
              <span class="demonstration"></span>
              <el-date-picker
              disabled
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
              <el-input disabled v-model="blogInformation.recordNumber"></el-input>
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
        blogInformation:{}
    };
  },
  methods: {
      async GetBlogData(){
          const result = await this.$http.get('/blog')
          this.blogInformation = result.data[0]
      },
      async OnSubmit(){
        this.$router.push({name:'editorBlogInfor',params:this.blogInformation})
        console.log(this.blogInformation)
      }
  },
  created() {
      this.GetBlogData()
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
  background-position: center;

}
#pictureCard{
    
  
}
</style>