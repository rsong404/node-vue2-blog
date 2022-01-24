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
                cateName: ''
            }
        }
    },
    methods: {
        async handle(){
            if(this.category.cateName == ''){
                console.log('不能为空')
                return
            }
            const result = await this.$http.post('/category',this.category)
            console.log(result)
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
