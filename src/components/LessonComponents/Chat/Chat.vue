<template>
  <div class="lessons__messages chat container-fluid" ref="chat">
    <header-chat />
    <masseges class="chat__masseges" v-if="chatIsOpen" />
    <textarea-chat v-if="chatIsOpen" />
  </div>
</template>

<script>
import TextareaChat from "./Textarea";
import Masseges from "./Masseges";
import HeaderChat from "./Header";
import { mapGetters } from "vuex";

export default {
  name: "chat",
  methods: {
    toggle(name) {
      this.$store.dispatch("toggleChannel", name);
    }
  },
  computed: mapGetters(["allMsgs", "user", "chatIsOpen"]),
  components: {
    TextareaChat,
    Masseges,
    HeaderChat
  },
  props: [],
  mixins: {},
  async mounted() {
    // Инициализация чата
    // Первым делом это!!!
    await this.$store.dispatch("initChat", {
      login: this.user.chat_auth_info.username,
      password: this.user.chat_auth_info.password,
      room: this.$route.params.id,
      socketUrl: "wss://chat.edu.chicaga.ru/websocket/",
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.chat__top {
  height: 80%;
}
</style>
