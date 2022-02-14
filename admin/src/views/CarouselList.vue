<template>
  <div id="imgContainer">
    <el-card v-for="item in imgsrcData" :key="item._id" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{item._id}}</span>
        <el-button @click="DeleteImg(item._id)" style="float: right; padding: 3px 0;color:red;" type="text"
          >删除</el-button
        >
      </div>
      <div id="pictureCard">
            <img :src="item.imgsrc" >
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
    inject:['reload'],
  data() {
    return {
        imgsrcData:[]
    };
  },
  methods: {
      async GetImgsrcData(){
          const result = await this.$http.get('/carousel')
          this.imgsrcData = result.data
      },
      async DeleteImg(_id){
          this.$confirm("确定删除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete("/carousel", { params: { _id } });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.reload();
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
        
      }
  },
  created() {
      this.GetImgsrcData()
  },
};
</script>
<style lang="scss" scoped>
#imgContainer{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
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

.box-card {
    display: inline-block;
  width: 480px;
  margin: 20px 0;
  img{
      width: 100%;
  }

}
</style>