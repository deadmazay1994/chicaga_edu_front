<template>
  <div
    class="video-component vue-component justify-center align-start rounded"
    :class="{ 'video-component--active': active }"
  >
    <video
      v-show="!mediaObject.videoOff"
      ref="video"
      :muted="muted.val"
      class="video-component__video"
    ></video>
    <img
      v-if="mediaObject.videoOff"
      style="display: block; width: 100px; height: auto"
      :src="mediaObject.avatar"
      class="video-component__avatar"
    />
    <div class="video-component__name">{{ mediaObject.name }}</div>
    <div class="video-component__ctrls">
      <expand
        @click.native="toggleFullSize"
        class="video-component__expand video-component__ctrls-btn"
      />
      <speaker
        @click.native="toggleMuting"
        class="video-component__speaker video-component__ctrls-btn"
        :muted="muted.state"
        v-if="!mediaObject.im"
      />
      <template v-if="mediaObject.im">
        <camera
          @click.native="toggleCamera"
          class="video-component__camera video-component__ctrls-btn"
          :cameraOff="mediaObject.videoOff"
        />
        <mute-micro
          @click.native="toggleMicro"
          class="video-component__mute-micro video-component__ctrls-btn"
          :muted="mediaObject.audioOff"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Expand from "@/components/Icons/Expand.vue";
import Speaker from "@/components/Icons/Speaker.vue";
import MuteMicro from "@/components/Icons/Mute.vue";
import Camera from "@/components/Icons/Camera.vue";

export default {
  name: "video-component",
  data: function() {
    return {
      muted: {
        state: false,
        val: ""
      },
      mutedMicro: false
    };
  },
  methods: {
    toggleFullSize() {
      this.$emit("toggleFullSize", this.indexVideo);
    },
    toggleMuting() {
      this.muted.state = !this.muted.state;
      if (this.muted.state) {
        this.muted.val = "muted";
      } else {
        this.muted.val = "";
      }
    },
    mutingMe() {
      if (this.mediaObject.im) {
        this.muted.val = "muted";
      }
    },
    toggleCamera() {
      this.mediaObject.videoOff = !this.mediaObject.videoOff;
      this.$emit("toggleCamera", this.mediaObject.videoOff);
    },
    toggleMicro() {
      this.mediaObject.audioOff = !this.mediaObject.audioOff;
      this.$emit("toggleMicro", this.mediaObject.audioOff);
    },
    setStream(stream = this.mediaObject.stream) {
      let video = this.$refs.video;
      if ("srcObject" in video) {
        video.srcObject = stream;
      } else {
        video.src = window.URL.createObjectURL(stream); // for older browsers
      }
      video.play();
    },
    videoOff() {
      // if (this.mediaObject.videoOff) {
      //   this.$refs.video.pause();
      //   this.setStream(null);
      //   console.log(1);
      // } else {
      //   this.setStream();
      //   this.$refs.video.play();
      //   console.log(2);
      // }
    },
    audioOff() {
      if (!this.mediaObject.im) {
        if (this.mediaObject.audioOff) {
          this.muted.val = "muted";
        } else {
          this.muted.val = "";
        }
      }
    }
  },
  computed: {},
  watch: {
    "mediaObject.videoOff": function() {
      this.videoOff();
    },
    "mediaObject.audioOff": function() {
      this.audioOff();
    },
    "mediaObject.id": function() {
      this.setStream();
    }
  },
  components: {
    Expand,
    Speaker,
    MuteMicro,
    Camera
  },
  props: ["mediaObject", "indexVideo", "active"],
  mixins: {},
  beforeMount() {},
  mounted() {
    this.setStream();
    this.mutingMe();
    this.videoOff();
    this.audioOff();
  }
};
</script>

<style lang="sass" scoped>
.video-component
  position: relative
  z-index: 2
  display: flex
  &__video
    display: block
    width: 100%
  &__avatar
    max-width: 100%
    display: block
    max-height: 100%
  &__name
    position: absolute
    left: 0
    bottom: 0
    background: #0005
    padding: 5px 15px
    color: #fff
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
    width: 17px
    height: 18px
    cursor: pointer
    color: #fff
  &__speaker
    width: 15px
    color: #fff
    cursor: pointer
  &__mute-micro
    width: 20px
    transform: scale(-1, 1)
  &__camera
    width: 20px
  &__ctrls-btn
    margin: 0 5px
    cursor: pointer
    display: flex
    align-items: center
.video-component--active
  z-index: 1
  margin: 0
  width: 100%
  height: 100%
  .video-component__name
    font-size: 21px
  .video-component__video
    display: block
    width: 100%
    max-height: 100%
  .video-component__expand
    display: none
  .video-component__speaker
    width: 25px
  .video-component__mute-micro
    width: 25px
  .video-component__camera
    width: 25px
</style>
