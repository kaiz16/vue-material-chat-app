<template>
  <div class="md-layout md-alignment-center">
    <VEmojiPicker
      v-show="showDiag"
      labelSearch="Search"
      lang="pt-BR"
      @select="selectEmoji"
    />
    <div class="md-layout-item emoji">
      <md-button class="md-icon-button" @click="showDiag = !showDiag">
        <md-icon>sentiment_satisfied_alt</md-icon>
      </md-button>
    </div>
    <div class="md-layout-item">
      <md-field>
        <label>Type here!</label>
        <md-input v-model="msg"></md-input>
      </md-field>
    </div>
    <div class="md-layout-item send">
      <md-button class="md-icon-button" @click="sendMessage">
        <md-icon>send</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect(process.env.VUE_APP_API);
import tokenConfig from "../auth";
export default {
  data() {
    return {
      msg: "",
      showDiag: false,
    };
  },
  methods: {
    selectEmoji(emoji) {
      this.msg += emoji.data;
    },
    async sendMessage() {
      if (!this.msg) return;
      const { data } = await axios.post(
        process.env.VUE_APP_API + "/api/messages/create",
        {
          userName: sessionStorage.getItem("userName"),
          text: this.msg,
        },
        tokenConfig()
      );

      this.msg = "";
      socket.emit("newMessage", data);
    },
  },
};
</script>

<style scoped>
.emoji,
.send {
  flex: 0 0;
}
#EmojiPicker {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>