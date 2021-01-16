<template>
   <div class="wrapper">
        <md-card class="login-card">
            <md-card-header>
                <div class="md-title">Authentication 🚀</div>
                <div class="md-subhead">Hold up! Auth police here. Please register or login first 👮</div>
            </md-card-header>
            <md-card-content>
                <md-field>
                    <label>Username</label>
                    <md-input v-model="username" type="text"></md-input>
                </md-field>
                <md-field>
                    <label>Password</label>
                    <md-input v-model="password" type="password"></md-input>
                </md-field>
            </md-card-content>
            <md-card-actions>
                <md-button v-on:click="login">Login</md-button>
                <md-button v-on:click="register">Sign Up</md-button>
            </md-card-actions>
        </md-card>
   </div>
</template>

<script>
export default {
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login(){
            let url = process.env.VUE_APP_API + '/api/users/login'
            this.authenticate(url)
        },
        register(){
            let url = process.env.VUE_APP_API + '/api/users/create'
            this.authenticate(url)
        },
        async authenticate(url) {
            if (!this.username || !this.password) return;
            let body = {
                userName: this.username,
                password: this.password,
            }
            try {
                const data = await fetch(
                    url,
                    {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    }
                );
                data.json().then( d => {
                    sessionStorage.setItem("token", d.token);
                    sessionStorage.setItem("userName", d.userName);
                    this.$emit("loginSuccess");
                })
            } catch (err) {
                this.error = "Something went wrong";
                console.error(err);
            }
        }
    }
}
</script>

<style scoped>
.wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
}

.login-card{
    width: 50%;
}
</style>