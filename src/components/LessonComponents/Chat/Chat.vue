<template>
  <div>
    <div class="chat container-fluid" ref="chat">
      <div class="chat__top justify-content-center">
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
</style>
