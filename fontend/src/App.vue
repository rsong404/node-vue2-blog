<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.commit("REFRESH");
  },
  created() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    });
  },
}
</script>
<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
