<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import Container from './components/Container.vue'
import Login from './components/Login.vue'
export default {
  components:{
    Container,
    Login,
  },

}
</script>

