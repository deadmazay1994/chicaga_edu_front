<template>
  <div
    class="video-component vue-component justify-center align-center"
    :class="{
      'video-component--active': active,
      'video-component--video-off': mediaObject.videoOff,
      'video-component--miniature': !active
    }"
    :style="{ ...backgroundComputed, ...borderComputed }"
  >
    <div style="height: inherit; display: flex; align-items: center;">
      <video-player
        :video="this.$refs.video"
        :active="active"
        :showChatButton="showChatButton"
        :chatState="chatState"
        @clickChat="$emit('clickChat')"
        @clickExpand="$emit('clickExpand')"
      >
        <div slot="videoSlot" class="videoSlot-block" style="height: 100%;">
          <video
            ref="video"
            v-show="mediaObject.userInfo.videoActive"
            autoplay
            :muted="muted"
            class="video-component__video"
            :class="mirrorClass"
            @click="$emit('click-by-video')"
          ></video>
        </div>
      </video-player>
    </div>
    <img
      v-if="!mediaObject.userInfo.videoActive"
      :src="mediaObject.userInfo.avatar"
      class="video-component__avatar"
    />
    <div
      class="video-component__name"
      :class="{ 'video-component__name--miniature': !active }"
    >
      {{ mediaObject.userInfo.name }}
    </div>
    <div
      class="video-component__ctrls"
      :class="{ 'video-component__ctrls-active': active }"
    >
      <expand
        @click.native="toggleFullSizeVideoInWindow"
        class="video-component__expand video-component__ctrls-btn"
      />
      <template v-if="!iconOff">
        <camera
          @click.native="toggleCamera()"
          class="video-component__camera video-component__ctrls-btn"
          :cameraOff="!mediaObject.userInfo.videoActive"
        />
        <mute-micro
          @click.native="toggleMicro()"
          class="video-component__mute-micro video-component__ctrls-btn"
          :muted="!mediaObject.userInfo.audioActive"
        />
        <reflect
          @click.native="toggleScreenAndCapture()"
          :reflected="mediaObject.userInfo.screenActive"
          class="video-component__reflect video-component__ctrls-btn"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Expand from "@/components/Icons/Expand.vue";
import MuteMicro from "@/components/Icons/Mute.vue";
import Camera from "@/components/Icons/Camera.vue";
import Reflect from "@/components/Icons/Reflect.vue";
import VideoPlayer from "@/components/VideoPlayer";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "video-component",
  data: function() {
    return {
      background: "/imgs/whitenoize.gif",
      videoHidden: true,
      borderColor: "",
      audioMuted: null,
      cameraOff: null
    };
  },
  methods: {
    ...mapMutations(["setmyCaptureMedia"]),
    toggleFullSizeVideoInWindow() {
      let elem = this.$refs.video;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    },
    toggleCamera() {
      window.localStorage.setItem("videochat_camera_state", this.cameraOff);
      this.cameraOff = !this.cameraOff;
      this.$parent.$emit("toggleCamera", this.cameraOff);
    },
    toggleMicro() {
      window.localStorage.setItem(
        "videochat_microphone_state",
        this.audioMuted
      );
      this.audioMuted = !this.audioMuted;
      this.$parent.$emit("toggleMicro", this.audioMuted);
    },
    setStream(stream = this.mediaObject.stream) {
      stream.addVideoElement(this.$refs.video);
    },
    toggleScreenAndCapture() {
      if (this.mediaObject.userInfo.screenActive)
        return this.$parent.$emit("publishWebcam");
      this.$parent.$emit("publishScreen");
    },
    onCanPlay() {
      this.$refs.video.addEventListener("canplay", () => {
        this.background =
          this.mediaObject.userInfo.avatar || "/imgs/whitenoize.gif";
        this.videoHidden = false;
      });
    },
    playVideo() {
      if (this.$refs.video.paused) {
        this.$refs.video.play().catch(() => {
          this.$store.commit("pushShuckbar", {
            success: false,
            val: "Чтобы начать просмотр, нажмите на кнопку 'Play'"
          });
        });
      }
    }
  },
  computed: {
    ...mapGetters(["myCaptureMedia", "myActiveMediaName", "myWebcamMedia"]),
    ...mapGetters({ audioOffGetter: "audioOff" }),
    backgroundComputed() {
      return {
        "background-image": "url(" + this.mediaObject?.userInfo?.avatar + ")"
      };
    },
    borderComputed() {
      // Border color изменяется при замолкании и говорении пользовтеля
      return {
        "border-color": this.borderColor
      };
    },
    muted() {
      return this.itsMe;
    },
    iconOff() {
      return !this.itsMe;
    },
    mirrorClass() {
      let screenIsNotActive = !this.mediaObject.userInfo.screenActive;
      if (screenIsNotActive && this.itsMe)
        return "video-component__video--mirror";
      return "";
    }
  },
  watch: {
    mediaObject: function() {
      this.setStream();
    }
  },
  components: {
    Expand,
    MuteMicro,
    Camera,
    Reflect,
    VideoPlayer
  },
  props: {
    mediaObject: Object,
    indexVideo: Number,
    active: Boolean,
    itsMe: Boolean,
    showChatButton: Boolean,
    chatState: Boolean
  },
  mixins: {},
  beforeMount() {},
  mounted() {
    this.setStream();
    this.onCanPlay();
    this.cameraOff = !JSON.parse(
      window.localStorage.getItem("videochat_camera_state")
    );
    this.audioMuted = !JSON.parse(
      window.localStorage.getItem("videochat_microphone_state")
    );
    if (this.autoplayOn) this.playVideo();
  }
};
</script>

<style lang="sass" scoped>
.video-component
  position: relative
  display: flex
  align-items: center
  justify-content: center
  flex-wrap: wrap
  height: auto
  overflow: hidden
  background-size: 120%
  background-position: center
  border-radius: 20px
  z-index: 2
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
      // position: absolute
      // max-width: 100%
      // max-height: 100%
      // min-width: 50%
      // min-height: 50%
      // top: 50%
      // left: 50%
      // transform: translate(-50%, -50%) rotateY(180deg) !important
      // z-index: -1
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
</style>
