<template>
  <div class="chat-module" :class="viewMode" ref="chatFrame">
    <web-cam
      :roomId="roomId"
      :showChatButton="modeBool"
      :chatState="chatState"
      @clickChat="toggleChat()"
      @clickExpand="toggleFullScreen"
      :shareMedia="shareMedia"
      :class="{ chatActive: chatState }"
      class="chat-module__web-cam"
    />
    <div class="chat-block" :class="chatSlide">
      <chat class="chat-module__text-chat" :roomId="roomId" />
    </div>
  </div>
</template>

<script>
import WebCam from "@/components/VideoChat";
import Chat from "@/components/Chat/Chat";

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
    mode: String,
    roomId: {
      required: true,
      type: String
    },
    shareMedia: {
      default: true,
      type: Boolean
    }
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
      this.chatState = !this.chatState;
    },
    toggleFullScreen() {
      if (!this.fullscreenOn) {
        let elem = this.$refs.chatFrame;
        this.fullscreenOn = true;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else {
          this.fullscreenOn = false;
        }
      } else {
        document.exitFullscreen();
        this.fullscreenOn = false;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.chat-module
  height: auto
  max-height: 1500px
  &__web-cam
    flex-grow: 1
    height: 50%
  &__text-chat
    color: #000
    font-family: Manrope, sans-serif
    font-weight: 500
    background: #fff
    box-shadow: 0 4px 20px hsl(0deg 0% 50% / 20%)
    border-radius: 20px
    padding: 18px 25px 10px
    font-size: 12px
    max-width: 100%
    height: 100%
    @media (max-width: 1400px)
      max-height: 300px
  &.vertical
    display: flex
    flex-direction: column
    .chat-module__text-chat
      margin-top: 35px

  .video-chat
    min-height: 350px
    .video-chat-miniatures-wrapper
      width: 15% !important

  .chat-block
    height: 50%
    .lessons__messages
      min-height: 350px
      position: static
      @media (max-width: 1360px)
        max-height: 350px


  &.default
    display: block
    .video-chat,
    .chat-block
      flex: 1

  &.horizontal
    display: flex

    .video-player-wrap,
    .video-slot
      height: 100%

    .video-chat,
    .vidFrame

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
        margin-left: 10px

      .lessons__messages
        margin-top: 0
        border-radius: 0 0 20px 20px
        @media (min-width: 1400px)
          border-radius: 0 20px 20px 0

    // в мобильных устройствах и в маленьких экранах
    // отображать в дефолтном виде (вертикальном)
    @media (max-width: 1400px)
      display: block
      .video-chat,
      .chat-block
        flex: 1
      .video-player-wrap,
      .video-slot
        height: auto
      .video-chat,
      .vidFrame
        height: 100% !important
      .lessons__messages
        margin-top: 0
      .video-chat
        height: 50% !important
      .chat-block
        height: 55% !important
      .video-chat
        width: 100%
        &.chatActive
          width: 100%
      .chat-block
        width: 0%
        opacity: 0
        &.active
          width: 100%
          opacity: 1
          margin-left: 0
</style>
