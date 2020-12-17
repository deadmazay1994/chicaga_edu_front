<template>
  <beautiful-chat
    class="chat vue-component"
    :participants="participants"
    :titleImageUrl="titleImageUrl"
    :onMessageWasSent="onMessageWasSent"
    :messageList="messageList"
    :newMessagesCount="newMessagesCount"
    :isOpen="true"
    :close="closeChat"
    :icons="icons"
    :open="openChat"
    :showEmoji="true"
    :showFile="true"
    :showEdition="true"
    :showDeletion="true"
    :showTypingIndicator="showTypingIndicator"
    :showLauncher="false"
    :showCloseButton="false"
    :colors="colors"
    :alwaysScrollToBottom="alwaysScrollToBottom"
    :messageStyling="messageStyling"
    @onType="handleOnType"
    @edit="editMessage"
  />
</template>

<script>
import RealTimeAPI from "./RocketchatClient/RocketchatClient";

import CloseIcon from "Icons/Cancel.svg";
import OpenIcon from "Icons/Cancel.svg";
import FileIcon from "Icons/Cancel.svg";
import CloseIconSvg from "Icons/Cancel.svg";
import { mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {
      rocket: false,
      auth: false,
      icons: {
        open: {
          img: OpenIcon,
          name: "default"
        },
        close: {
          img: CloseIcon,
          name: "default"
        },
        file: {
          img: FileIcon,
          name: "default"
        },
        closeSvg: {
          img: CloseIconSvg,
          name: "default"
        }
      },
      participants: [
        {
          id: "user1",
          name: "Matteo",
          imageUrl: "https://avatars3.githubusercontent.com/u/1915989?s=230&v=4"
        },
        {
          id: "user2",
          name: "Support",
          imageUrl:
            "https://avatars3.githubusercontent.com/u/37018832?s=200&v=4"
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl:
        "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      messageList: [
        { type: "text", author: `me`, data: { text: `Say yes!` } },
        { type: "text", author: `user1`, data: { text: `No.` } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0, // to determine whether the chat window should be open or closed
      showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: "#4e8cff",
          text: "#ffffff"
        },
        launcher: {
          bg: "#4e8cff"
        },
        messageList: {
          bg: "#ffffff"
        },
        sentMessage: {
          bg: "#4e8cff",
          text: "#ffffff"
        },
        receivedMessage: {
          bg: "#eaeaea",
          text: "#222222"
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867"
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    };
  },
  methods: {
    initRocket(wss) {
      this.rocket = new RealTimeAPI(wss);
      this.rocket.logining(
        this.user.chat_auth_info.username,
        this.user.chat_auth_info.password
      );
      // this.auth = this.rocket.login(
      //   this.user.chat_auth_info.username,
      //   this.user.chat_auth_info.password
      // );
      // console.log(this.user.chat_auth_info.username)
      // console.log(this.user.chat_auth_info.password)
    },
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent({
          author: "support",
          type: "text",
          data: { text }
        });
      }
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message];
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {
      console.log("Emit typing event");
    },
    editMessage(message) {
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  beforeMount() {
    this.initRocket("wss://chat.edu.chicaga.ru/websocket/");
  }
};
</script>

<style lang="sass">
.chat
  &
    .sc-header
      display: none !important
      border-radius: 0 !important
    .sc-header--close-button
      display: none !important
    .sc-chat-window
      position: absolute !important
      top: 0 !important
      left: 0 !important
      width: 100% !important
      height: 100% !important
      max-height: auto !important
    .sc-message-list
      height: auto !important
      padding: 10px 20px !important
    .sc-message
      width: 100% !important
    .sc-user-input--text
      width: 80% !important
    .sc-message--text-content
      font-size: 16px !important
</style>
