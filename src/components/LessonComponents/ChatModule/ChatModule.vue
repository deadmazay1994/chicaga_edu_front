<template>
  <div class="chat-module" :class="viewMode">
    <web-cam
      :roomId="this.$route.params.room"
      :showChatButton="modeBool"
      :chatState="chatState"
      @clickChat="toggleChat()"
      :class="{ chatActive: chatState }"
    />
    <div class="chat-block" :class="chatSlide">
      <chat />
    </div>
  </div>
</template>

<script>
import WebCam from "@/components/LessonComponents/WebCam/WebCam";
import Chat from "@/components/LessonComponents/Chat/Chat";

export default {
  name: "ChatModule",
  components: { WebCam, Chat },
  data() {
    return {
      chatState: true
    };
  },
  props: {
    id: Number,
    mode: String
  },
  computed: {
    viewMode() {
      return {
        default: this.mode == "default",
        horizontal: this.mode == "horizontal"
      };
    },
    modeBool() {
      return this.mode !== "default";
    },
    chatSlide() {
      return { active: !!this.chatState };
    }
  },
  methods: {
    toggleChat() {
      // let chat = document.querySelector(".chat-block");
      // if (!this.chat) {
      //   document.querySelector(".video-chat").style.width = "70%";
      //   chat.style.width = "30%";
      //   chat.style.opacity = 1;
      // } else {
      //   document.querySelector(".video-chat").style.width = "100%";
      //   document.querySelector(".chat-block").style.width = "0%";
      //   chat.style.opacity = 0;
      // }
      this.chatState = !this.chatState;
    }
  }
};
</script>

<style lang="sass">
.container > .row
  height: 100%
  & > col
    height: 100%

.chat-module
  height: 100%
  .video-chat-miniatures-wrapper
    width: 15% !important

  .lessons__messages
    position: static

  &.default
    display: block
    .video-chat,
    .chat-block
      height: 50%

  &.horizontal
    display: flex

    .video-player-wrap,
    .video-slot
      height: 100%

    .video-chat,
    .vidFrame
      height: 100% !important

    .lessons__messages
      margin-top: 0
      border-radius: 0 20px 20px 0

    .video-chat,
    .chat-block
      height: auto
      transition: .3s ease-in-out

    .video-chat
      width: 100%
      &.chatActive
        width: 70%

    .chat-block
      width: 0%
      opacity: 0
      &.active
        width: 30%
        opacity: 1
</style>
