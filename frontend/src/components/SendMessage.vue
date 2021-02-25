<template>
    <div class="md-layout md-alignment-center">
        
        <div class="md-layout-item send-input">
            <md-field>
                <label>Say hi...</label>
                <md-textarea 
                    v-model="message" 
                    md-autogrow 
                    v-on:keyup.enter="sendMessage"
                    md-counter="200"
                    maxlength="200"
                ></md-textarea>
            </md-field>
        </div>
        <div class="md-layout-item send-button">
            <md-button 
                class="md-icon-button md-primary"
                v-on:click="sendMessage"
            >
                <md-icon>send</md-icon>
            </md-button>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";
const socket = io.connect(process.env.VUE_APP_API);
export default {
    data(){
        return {
            message: ''
        }
    },
    methods: {
        async sendMessage() {
            if (!this.message) return;
            // making optimistic response
            let data = {
                createdAt: (new Date).toISOString(),
                text: this.message,
                updatedAt: (new Date).toISOString(),
                userName: sessionStorage.getItem("userName"),
                _id: (new Date).toISOString()
            }
            this.$emit('sentMessage', data)

            let body = {
                userName: sessionStorage.getItem("userName"),
                text: JSON.parse(JSON.stringify(this.message)),
            }
            this.message = ''
            // send to server

            let url = process.env.VUE_APP_API + "/api/messages/create";
            await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'auth-token': sessionStorage.getItem('token')
                    },
                    body: JSON.stringify(body)
                }
            )
            this.message = "";

            // finally emit an event to server
            socket.emit('newMessage', body)
        },
    }
}
</script>

<style scoped>
.send-button{
    flex: 0 1;
}
</style>