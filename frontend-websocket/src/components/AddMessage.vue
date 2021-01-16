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
        <md-input v-model="msg" v-on:keyup.enter="sendMessage"></md-input>
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
      // making optimistic response
      let data = {
        createdAt: (new Date).toISOString(),
        text: this.msg,
        updatedAt: (new Date).toISOString(),
        userName: sessionStorage.getItem("userName"),
        _id: (new Date).toISOString()
      }
      this.$emit('sentMessage', data)
      let msg = JSON.stringify(this.msg)
      this.msg = ''
      // send to server
      await axios.post(
        process.env.VUE_APP_API + "/api/messages/create",
        {
          userName: sessionStorage.getItem("userName"),
          text: JSON.parse(msg),
        },
        tokenConfig()
      );
      this.msg = "";
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