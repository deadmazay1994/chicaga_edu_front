<template>
  <div class="record vue-component">
    <video-player :active="true" ref="videoPlayer" :timestamps="timecodesComputed">
      <template slot="videoSlot">
        <video ref="video" @click="$emit('click-by-video')" :src="src"></video>
      </template>
    </video-player>
    <div class="record__bottom bottom">
      <timecodes
        class="bottom__timecodes"
        @clickTimecode="clickTimecode"
        :timecodes="timecodesComputed"
      />
      <evaluation class="bottom__evaluation" />
      <div class="bottom__text-review text-review">
        <textarea-c
          class="text-review__textarea"
          placeholder="Оставьте отзыв к уроку"
        />
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
    "textarea-c": Textarea
  },
  data: function() {
    return {
      duration: undefined
    };
  },
  props: {
    src: {
      type: String,
      required: true
    },
    timecodes: {
      type: Array,
      required: false,
      default: () => {({})}
    }
  },
  computed: {
    timecodesComputed() {
      return [
        ...this.timecodes,
        { title: "Заключение", time: this.duration },
      ]
    }
  },
  methods: {
    clickTimecode(time) {
      this.$refs.videoPlayer.clickTimecode(time);
    },
  },
  mounted() {
    this.$refs.video.addEventListener("loadedmetadata", event => {
      this.duration = event.target.duration;
      this.setTimestaps();
    });
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
