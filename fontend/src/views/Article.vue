<template>
  <div id="articleContainer">
    <div v-html="$store.state.article"></div>
  </div>
</template>
<style lang="scss" scoped>
  #articleContainer{
    width: 100%;
    min-height: 100%;
    background-color: rosybrown;
  }
</style>