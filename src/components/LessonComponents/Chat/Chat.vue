<template>
  <div class="lessons__messages chat container-fluid" ref="chat">
    <header-chat />
    <masseges
      v-if="chatDriver"
      ref="messages"
      class="chat__masseges"
      :msgs="msgs"
    />
    <textarea-chat />
  </div>
</template>

<script>
import TextareaChat from "./Textarea";
import Masseges from "./Masseges";
import HeaderChat from "./Header";
import { mapGetters, mapMutations } from "vuex";
import Driver from "rocketchat-client-api";

export default {
  name: "chat",
  data: function() {
    return {
      msgs: []
    };
  },
  methods: {
    toggle(name) {
      this.$store.dispatch("toggleChannel", name);
    },
    ...mapMutations(["setChatDriver"])
  },
  computed: mapGetters(["user", "chatDriver"]),
  components: {
    TextareaChat,
    Masseges,
    HeaderChat
  },
  props: {
    roomId: {
      required: true,
      type: String
    }
  },
  mixins: {},
  async mounted() {
    // Инициализация чата
    // Первым делом это!!!
    // await this.$store.dispatch("initChat", {
    //   login: this.user.chat_auth_info.username,
    //   password: this.user.chat_auth_info.password,
    //   room: this.$route.params.id,
    //   socketUrl: "wss://chat.edu.chicaga.ru/websocket/",
    //   chatElem: this.$refs.chat
    // });
    // let getUserInfo = chatId => {
    //   chatId;
    //   return {
    //     name: "Sample user",
    //     avatar:
    //       "https://www.vokrug.tv/pic/person/2/b/f/4/2bf448098b7badf3b37e87c510da29bc.jpeg"
    //   };
    // };
    const _vue = this;
    const hooks = {
      async transformMsg(msg) {
        // let transformedMsg = msg;
        // let user = getUserInfo(msg.u._id);
        // transformedMsg.u.name = user.name;
        // transformedMsg.u.avatar = user.avatar;
        // return transformedMsg;
        return msg;
      },
      onMsgAdded() {
        if (!_vue.$refs.messages?.scrollToBottom) return;
        setTimeout(_vue.$refs.messages.scrollToBottom, 100);
      }
    };
    const driver = new Driver(hooks);
    await driver.connect("wss://chat.edu.chicaga.ru");
    await driver.user.login({
      login: this.user.chat_auth_info.username,
      password: this.user.chat_auth_info.password
    });
    driver.user.createChannel(this.roomId);
    await driver.subscribe([this.roomId]);
    driver.activeChannel = this.roomId;
    await driver.channels[this.roomId].loadHistory(300);
    this.msgs = driver.activeChannel.msgs;
    this.setChatDriver(driver);
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
