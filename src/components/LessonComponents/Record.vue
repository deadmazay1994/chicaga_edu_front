<template>
  <div class="record vue-component">
    <video-player :active="true" ref="videoPlayer">
      <div slot="videoSlot">
        <video
          ref="video"
          class="record__video"
          @click="$emit('click-by-video')"
          src="https://chicaga-media.storage.yandexcloud.net/videos/example_lesson.mp4"
        ></video>
      </div>
    </video-player>
    <div class="record__bottom bottom">
      <timecodes class="bottom__timecodes" @clickTimecode="clickTimecode" />
      <evaluation class="bottom__evaluation" />
      <div class="bottom__text-review text-review">
        <textarea-c class="text-review__textarea" placeholder="Оставьте отзыв к уроку" />
        <svg class="text-review__icon">
          <use xlink:href="#forward"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer";
import Timecodes from "@/components/VideoPlayer/Timecodes.vue";
import Evaluation from "@/components/LessonComponents/Evaluation";
import Textarea from "@/components/UiElements/InlineTextarea";

export default {
  name: "record",
  components: {
    VideoPlayer,
    Timecodes,
    Evaluation,
    'textarea-c': Textarea
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
.record
  display: flex
  flex-direction: column
  &__bottom
    padding: 0 24px
    margin-top: 20px
    display: flex
    flex-direction: column
    justify-content: space-between
    flex-grow: 1
    overflow-y: auto
.bottom
  &__timecodes
    margin-bottom: 40px
  &__evaluation
    margin-bottom: 24px
.text-review
  display: flex
  align-items: center
  justify-content: space-between
  &__textarea
    width: 90%
  &__icon
    width: 24px
    height: 24px
</style>
