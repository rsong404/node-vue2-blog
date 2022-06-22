<template>
  <div id="MessageBox">
    <div id="Container">
        <div v-if="route === '/main/article'">
          <a :href="`#${item.id}`" :style="`paddingLeft:${item.level * 5}px`" v-for="item in GetCatalog" :key="item.id">{{item.title}}</a>
        </div>
        <div v-if="route !== '/main/article'">
          dididd
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      route: ''
    }
  },
  created() {
    this.route = this.$route.path
  },
  computed:{
    GetCatalog(){
      return this.$store.state.catalog
    }
  }
}
</script>
<style lang="scss" scoped>
#MessageBox{
  width: 100%;
  height: 100%;
  // background-color: var(--blue3);
  #Container{
    width: 100%;
    height: 100%;
    a{
      display: block;
      width:100%;
      padding: 5px;
      
    }
  }
}
</style>