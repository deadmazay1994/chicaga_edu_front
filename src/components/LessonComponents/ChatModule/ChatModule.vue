<template>
  <div class="chat-module">
    <web-cam />
    <chat />
  </div>
</template>

<script>
import WebCam from "@/components/LessonComponents/WebCam/WebCam";
import Chat from "@/components/LessonComponents/Chat/Chat";

export default {
  name: "ChatModule",
  components: { WebCam, Chat },
  data() {
    return {};
  },
  props: {
    id: Number,
    mode: String
  }
};
</script>

<style lang="sass" scoped>
.chat-module
  display: flex
  flex-direction: column
</style>
