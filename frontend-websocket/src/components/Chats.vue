<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <h3 class="md-title" style="flex: 1">Chat App</h3>
      <md-button class="md-primary" v-on:click="dialogActive = true">Logout</md-button>
    </md-app-toolbar>

    <md-app-content>
      <!-- Logout confirmation dialog hidden at first -->
      <md-dialog-confirm
        :md-active.sync="dialogActive"
        md-title="Confirm logout?"
        md-confirm-text="Yes"
        md-cancel-text="No"
        @md-confirm="logout"
      />

      <md-content class="messages md-scrollbar">
        <user-message
          class="msg-component"
          :message="message"
          v-for="message in messages"
          :key="message.id"
        />
      </md-content>
      <md-divider class="md-divider"></md-divider>
      <md-content>
        <div class="send-message">
          <AddMessage v-on:sentMessage="addMessage"/>
        </div>
      </md-content>
    </md-app-content>
  </md-app>
</template>

<script>
import UserMessage from "./UserMessage";
import AddMessage from "./AddMessage";
import io from "socket.io-client";
import axios from "axios";
import tokenConfig from "../auth";
// your server address here
const socket = io.connect(process.env.VUE_APP_API);
export default {
  components: {
    UserMessage,
    AddMessage,
  },
  data() {
    return {
      messages: [],
      dialogActive: false,
    };
  },
  async mounted() {
    let { data } = await axios.get(
      process.env.VUE_APP_API + "/api/messages",
      tokenConfig()
    );
    this.messages = data;
  },
  updated(){
    this.scroll()
  },
  created() {
    // Socket.io topics
    socket.on("incomingNewMessage", (message) => {
      this.addMessage(message);
    });
  },
  methods: {
    addMessage(message){
      this.messages.push(message);
    },
    scroll() {
      const messages = document.querySelectorAll(".msg-component");
      messages[messages.length - 1].classList.add("last-msg-component");
      document.querySelector(".last-msg-component").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      messages[messages.length - 1].classList.remove("last-msg-component");
    },
    logout() {
      sessionStorage.clear();
      this.$emit("loggedOut");
    },
  },
};
</script>

<style scoped>
.md-app {
  width: 90vw;
  height: 90vh;
}

.md-app-scroller {
  padding: 0 !important;
}

.md-app-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.messages {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
</style>