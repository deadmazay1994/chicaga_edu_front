<template>
  <div class="private-room">
    <div class="private-room--active" v-if="active">
      <!-- Пока передаем roomid через route -->
      <web-cam :roomId="this.$route.params.room" @clickChat="toggleChat()" />
      <div class="chat-block">
        <chat />
      </div>
    </div>
    <div class="private-room--upcoming" v-if="!active">
      <upcoming
        :roomLink="location"
        :room="this.$route.path"
        :roomId="user.id"
        :showComponent="true"
        @ready="onReady()"
      />
    </div>
  </div>
</template>

<script>
import WebCam from "@/components/LessonComponents/WebCam/WebCam";
import Chat from "@/components/LessonComponents/Chat/Chat";
import Upcoming from "@/components/Group/Upcoming";
import { mapGetters } from "vuex";

export default {
  name: "",
  components: {
    WebCam,
    Chat,
    Upcoming
  },
  data() {
    return {
      active: false,
      chat: false
    };
  },
  computed: {
    ...mapGetters(["user"]),
    location() {
      return document.location.href;
    }
  },
  methods: {
    toggleChat() {
      let chat = document.querySelector(".chat-block");
      if (!this.chat) {
        document.querySelector(".video-chat").style.width = "70%";
        chat.style.width = "30%";
        chat.style.opacity = 1;
      } else {
        document.querySelector(".video-chat").style.width = "100%";
        document.querySelector(".chat-block").style.width = "0%";
        chat.style.opacity = 0;
      }
      this.chat = !this.chat;
    },
    onReady() {
      this.active = true;
    }
  }
};
</script>

<style lang="sass" scoped>
.private-room
  position: absolute
  height: 100%
  width:100%
  top: 0
  left: 0

.private-room--active
  position: absolute
  height: 100%
  width: 100%

  .video-chat
    width: 100%
    transition: .3s ease-in-out
    .video
      height: 100%
      .video-player-wrap
        height: 100% !important
  .chat-block
    height: 100%
    position: absolute
    width: 0%
    opacity: 0
    top: 0
    right: 0
    transition: .3s ease-in-out
</style>

<style lang="sass">
.main-view
  position: relative

.private-room--active
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
        // height: auto !important

      .video-chat
        // height: 450px !important
      .chat-block
        position: static
</style>
