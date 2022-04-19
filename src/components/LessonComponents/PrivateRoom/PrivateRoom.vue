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

<style lang="sass" scoped></style>
