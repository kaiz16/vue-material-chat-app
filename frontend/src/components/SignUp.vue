<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Login</div>
    </md-card-header>

    <md-card-content>
      <md-field>
        <label>Your username</label>
        <md-input v-model="userName"></md-input>
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
      error: null
    };
  },
  methods: {
    async signUp() {
      if (!this.userName) return
      try {
        const { data } = await axios.post("http://localhost:5000/api/users/create", {
          userName: this.userName,
        });
        sessionStorage.setItem("userName", data.userName);
        this.$emit('loginSuccess')
      } catch(err) {
        this.error = "Something went wrong"
        console.error(err)
      }
    },
    async signIn() {
      if (!this.userName) return
      try {
        const { data } = await axios.get(`http://localhost:5000/api/users/${this.userName}`);
        sessionStorage.setItem("userName", data.userName);
        this.$emit('loginSuccess')
      } catch (err) {
        this.error = "Something went wrong"
        console.error(err)
      }
    },
  },
};
</script>

<style>
.main {
  width: 100%;
  height: 100vh;
}

.md-card{
  width: 50%
}
.navbar-custom {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 5vw;
  width: 100%;
  height: 15vh;
  align-items: center;
  background-color: #090a29;
}
.nav-item {
  color: aliceblue;
  margin-left: 5vw;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
}
.nav-item:hover {
  color: aqua;
}
.custom {
  margin: auto auto;
  margin-top: 25vh;
  width: 50%;
  padding: 40px 10px 10px 10px;
  text-align: center;
  box-shadow: 5px 5px 10px 2px grey;
}
.inp {
  text-align: center;
  margin: 0px auto;
  width: 80%;
}
.alert {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
@media only screen and (max-width: 790px) {
  .inp,
  .custom {
    width: 90%;
  }
  .navbar-custom {
    justify-content: space-around;
  }
  .nav-item {
    font-size: 16px;
  }
}
</style>