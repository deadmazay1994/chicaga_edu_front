<template>
  <div class="private-room">
    <web-cam :roomId="this.$route.params.id" />
  </div>
</template>

<script>
import WebCam from "@/components/LessonComponents/WebCam/WebCam";
// import Chat from "@/components/LessonComponents/Chat/Chat";

export default {
  name: "",
  components: {
    WebCam
    // Chat
  }
};
</script>

<style lang="sass" scoped>
.private-room
  display: block
  .bottom
    position: relative
</style>
