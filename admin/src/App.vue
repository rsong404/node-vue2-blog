<template>
  <div id="app">
    <router-view v-if="!isAuthorize">
        <Login/>
    </router-view>
    <router-view  v-else>
        <Container/>

    </router-view>
    
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
  data() {
    const isAuthenticated = window.localStorage.token
    console.log(isAuthenticated)
    return {
      isAuthorize: isAuthenticated
    }
  },
}
</script>

