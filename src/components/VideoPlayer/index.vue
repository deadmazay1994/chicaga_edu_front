<template>
  <div class="video-player-wrap" @click="playOrPauseVideo($event)">
    <div class="video-slot">
      <figure
        class="vidFrame"
        ref="vidFrame"
        :class="{ chatActive: fullscreenChatState }"
      >
        <slot name="videoSlot" class="fullscreen-video-block"></slot>
        <chat :roomId="roomId" ref="chat" v-if="fullscreenOn" />
        <transition name="fade" class="play-button-transition" tag="div">
          <PlayVideoCenterVue v-if="videoJustPlayed" />
          <PauseVideoCenterVue v-if="videoJustPaused" />
        </transition>
      </figure>
    </div>
    <substrate :player-element="$el" style="z-index: 2" :duration="1000">
      <figcaption class="vidBar" v-if="active">
        <div class="top">
          <Progress
            @rewindTo="rewindTo"
            ref="progress"
            :currentTime="currentTime"
            :duration="duration"
            :timestamps="timestamps"
          />
        </div>
        <div class="bottom">
          <div class="left-side">
            <play-svg :onPause="paused" @clickElem="togglePlay" />
            <div
              class="volume-area"
              @mouseenter="showVolume"
              @mouseleave="hideVolume"
            >
              <sound-svg :muted="muteVolume" @clickElem="toggleVolume" />
              <div class="volume-input-block">
                <transition name="emersion">
                  <input
                    ref="volumeControl"
                    v-show="volume"
                    type="range"
                    id="change_vol"
                    v-model="changeVol"
                    step="0.05"
                    min="0"
                    max="1"
                    value="1"
                  />
                </transition>
              </div>
            </div>
            <div class="left-side__current-timestamp">
              {{ сurrentTitle }}
            </div>
            <div class="left-side__current-time">
              {{ currVideoTime }}
              <template v-if="formattedDuration">
                / {{ formattedDuration }}</template
              >
            </div>
          </div>
          <div class="right-side">
            <chat-svg
              v-if="showChatButton"
              :chatOff="chatState"
              :fullscreenChatState="fullscreenChatState"
              :fullScreenMode="fullscreenOn"
              @clickElem="clickChat"
            />
            <expand-svg :expanded="fullscreenOn" @clickElem="clickExpand" />
          </div>
        </div>
      </figcaption>
    </substrate>
  </div>
</template>

<script>
import PlaySvg from "@/components/Icons/PlaySvg";
import SoundSvg from "@/components/Icons/SoundSvg";
import ChatSvg from "@/components/Icons/ChatSvg";
import ExpandSvg from "@/components/Icons/ExpandSvg";
import Chat from "@/components/Chat/Chat";
import Progress from "./Progress";
import moment from "moment";
import Substrate from "./Substrate";
import PlayVideoCenterVue from "../Icons/PlayVideoCenter.vue";
import PauseVideoCenterVue from "../Icons/PauseVideoCenter.vue";

import api from "@/mixins/api";

export default {
  name: "video-player",
  components: {
    PlaySvg,
    SoundSvg,
    ChatSvg,
    ExpandSvg,
    Chat,
    Progress,
    Substrate,
    PlayVideoCenterVue,
    PauseVideoCenterVue
  },
  data() {
    return {
      сurrentTitle: undefined,
      duration: 0,
      currentTime: 0,
      changeVol: null,
      player: this.video,
      volume: false,
      muteVolume: false,
      paused: false,
      videoElement: undefined,
      fullscreenOn: false,
      fullscreenChatState: false,
      timestamps: [],
      videoJustPaused: false,
      videoJustPlayed: false
    };
  },
  props: {
    video: HTMLVideoElement,
    active: Boolean,
    showChatButton: Boolean,
    chatState: Boolean
  },
  computed: {
    videoIsActive() {
      if (!this.videoElement) return false;
      return true;
    },
    roomId() {
      return this.$parent.$parent._props.roomId;
    },
    currVideoTime() {
      return moment.utc(this.currentTime * 1000).format("HH:mm:ss");
    },
    formattedDuration() {
      if (!this.duration || this.duration === Infinity) return false;
      return moment.utc(this.duration * 1000).format("HH:mm:ss");
    },
    videoIsPaused() {
      return this.videoElement.paused;
    }
  },
  methods: {
    test(event) {
      alert(event.target);
    },
    onTimeUpdate() {
      this.currentTime = this.videoElement.currentTime;

      for (let i = 0; i < this.timestamps.length; i++) {
        let previousTimeStampTime = i > 0 ? this.timestamps[i - 1].time : 0;
        let currentTimeStampTime = this.timestamps[i];
        if (
          this.currentTime > previousTimeStampTime &&
          this.currentTime < currentTimeStampTime.time
        ) {
          this.сurrentTitle = currentTimeStampTime.title;
        }
      }
    },
    rewindTo(x) {
      this.videoElement.currentTime =
        (x / this.$refs.progress.$el.clientWidth) * this.duration;
      this.onTimeUpdate();
    },
    playVideo() {
      this.videoElement.play();
    },
    pauseVideo() {
      this.videoElement.pause();
    },
    playOrPauseVideo(event) {
      if (!event.target.classList.contains("video-substrate")) return;
      let paused = this.videoElement.paused;
      if (paused) {
        this.playVideo();
        this.videoJustPlayed = true;
        setTimeout(() => {
          this.videoJustPlayed = false;
        }, 2000);
      } else {
        this.pauseVideo();
        this.videoJustPaused = true;
        setTimeout(() => {
          this.videoJustPaused = false;
        }, 2000);
      }
    },
    showVolume() {
      this.volume = true;
    },
    hideVolume() {
      this.volume = false;
    },
    toggleVolume() {
      if (!this.muteVolume) {
        this.changeVol = 0;
        this.muteVolume = true;
      } else {
        this.changeVol = 0.5;
        this.muteVolume = false;
      }
    },
    togglePlay() {
      if (!this.paused) return this.pauseVideo();
      return this.playVideo();
    },
    clickChat() {
      if (this.fullscreenOn)
        this.fullscreenChatState = !this.fullscreenChatState;
      else this.$emit("clickChat");
    },
    toggleExpand() {
      if (!this.fullscreenOn) {
        let elem = this.$refs.vidFrame;
        this.fullscreenOn = true;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else {
          this.fullscreenOn = false;
        }
      } else {
        document.exitFullscreen();
        this.fullscreenOn = false;
      }
    },
    clickExpand() {
      this.$emit("clickExpand");
    },
    closeExpand() {
      document.exitFullscreen();
      this.fullscreenOn = false;
    },
    isMobileSafari() {
      let userAgent = window.navigator.userAgent;
      return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
    },
    setTimestaps() {
      this.timestamps = api.methods.getTimestamps();
      this.timestamps.push({ title: "Заключение", time: this.duration });
    }
  },
  watch: {
    changeVol() {
      this.videoElement.volume = this.changeVol;
    }
  },
  mounted() {
    if (!this.$slots.videoSlot) return;
    this.videoElement = this.$slots.videoSlot[0].elm.querySelector("video");
    this.videoElement.volume = 0.5;

    if (this.isMobileSafari()) {
      // Hacks for Mobile Safari
      this.videoElement.setAttribute("playsinline", true);
      this.videoElement.setAttribute("controls", true);
      setTimeout(() => {
        this.videoElement.removeAttribute("controls");
      });
    }

    this.paused = this.videoElement.paused;
    this.videoElement.addEventListener(
      "pause",
      () => (this.paused = this.videoElement.paused)
    );
    this.videoElement.addEventListener("loadedmetadata", event => {
      this.duration = event.target.duration;
      this.setTimestaps();
    });
    this.videoElement.addEventListener("timeupdate", this.onTimeUpdate);
    this.videoElement.addEventListener("play", () => (this.paused = false));
    this.videoElement.addEventListener("pause", () => (this.paused = true));
    this.$refs.vidFrame.addEventListener("click", () => {
      console.log("test event");
    });
  }
};
</script>

<style lang="sass" scoped>
.video-player-wrap
  height: 100%
  position: relative
  background: #000
  .video-slot
    height: 100%
  .vidFrame
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center
.vidBar
  position: absolute
  bottom: 0
  right: 0
  left: 0
  padding: 15px 0
  width: 100%
  display: flex
  flex-direction: column
  .top
    margin-bottom: .65rem
    .buffered.redline
      margin-bottom: 8px
      background: #FF0000
      height: 3px
      width: 100%
      display: block
  .bottom
    display: flex
    align-items: center
    justify-content: space-between
    padding: 0 15px
    .left-side
      display: flex
      align-items: center
      font-size: 13px
      color: #ffffff
      .play-svg
        cursor: pointer
      .volume-area
        display: flex
        margin-left: 20px
        .sound-svg
          cursor: pointer
        .volume-input-block
          margin-left: 5px
          overflow: hidden
          display: flex
          align-items: center
          .emersion-enter
            transform: translateX(-129px)
          .emersion-enter-active,
          .emersion-leave-active
            transition: all .2s ease-in-out
          .emersion-enter-from,
          .emersion-leave-to
            transform: translateX(-129px)
      .left-side__current-timestamp
        margin-left: .5rem
      .left-side__current-time
        margin-left: .5rem
    .right-side
      display: flex
      align-items: center
      .expand-svg
        margin-left: 18px
    input[type=range]
      -webkit-appearance: none
      width: 50px
      background: transparent
      &:focus
        outline: none
      &::-webkit-slider-thumb
        -webkit-appearance: none
        border: none
        height: 6px
        width: 6px
        border-radius: 50%
        background: #FFFFFF
        cursor: pointer
        margin-top: -2px
      &::-moz-slider-thumb
        -webkit-appearance: none
        border: none
        height: 6px
        width: 6px
        border-radius: 50%
        background: #FFFFFF
        cursor: pointer
        margin-top: -2px
      &::-webkit-slider-runnable-track
        width: 100%
        height: 2px
        border-radius: 1px
        cursor: pointer
        animate: 0.2s
        background: #fff
      &::-moz-range-track
        width: 100%
        height: 3px
        border-radius: 1px
        cursor: pointer
        animate: 0.2s
        background: #fff
      &::-ms-track
        width: 100%
        height: 3px
        border-radius: 1px
        cursor: pointer
        animate: 0.2s
        background: #fff

.video-chat-miniatures-wrapper
  .video-player-wrap
    height: 100%
  .video-slot
    height: 100%
  .vidFrame
    height: 100%

.vidFrame:fullscreen
  .lessons__messages
    position: fixed
    right: 0
    left: auto
    width: 0%
    opacity: 0
    transition: .3s ease-in-out
  .videoSlot-block,
  .vidBar
    width: 100%
    transition: .3s ease-in-out
  &.chatActive
    .lessons__messages
      width: 30%
      opacity: 1
    .videoSlot-block,
    .vidBar
      width: 70%

.videoSlot-block
  width: 100%

video
  height: 100%
  width: 100%

.pause-video-center,
.play-video-center
  position: absolute

.fade-enter-active, .fade-leave-active
  transition: opacity 1s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
