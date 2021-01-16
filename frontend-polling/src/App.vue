<template>
  <div id="app">
    <auth-component 
      v-if="isLoggedIn == false"
      v-on:loginSuccess="isLoggedIn = true"
      ></auth-component>
    <chats-component 
      v-else
      v-on:loggedOut="isLoggedIn = false"
    ></chats-component>
  </div>
</template>

<script>
import Chats from './components/Chats.vue'
import Authentication from './components/Authentication.vue'
export default {
  name: 'App',
  components: {
    'auth-component': Authentication,
    'chats-component': Chats
  },
  data(){
    return {
      isLoggedIn: false
    }
  },
  mounted(){
    this.checkIsAuthenticated()
  },
  methods: {
    checkIsAuthenticated(){
      let token = sessionStorage.getItem('token')
      if (token) {
        this.isLoggedIn = true
      }else{
        this.isLoggedIn = false
      }
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: #2d2d2d;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #2d2d2d;
  height: 100%;
  width: 100%;
}
</style>
