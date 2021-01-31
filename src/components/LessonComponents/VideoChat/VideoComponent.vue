<template>
  <div
    class="video-component vue-component justify-center align-start rounded"
    :class="{
      'video-component--active': active,
      'video-component--video-off': mediaObject.videoOff,
      'video-component--miniature': !active
    }"
    :style="{ ...backgroundComputed, ...borderComputed }"
  >
    <video
      ref="video"
      v-show="!mediaObject.videoOff && !videoHidden"
      autoplay
      class="video-component__video"
    ></video>
    <img
      v-if="mediaObject.videoOff || videoHidden"
      :src="mediaObject.avatar"
      class="video-component__avatar"
    />
    <div
      class="video-component__name"
      :class="{ 'video-component__name--miniature': !active }"
    >
      {{ mediaObject.name }}
    </div>
    <div class="video-component__ctrls">
      <expand
        @click.native="toggleFullSize"
        class="video-component__expand video-component__ctrls-btn"
        v-if="!active"
      />
      <expand
        v-else
        @click.native="toggleFullSizeVideoInWindow"
        class="video-component__expand video-component__ctrls-btn"
      />
      <!--       <speaker
        @click.native="toggleMuting"
        class="video-component__speaker video-component__ctrls-btn"
        :muted="muted.state"
        v-if="!mediaObject.im"
      /> -->
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
        <reflect
          @click.native="toggleScreenAndCapture()"
          class="video-component__reflect video-component__ctrls-btn"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Expand from "@/components/Icons/Expand.vue";
// import Speaker from "@/components/Icons/Speaker.vue";
import MuteMicro from "@/components/Icons/Mute.vue";
import Camera from "@/components/Icons/Camera.vue";
import Reflect from "@/components/Icons/Reflect.vue";

import { mapActions, mapGetters, mapMutations } from "vuex";
import Hark from "hark";

export default {
  name: "video-component",
  data: function() {
    return {
      muted: {
        state: false,
        val: ""
      },
      background: "/imgs/whitenoize.gif",
      videoHidden: true,
      borderColor: ""
    };
  },
  methods: {
    ...mapActions([
      "setCapture",
      "toggleCaptureAndCameraAction",
      "toggleMediaTrackPC"
    ]),
    ...mapMutations(["setmyCaptureMedia"]),
    toggleFullSize() {
      this.$emit("toggleFullSize", this.indexVideo);
    },
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
      window.localStorage.setItem(
        "videochat_camera_state",
        this.mediaObject.videoOff
      );
      this.toggleMediaTrackPC({
        mediaType: "video",
        value: this.mediaObject.videoOff
      });
    },
    toggleMicro() {
      this.mediaObject.audioOff = !this.mediaObject.audioOff;
      window.localStorage.setItem(
        "videochat_microphone_state",
        this.mediaObject.audioOff
      );
      this.toggleMediaTrackPC({
        mediaType: "audio",
        value: this.mediaObject.audioOff
      });
    },
    setStream(stream = this.mediaObject.stream) {
      let video = this.$refs.video;
      let isNotMobileSafari = () => {
        let userAgent = window.navigator.userAgent;
        return !userAgent.match(/iPad/i) && !userAgent.match(/iPhone/i);
      };
      if (isNotMobileSafari()) {
        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          this.alertError(`srcObject is undefined`);
          video.src = window.URL.createObjectURL(stream); // for older browsers
        }
      } else {
        // Hacks for Mobile Safari
        video.setAttribute("playsinline", true);
        video.setAttribute("controls", true);
        setTimeout(() => {
          video.removeAttribute("controls");
        });
        this.alertError(`detected mobile safari`);
      }
      video.play();
    },
    async initSpechEvents() {
      let stream;
      if (this.mediaObject.im) {
        // Получаем независый трек
        let getIndependedAudioStream = async () => {
          let audio = false;
          try {
            audio = await navigator.mediaDevices.getUserMedia({
              audio: true
            });
          } catch (e) {
            console.log(e);
          }
          return audio;
        };
        stream = await getIndependedAudioStream();
      } else {
        stream = this.mediaObject.stream;
      }
      let speechEvents = Hark(stream, {
        interval: 10
      });
      speechEvents.on("speaking", this.onSpeeking);
      speechEvents.on("stopped_speaking", this.onStopSpeeking);
    },
    onSpeeking() {
      let setBorderColor = () => {
        let myAudioEnabled = !this.mediaObject.audioOff;
        let itsNotIm = !this.mediaObject.im;
        if (itsNotIm || myAudioEnabled) {
          this.borderColor = this.mediaObject.color
            ? this.mediaObject.color
            : "#c4ac7e";
        }
      };
      setBorderColor();

      // Включает звук, когда уровень громкости становится достаточным
      // Позволяет фильтровать тихие шумы
      let unMuteByAudioLevel = () => {
        // Включение только своего трека при условии, что пользовтель себя не замьютил
        let myAudioEnabled = !this.mediaObject.audioOff;
        if (this.mediaObject.im && myAudioEnabled) {
          this.toggleMediaTrackPC({ mediaType: "audio", value: false });
        }
      };
      unMuteByAudioLevel();
    },
    onStopSpeeking() {
      this.borderColor = "";

      // Выключает звук, когда уровень громкости становится достаточно малым
      // Позволяет фильтровать тихие шумы
      let muteByAudioLevel = () => {
        this.toggleMediaTrackPC({ mediaType: "audio", value: true });
      };
      if (this.mediaObject.im) {
        muteByAudioLevel();
      }
    },
    audioOff() {
      if (!this.mediaObject.im) {
        if (this.mediaObject.audioOff) {
          this.muted.val = "muted";
        } else {
          this.muted.val = "";
        }
      }
    },
    async toggleScreenAndCapture() {
      let activateVideo = () => {
        if (this.mediaObject.videoOff) {
          this.toggleCamera();
        }
      };
      if (this.myCaptureMedia === null) {
        await this.setCapture();
        activateVideo();
      } else {
        activateVideo();
      }
      this.toggleCaptureAndCameraAction();
    },
    initMyVideoStates() {
      if (this.mediaObject.im) {
        let videoState =
          window.localStorage.getItem("videochat_camera_state") == "true";
        let audioState =
          window.localStorage.getItem("videochat_microphone_state") == "true";
        if (videoState) {
          this.mediaObject.videoOff = videoState;
          this.toggleMediaTrackPC({ mediaType: "video", value: videoState });
        }
        if (audioState) {
          this.mediaObject.audioOff = audioState;
          this.toggleMediaTrackPC({ mediaType: "audio", value: audioState });
        }
      }
    },
    onCanPlay() {
      this.$refs.video.addEventListener("canplay", () => {
        this.background = this.mediaObject.avatar || "/imgs/whitenoize.gif";
        this.videoHidden = false;
      });
    }
  },
  computed: {
    ...mapGetters(["myCaptureMedia", "myActiveMediaName", "myWebcamMedia"]),
    ...mapGetters({ audioOffGetter: "audioOff" }),
    backgroundComputed() {
      return { "background-image": "url(" + this.background + ")" };
    },
    borderComputed() {
      // Border color изменяется при замолкании и говорении пользовтеля
      return {
        "border-color": this.borderColor
      };
    }
  },
  watch: {
    "mediaObject.audioOff": function() {
      this.audioOff();
    },
    "mediaObject.id": function() {
      this.setStream();
    },
    myActiveMediaName: function() {
      if (this.mediaObject.im) {
        this.setStream();
      }
    }
  },
  components: {
    Expand,
    // Speaker,
    MuteMicro,
    Camera,
    Reflect
  },
  props: ["mediaObject", "indexVideo", "active"],
  mixins: {},
  beforeMount() {},
  mounted() {
    this.setStream();
    this.initSpechEvents();
    this.onStopSpeeking();
    this.mutingMe();
    this.audioOff();
    this.onCanPlay();
    this.initMyVideoStates();
  }
};
</script>

<style lang="sass" scoped>
.video-component
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
    display: block
    width: 100%
  &__avatar
    max-width: 100%
    max-height: 100%
    border-radius: 100%
    z-index: 2
    display: block
    width: 100px
    height: auto
    padding: 10px 0
  &__name
    position: absolute
    left: 0
    bottom: 0
    background: #0005
    padding: 5px 15px
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
    width: 18px
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
  &__reflect
    width: 23px
  &__ctrls-btn
    margin: 0 5px
    cursor: pointer
    display: flex
    align-items: center
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
    .video-component__video
      display: block
      width: 100%
      max-height: 100%
    .video-component__speaker
      width: 25px
    .video-component__mute-micro
      width: 25px
    .video-component__camera
      width: 25px
</style>
