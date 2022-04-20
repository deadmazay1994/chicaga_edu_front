<template>
  <div class="chat-module" :class="viewMode">
    <web-cam
      :roomId="roomId"
      :showChatButton="modeBool"
      :chatState="chatState"
      @clickChat="toggleChat()"
      :class="{ chatActive: chatState }"
    />
    <div class="chat-block" :class="chatSlide">
      <chat :roomId="roomId" />
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
    mode: String,
    roomId: {
      required: true,
      type: String
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
    }
  }
};
</script>

<style lang="sass">
.main-view
  height: calc(100% - 56px - 20px)
  & > .container
    height: 100%

  .container > .row
    height: 100%
    & > col
      height: 100%

.lessons-pg
  height: auto
  .chat-svg
    display: none
  .chat-module
    .chat-block
      height: calc( 50% - 30px )
      .lessons__messages
        height: 100%
    @media (max-width: 1360px)
      .video-chat
        min-height: 450px
      .chat-block
        .lessons__messages
          min-height: 300px

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
      flex: 1

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
      border-radius: 0 0 20px 20px
      @media (min-width: 1400px)
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

@media (max-width: 1400px)
  .chat-module.horizontal
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
</style>
