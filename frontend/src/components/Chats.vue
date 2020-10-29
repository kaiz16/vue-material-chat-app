<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <span class="md-title">Vue Chat App</span>
    </md-app-toolbar>

    <md-app-drawer
      :md-swipeable="true"
      md-permanent="clipped"
      md-persistent="mini"
    >
      <md-toolbar class="md-transparent" md-elevation="0">
        Navigation
      </md-toolbar>

      <md-list>
        <md-list-item @click="dialogActive = true">
          <md-icon>power_settings_new</md-icon>
          <span class="md-list-item-text">Logout</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

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
          <AddMessage />
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
const socket = io.connect("http://localhost:5000");
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
      "http://localhost:5000/api/messages",
      tokenConfig()
    );
    this.messages = data;
  },
  created() {
    // Socket.io topics
    socket.on("incomingNewMessage", (message) => {
      this.messages.push(message);
      this.$nextTick(() => {
        this.scroll();
      });
    });
    socket.on("messageDeleted", (id) => {
      this.messages = this.messages.filter(({ _id }) => _id !== id);
    });
  },
  methods: {
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