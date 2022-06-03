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
.video
  height: 368px
  width: 617px
  position: relative
</style>
