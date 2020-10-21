<template>
  <div id="app">
    <SignUp 
      v-if="isVerified == false"
      @loginSuccess="isVerified = true"/>
    <Chats v-else @loggedOut="isVerified = false"/>
  </div>
</template>

<script>
import SignUp from './components/SignUp';
import Chats from './components/Chats';
export default {
  name: "App",
  components: {
    SignUp,
    Chats
  },
  data() {
    return {
      isVerified: false,
    };
  },
  mounted() {
    this.isLoggedIn();
  },
  methods: {
    isLoggedIn() {
      const userName = sessionStorage.getItem("userName");
      if (userName) {
        this.isVerified = true;
      } else {
        this.isVerified = false;
      }
    }
  },
};
</script>

<style>
html,
body,
#app {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  background: #424290;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: auto;
}
</style>
