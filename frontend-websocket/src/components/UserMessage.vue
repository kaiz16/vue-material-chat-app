<template>
  <div class="md-layout">
    <div class="md-layout-item msg" :class="{ 'is-me': isMe }" v-if="isMe">
      <p class="text">{{ message.text }}</p>
      <p class="date">{{ transformDateAndTime(message.createdAt) }}</p>
    </div>
    <div class="md-layout-item avatar">
      <md-avatar class="md-avatar-icon md-accent">
        {{ message.userName[0].toUpperCase() }}
      </md-avatar>
      <p>{{ message.userName }}</p>
    </div>

    <div class="md-layout-item msg" v-if="!isMe">
      <p class="text">{{ message.text }}</p>
      <p class="date">{{ transformDateAndTime(message.createdAt) }}</p>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io.connect(process.env.VUE_APP_API);
import moment from "moment-timezone";
import axios from "axios";
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userName: sessionStorage.getItem("userName"),
    };
  },
  computed: {
    isMe() {
      return this.message.userName == this.userName;
    },
  },
  methods: {
    transformDateAndTime(string) {
      var userLocation = moment.tz.guess();
      var parsedTime = moment(string).tz(userLocation).format();
      return moment(parsedTime).calendar();
    },
    async deleteMessage(_id) {
      await axios.delete(`api/messages/delete/${_id}`);
      socket.emit("deleteMessage", _id);
    },
  },
};
</script>
<style scoped>
.avatar {
  flex: 0 0;
  text-align: center;
}

.msg {
  display: flex;
  flex-direction: column;
}

.msg .text {
  background: #f6f6f6;
  border-radius: 12px;
  margin: 0 15px 10px 15px;
  padding: 15px;
  width: fit-content;
  color: #000;
}

.is-me {
  display: flex;
  align-items: flex-end;
}

.msg .date {
  margin: 0 15px 10px 15px;
}
</style>