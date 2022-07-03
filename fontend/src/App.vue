<template>
  <div id="app">
    <keep-alive include="MainIndex">
      <router-view />
    </keep-alive>
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
};
</script>

