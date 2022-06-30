<template>
  <div class="chat container-fluid" ref="chat">
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
    const chatUrl = "chat.edu.chicaga.ru";
    const httpChatUrl = "https://" + chatUrl;
    const wssChatUrl = "wss://" + chatUrl;
    const _vue = this;
    const hooks = {
      async transformMsg(msg) {
        let transformedMsg = msg;
        if (msg.attachments) {
          msg.attachments.forEach(attach => {
            if (attach[0]) {
              attach = attach[0];
            }
            attach.image_preview = httpChatUrl + attach.image_preview;
            attach.image_url = httpChatUrl + attach.image_url;
            attach.title_link = httpChatUrl + attach.title_link;
          });
        }
        // this.chatDriver.connection.url.replace("wss://", "https://");
        // let user = getUserInfo(msg.u._id);
        // transformedMsg.u.name = user.name;
        // transformedMsg.u.avatar = user.avatar;
        // return transformedMsg;
        return transformedMsg;
      },
      onMsgAdded() {
        if (!_vue.$refs.messages?.scrollToBottom) return;
        setTimeout(_vue.$refs.messages.scrollToBottom, 100);
      }
    };
    const driver = new Driver(hooks);
    await driver.connect(wssChatUrl);
    await driver.user.login({
      login: this.user.chat_auth_info.username,
      password: this.user.chat_auth_info.password
    });
    await driver.user.createChannel(this.roomId);
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
}
.chat__top {
  height: 80%;
}

.chat__masseges {
  height: 100%;
}
</style>
