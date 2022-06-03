<template>
  <div class="stand vue-component">
    <!-- <div class="video-block"> -->
    <video-player :active="true">
      <div slot="videoSlot" class="videoSlot-block">
        <video
          ref="video"
          class="video-component__video"
          @click="$emit('click-by-video')"
          src="https://chicaga-media.storage.yandexcloud.net/videos/example_lesson.mp4"
        ></video>
      </div>
    </video-player>
    <!-- </div> -->
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer";

export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    VideoPlayer
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.video-block
  position: relative
  height: 368px
  width: 617px
</style>
