<template>
  <div id="rigthAsideContainer">
    <div id="tabs">
      <div @click="Tabs('Frequently')" :class="name=='Frequently' ? 'active' : ''">常用</div>
      <div @click="Tabs('Catalog')" :class="name=='Catalog' ? 'active' : ''">目录</div>
    </div>
    <div>
      <component :is="name"></component>
    </div>
  </div>
</template>
<script>
import Frequently from '../views/Frequently'
import Catalog from '../views/Catalog'
export default {
  components:{
    Frequently,
    Catalog
  },
  data() {
    return {
      name: 'Frequently'
    }
  },
  methods: {
    Tabs(name){
      this.name = name
    }
  },
  
}
</script>
<style lang="scss" scoped>
#rigthAsideContainer {
  width: 100%;
  height: 100%;
  #tabs{
    display: flex;
    margin-bottom: 10px;
    background-color: var(--divWhiteBackground);
    &>div{
      width: 50%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      cursor: pointer;

    }
    .active{
      border-bottom: 2px rgb(112, 112, 112) solid;
    }
  }
}
</style>