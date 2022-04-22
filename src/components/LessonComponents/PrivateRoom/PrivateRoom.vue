<template>
  <chat-module
    v-if="$route.params.room"
    :roomId="$route.params.room"
    :mode="'horizontal'"
  />
</template>

<script>
import ChatModule from "@/components/LessonComponents/ChatModule/ChatModule";

export default {
  name: "PrivateRoom",
  components: {
    ChatModule
  },
  data() {
    return {
      chat: false
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="sass" scoped>
.private-room
  height: 100%
  width:100%
  &__chats
    height: 100%

.private-room--active
  height: 100%
  width: 100%
</style>
