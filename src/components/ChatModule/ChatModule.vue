<template>
  <div class="chat-module" :class="viewMode" ref="chatFrame">
    <div class="chat-module__video-box">
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
    </div>
    <div class="chat-module__side" :class="chatSlide">
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
  display: flex
  width: 100%
  height: 100%
  padding: 16px 20px 20px
  &__video-box
    width: 100%
    height: 100%
    transition-property: width
    transition-duration: 0.3s
    transition-timing-function: ease-in-out
  &__web-cam
    width: 100%
    height: 100%
  &__side
    width: 0
    height: 100%
    opacity: 0
    transition-property: width, padding-left, opacity
    transition-duration: 0.3s
    transition-timing-function: ease-in-out
  &__side.active
    width: 50%
    max-width: 385px
    padding-left: 10px
    opacity: 1
  &__text-chat
    max-width: 100%
    height: 100%
    min-height: 100%
    font-weight: 500
    font-size: 12px
    padding: 18px 25px 10px
    background-color: #ffffff
    border-radius: 20px
    box-shadow: 0 4px 20px hsl(0deg 0% 50% / 20%)
    overflow: hidden
</style>
