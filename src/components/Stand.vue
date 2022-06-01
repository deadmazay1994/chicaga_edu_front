<template>
  <div class="stand vue-component">
    <div class="video">
      <video-player :active="true">
        <div slot="videoSlot" class="videoSlot-block">
          <video
            ref="video"
            autoplay
            muted
            class="video-component__video"
            @click="$emit('click-by-video')"
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          ></video>
        </div>
      </video-player>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer";

export default {
  name: "stand",
  data: function() {
    return {
      clicks: 0,
      timer: null,
      result: [],
      counter: 0
    };
  },
  methods: {},
  components: {
    VideoPlayer
  },
  props: [],
  mixins: {}
};
</script>

<style scoped="scoped" lang="sass">
.video
  flex-basis: 50%
</style>
