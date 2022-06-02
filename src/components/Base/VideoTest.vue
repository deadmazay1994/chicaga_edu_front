<template>
  <div class="video-test">
    <div
      class="row"
      style="width: 100%; height: 100%; display: flex; justify-content: center"
    >
      <div class="col-md-6 col-sm-12">
        <video-chat
          :roomId="'presonal__' + (Math.random() + 1).toString(36).substring(7)"
          style="height: 100%"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VideoChat from "@/components/VideoChat";

export default {
  name: "VideoTest",
  components: {
    VideoChat
  }
};
</script>

<style lang="sass" scoped>
.video-test
  height: 100%
  width: 100%
</style>
