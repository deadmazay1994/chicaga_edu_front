<template>
  <div class="stand vue-component">
    <div class="video">
      <video-player
        ref="videoPlayer"
        :video="videoElement"
        :active="true"
        @rewind="rewind"
        :fullTime="fullTime"
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
      fullTime: null,
      videoElement: undefined
    };
  },
  methods: {
    rewind(time) {
      this.$refs.video.pause();
      this.currentTime = time;
      this.$refs.video.play();
    },
    onTimeUpdateListener() {
      this.$refs.videoPlayer.onTimeUpdate(this.$refs.video.currentTime);
    }
  },
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
  position: relative
  z-index: 2
  display: flex
  background-size: 120%
  overflow: hidden
  height: auto
  background-position: center
  display: flex
  flex-wrap: wrap
  align-items: center !important
  border: 3px solid
  &:before
    display: block
    position: absolute
    top: 0
    left: 0
    content: ""
    background: #0006
    width: 100%
    height: 100%
  & *
    z-index: 2
  &__video
    height: inherit
    cursor: pointer
    transform: rotateY(0) !important
    &--mirror
      transform: rotateY(180deg) !important
  &__avatar
    max-width: 100%
    max-height: 100%
    border-radius: 100%
    z-index: 2
    display: block
    height: auto
    padding: 10px 0
  &__name
    position: absolute
    left: 0
    bottom: 0
    background: #0005
    padding: 3px 10px
    margin: 5px
    color: #fff
    &--miniature
      padding: 2px
      font-size: 14px
  &__ctrls
    position: absolute
    right: 0
    top: 0
    background: #0005
    padding: 5px
    align-items: center
    display: flex
    flex-direction: row-reverse
  & *
    color: #fff
  &__expand
    width: 22px
    cursor: pointer
    color: #fff
  &__speaker
    width: 15px
    color: #fff
    cursor: pointer
  &__mute-micro
    width: 20px
  &__camera
    width: 20px
  &__reflect
    width: 23px
  &__ctrls-btn
    margin: 0 5px
    cursor: pointer
    display: flex
    align-items: center
  &__ctrls-active
    left: 0 !important
    top: 30%
    flex-direction: column-reverse !important
    justify-content: center !important
    width: fit-content
    height: fit-content
    gap: 15px

  &--active
    z-index: 1
    margin: 0
    width: 100%
    height: 100%
    display: flex
    align-items: center !important
    .video-component__avatar
      width: 150px
    .video-component__name
      font-size: 21px
      top: 0
      bottom: auto
    .video-component__video
      display: block
      margin: 0 auto
      max-width: 100%
      max-height: 100%
    .video-component__speaker
      width: 25px
    .video-component__mute-micro
      width: 25px
    .video-component__camera
      width: 25px
  .video-component__ctrls
    .icon
      display: flex
      align-items: center
      justify-content: center
      position: relative
      height: 25px
      width: 25px
video
  width: 100%
  height: 100%
</style>
