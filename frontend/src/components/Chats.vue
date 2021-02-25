<template>
  <div class="wrapper">
    <md-app md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <h3 class="md-title" style="flex: 1">Chat App</h3>
        <md-button class="md-icon-button md-primary" @click="toggleDarkMode">
          <md-icon>dark_mode</md-icon>
        </md-button>

        <md-button class="md-primary" v-on:click="dialogActive = true">Logout</md-button>
      </md-app-toolbar>

      <md-app-content>
        <!-- Logout confirmation dialog hidden at first -->

        <md-dialog-confirm
          :md-active.sync="dialogActive"
          md-title="Confirm logout?"
          md-confirm-text="Yes"
          md-cancel-text="No"
          v-on:md-confirm="logout"
        />

        <md-content
          class="conversations md-scrollbar"
          v-bind:class="{ 'loading-spinner': loading == true }"
        >
          <message
            class="message"
            v-for="(message, index) in messages"
            :key="index"
            v-bind:message="message"
          />
          <md-progress-spinner
            v-if="loading"
            class="md-primary"
            v-bind:md-stroke="3"
            md-mode="indeterminate"
          ></md-progress-spinner>
        </md-content>
        <md-divider class="md-divider"></md-divider>
        <md-content>
          <send-message v-on:sentMessage="addMessage" />
        </md-content>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io.connect(process.env.VUE_APP_API);

import SendMessage from "./SendMessage.vue";
import Message from "./Message.vue";

export default {
  components: {
    "send-message": SendMessage,
    message: Message
  },
  data() {
    return {
      messages: [],
      dialogActive: false,
      loading: false
    };
  },
  updated() {
    this.scroll();
  },
  created() {
    socket.on("connected", function() {
        console.log("Connected to websocket server");
    });

    socket.on("incomingNewMessage", message => {
      this.messages.push(message);
      this.$nextTick(() => {
        this.scroll();
      });
    });
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    toggleDarkMode() {
      let dmode = sessionStorage.getItem("d_theme_enabled");
      if (!dmode) {
        sessionStorage.setItem("d_theme_enabled", true);
      } else {
        sessionStorage.removeItem("d_theme_enabled");
      }
      window.location.reload();
    },
    async fetchMessages() {
      let url = process.env.VUE_APP_API + "/api/messages";
      let data = await fetch(url, {
        headers: {
          "content-type": "application/json",
          "auth-token": sessionStorage.getItem("token")
        }
      });
      data.json().then(messages => {
        this.messages = messages;
      });
      this.loading = false;
    },
    addMessage(message) {
      this.messages.push(message);
    },
    scroll() {
      const messages = document.querySelectorAll(".message");
      if (messages.length == 0) return;
      messages[messages.length - 1].classList.add("last");
      document.querySelector(".last").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
      messages[messages.length - 1].classList.remove("last");
    },
    logout() {
      sessionStorage.clear();
      this.$emit("loggedOut");
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.md-app {
  height: 90vh;
  width: 90vw;
}
.md-app-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.conversations {
  height: 100%;
  overflow: auto;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
