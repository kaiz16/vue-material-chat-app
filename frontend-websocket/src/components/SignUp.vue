<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Login</div>
    </md-card-header>

    <md-card-content>
      <!-- User Name -->
      <md-field>
        <label>Your username</label>
        <md-input v-model="userName"></md-input>
      </md-field>
      <!-- Password -->
      <md-field>
        <label>Your Password</label>
        <md-input v-model="password" type="password"></md-input>
      </md-field>
      <md-card class="md-accent" v-if="error">
        <md-card-content>
          <p class="md-accent">Something went wront</p>
        </md-card-content>
      </md-card>
    </md-card-content>

    <md-card-actions>
      <md-button @click="signIn">Login</md-button>
      <md-button @click="signUp">Sign Up</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userName: null,
      password: null,
      error: null,
    };
  },
  methods: {
    async signUp() {
      if (!this.userName || !this.password) return;
      try {
        const { data } = await axios.post(
          process.env.VUE_APP_API + "/api/users/create",
          {
            userName: this.userName,
            password: this.password,
          }
        );
        console.log(data);
        sessionStorage.setItem("userName", data.userName);
        sessionStorage.setItem("token", data.token);
        this.$emit("loginSuccess");
      } catch (err) {
        this.error = "Something went wrong";
        console.error(err);
      }
    },
    async signIn() {
      if (!this.userName || !this.password) return;
      try {
        const { data } = await axios.post(
          process.env.VUE_APP_API + "/api/users/login",
          {
            userName: this.userName,
            password: this.password,
          }
        );
        console.log(data);
        sessionStorage.setItem("userName", data.userName);
        sessionStorage.setItem("token", data.token);
        this.$emit("loginSuccess");
      } catch (err) {
        this.error = "Something went wrong";
        console.error(err);
      }
    },
  },
};
</script>

<style>
.md-card {
  width: 50%;
}
</style>