<template>
  <div id="MessageBox">
    <div id="Container">
      <div v-show="isCatalog">
        <a
          :href="`#${item.id}`"
          :style="`paddingLeft:${item.level * 5}px`"
          v-for="item in catalog"
          :key="item.id"
          >{{ item.title }}</a
        >
      </div>
      <div id="gifcontainer" v-show="!isCatalog"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isCatalog", "catalog"]),
  },
};
</script>
<style lang="scss" scoped>
#MessageBox {
  width: 100%;
  height: 100%;
  #Container {
    width: 100%;
    height: 100%;
    a {
      display: block;
      width: 100%;
      padding: 5px;
    }
    #gifcontainer {
      width: 100%;
      height: 35%;
      background-image: url("../assets/123.gif");
    }
  }
}
</style>