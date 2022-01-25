<template>
  <div>
    <div id="category">
      <div><el-input v-model="category.cateName" size="normal" placeholder='请输入分类名'></el-input></div>
      <br>
      <br>
      <div><el-button type="primary" size="default" @click="handle">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name:'CreateCate',
    data() {
        return {
            category:{
                cateName: '',
                time:'',
            }
        }
    },
    methods: {
        async handle(){
            if(this.category.cateName == ''){
                this.$message.error("分类名不能为空！")
                return
            }
            const result = await this.$http.post('/category',this.category)
            this.$message.success(result.data.cateName + '分类存入成功！')
            this.$router.push({name:'catelist'})
        }
    },
}
</script>
<style lang="scss" scoped>
#category{
    width: 200px;
    margin: 0 auto;
    margin-top: 40px;
}
</style>
