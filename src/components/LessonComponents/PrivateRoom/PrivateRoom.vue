<template>
  <div class="private-room">
    <div class="private-room--active" v-if="active">
      <chat-module
        v-if="$route.params.room"
        :roomId="$route.params.room"
        :mode="'horizontal'"
      />
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
import Upcoming from "@/components/Group/Upcoming";
import ChatModule from "@/components/LessonComponents/ChatModule/ChatModule";

import { mapGetters } from "vuex";

export default {
  name: "PrivateRoom",
  components: {
    Upcoming,
    ChatModule
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
  height: 100%
  width:100%

.private-room--active
  height: 100%
  width: 100%
</style>
