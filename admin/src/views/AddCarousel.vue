<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加图片地址</span>
        <el-button @click="OnSubmit" style="float: right; padding: 3px 0" type="text"
          >确认添加</el-button
        >
      </div>
      <div id="pictureCard" >
            <el-input placeholder="请输入图片地址" v-model="imgsrc">
        </el-input>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
        imgsrc:''
    };
  },
  methods: {
      async OnSubmit(){
        if(this.imgsrc == ''){
          this.$message.error('表格不能为空！')
        }else{
          await this.$http.post('/carousel',{'imgsrc':this.imgsrc})
          this.$message.success('添加成功！')
          this.$router.push({name:'carouselList'})
        }
      }
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
  height: 270px;
  top: 50%;
  left: 50%;
  transform: translate(-30%, -50%);
//   background-image: url('');
}
</style>