<template>
  <div id="blogInformationContainer" >
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>博主信息</span>
        <el-button @click="OnSubmit" style="float: right; padding: 3px 0" type="text"
          >修改</el-button
        >
      </div>
      <div id="pictureCard">
        <div>
            <div></div>
        </div>
        <div>5</div>
        <div>5</div>
        <div>5</div>
        <div>5</div>
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


#pictureCard{
    & > div{
      width: 100%;
      margin: 20px 0;
      background-color: yellowgreen;
  }
  
}
</style>