<template>
  <div id="rigthAsideContainer">
    <div id="tabs" >
      <div  @click="name ='Frequently'" :class="FreToggle"><i class="iconfont icon-a-fasongdaohang-m"></i></div>
      <div @click="name ='Catalog'" :class="CatToggle"><i class="iconfont icon-biaoji-m"></i></div>
    </div>
    <div>
      <component :is="name"> </component>
    </div>
  </div>
</template>
<script>
import Frequently from "../views/Frequently";
import Catalog from "../views/Catalog";
export default {
  components: {
    Frequently,
    Catalog,
  },
  data() {
    return {
      name: "Frequently",
    };
  },
  computed:{
    FreToggle(){
      return this.name === 'Frequently'? 'active':''
    },
    CatToggle(){
      return this.name === 'Catalog'? 'active':''
    }
  },
};
</script>
<style lang="scss" scoped>
#rigthAsideContainer {
  width: 100%;
  height: 100%;
  #tabs {
    display: flex;
    margin-bottom: 10px;
    background-color: var(--blue2);
    & > div {
      width: 50%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
     
      cursor: pointer;
      &>i{
        font-size:18px;
        &:hover{
          font-size: 22px;
        }
        transition: .2s;
      }
    }
    .active {
      border-bottom: 2px rgb(245, 245, 245) solid;
    }
    
  }
}
</style>