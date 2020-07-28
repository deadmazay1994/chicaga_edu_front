<template>
  <div>
    <div class="chat container-fluid" ref="chat">
      <div class="chat__top justify-content-center">
        <!-- <button v-on:click="toggle('toggler')">toggle</button> -->
        <masseges class="chat__masseges" />
      </div>
      <div class="chat__bottom">
        <textarea-chat />
      </div>
    </div>
  </div>
</template>

<script>
import TextareaChat from "./Textarea";
import Masseges from "./Masseges";
import { mapGetters } from "vuex";

export default {
  name: "chat",
  methods: {
    toggle(name) {
      this.$store.dispatch("toggleChannel", name);
    }
  },
  computed: mapGetters(["allMsgs", "user"]),
  components: {
    TextareaChat,
    Masseges
  },
  props: [],
  mixins: {},
  async mounted() {
    // Инициализация чата
    // Первым делом это!!!
    await this.$store.dispatch("initChat", {
      // login: this.user.username,
      login: "rawil",
      password: "password",
      room: "two",
      // room: window.location.hash.substr(1),
      socketUrl: "wss://chat.edu.chicaga.ru/websocket",
      chatElem: this.$refs.chat
    });
  }
};
</script>
<style scoped>
.chat {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
