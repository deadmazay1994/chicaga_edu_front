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
import Driver from "rocketchat-client-api";

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
    // await this.$store.dispatch("initChat", {
    //   login: this.user.chat_auth_info.username,
    //   password: this.user.chat_auth_info.password,
    //   room: this.$route.params.id,
    //   socketUrl: "wss://chat.edu.chicaga.ru/websocket/",
    //   chatElem: this.$refs.chat
    // });
    let getUserInfo = chatId => {
      chatId;
      return {
        name: "Sample user",
        avatar:
          "https://www.vokrug.tv/pic/person/2/b/f/4/2bf448098b7badf3b37e87c510da29bc.jpeg"
      };
    };
    const hooks = {
      async transformMsg(msg) {
        let transformedMsg = msg;
        let user = getUserInfo(msg.u._id);
        transformedMsg.u.name = user.name;
        transformedMsg.u.avatar = user.avatar;
        return transformedMsg;
      }
    };
    const driver = new Driver(hooks);
    await driver.connect("wss://chat.edu.chicaga.ru");
    await driver.user.login({
      login: this.user.chat_auth_info.username,
      password: this.user.chat_auth_info.password
    });
    let channelId = "NBrWc5LsqrhmaRNKb";
    try {
      driver.user.createChannel(channelId);
    } catch (error) {
      console.log(error);
    }
    await driver.subscribe([channelId]);
    await driver.channels[channelId].sendMessage("tesst");
    console.log(driver.channels);
    await driver.channels[channelId].loadHistory(300);
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
