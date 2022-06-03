<template>
  <div class="lesson-left-side-component vue-component">
    <video-player :active="true" ref="videoPlayer">
      <div slot="videoSlot" class="videoSlot-block">
        <video
          ref="video"
          class="video-component__video"
          @click="$emit('click-by-video')"
          src="https://chicaga-media.storage.yandexcloud.net/videos/example_lesson.mp4"
        ></video>
      </div>
    </video-player>
    <div class="lesson-left-side-component__bottom">
      <timecodes @clickTimecode="clickTimecode" />
      <evaluation />
      <Textarea />
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer";
import Timecodes from "@/components/VideoPlayer/Timecodes.vue";
import Evaluation from "@/components/LessonComponents/Evaluation";
import Textarea from "@/components/Chat/Textarea";

export default {
  name: "lesson-left-side-component",
  components: {
    VideoPlayer,
    Timecodes,
    Evaluation,
    Textarea
  },
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {
    clickTimecode(time) {
      this.$refs.videoPlayer.clickTimecode(time);
    }
  }
};
</script>

<style scoped="scoped" lang="sass">
.lesson-left-side-component
  display: flex
  flex-direction: column
  .lesson-left-side-component__bottom
    margin-top: 30px
    display: flex
    flex-direction: column
    justify-content: space-between
    flex-grow: 1
    overflow-y: auto
</style>
