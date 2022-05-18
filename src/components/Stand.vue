<template>
  <div class="stand vue-component">
    <div class="video">
      <video-player
        ref="videoPlayer"
        :video="videoElement"
        :active="true"
        @rewind="rewind"
        :fullTime="120"
      >
        <div slot="videoSlot" class="videoSlot-block">
          <video
            @timeupdate="onTimeUpdateListener"
            ref="video"
            autoplay
            class="video-component__video"
            @click="$emit('click-by-video')"
            src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
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
      currentTime_: 0,
      videoElement: undefined
    };
  },
  methods: {
    rewind(time) {
      this.$refs.video.pause();
      this.$refs.video.currentTime = time;
      this.$refs.video.play();
    },
    onTimeUpdateListener() {
      this.$refs.videoPlayer.onTimeUpdate(this.$refs.video.currentTime);
    }
  },
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
