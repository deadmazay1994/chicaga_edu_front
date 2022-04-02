<template>
  <div class="private-room">
    <web-cam :roomId="this.$route.params.id" @clickChat="toggleChat()" />
    <div class="chat-block">
      <chat />
    </div>
  </div>
</template>

<script>
import WebCam from "@/components/LessonComponents/WebCam/WebCam";
import Chat from "@/components/LessonComponents/Chat/Chat";

export default {
  name: "",
  components: {
    WebCam,
    Chat
  },
  data() {
    return {
      chat: false
    };
  },
  methods: {
    toggleChat() {
      if (!this.chat) {
        document.querySelector(".video-chat").style.width = "80%";
        document.querySelector(".chat-block").style.width = "20%";
      } else {
        document.querySelector(".video-chat").style.width = "100%";
        document.querySelector(".chat-block").style.width = "0%";
      }
      this.chat = !this.chat;
    }
  }
};
</script>

<style lang="sass" scoped>
.private-room
  position: fixed
  height: 100%
  width: 100%
  top: 0
  left: 0

  .video-chat
    width: 100%
    transition: .3s ease-in-out
    .video
      height: 100%
      .video-player-wrap
        height: 100% !important
  .chat-block
    height: 100%
    position: fixed
    width: 0%
    top: 0
    right: 0
    transition: .3s ease-in-out
</style>

<style lang="sass">
.private-room
  .video-player-wrap,
  .video-slot
    height: 100%

  .video-chat,
  .vidFrame
    height: 100% !important

  .video-chat-miniatures-wrapper
    width: 15% !important

  .lessons__messages
    margin-top: 0

  .messages__content
    height: 100%

  @media (max-width: 1460px)
    &
      position: static
      display: flex

      .video-player-wrap,
      .video-slot,
      .vidFrame
        height: auto !important

      .video-chat
        height: 450px !important
      .chat-block
        position: static
</style>
