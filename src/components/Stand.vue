<template>
  <div class="stand vue-component">
    <div class="video-block">
      <video-player :active="true" ref="videoPlayer" :timestamps="timestamps">
        <template slot="videoSlot">
          <video
            ref="video"
            class="record__video"
            @click="$emit('click-by-video')"
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          ></video>
        </template>
      </video-player>
    </div>
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
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.video-block
  width: 50%
</style>
