<template>
  <div
    class="video-player"
    tabindex="0"
    ref="videoWrapper"
    @click="
      $event => {
        doubleClickOnVideo($event, doubleClickHasHappened);
      }
    "
    v-on:keyup.right="rewindToLeftOrRight(true)"
    v-on:keyup.left="rewindToLeftOrRight(false)"
  >
    <div class="video-player__slot-wrap">
      <figure
        class="video-player__frame"
        ref="vidFrame"
        :class="{ chatActive: fullscreenChatState }"
      >
        <slot name="videoSlot"></slot>
        <chat :roomId="roomId" ref="chat" v-if="fullscreenOn" />

        <rewind-animation-vue
          class="video-player__rewind-svgs"
          :hasRewindLeft="hasRewindLeft"
          :hasRewindRight="hasRewindRight"
        />
        <play-pause-animation-vue
          class="video-player__play-pause"
          :videoJustPlayed="videoJustPlayed"
          :videoJustPaused="videoJustPaused"
        />
      </figure>
    </div>
    <substrate
      class="video-player__substrate"
      :player-element="$el"
      style="z-index: 2"
      :duration="1000"
    >
      <figcaption-component
        ref="figcaption"
        :currentTime="currentTime"
        :duration="duration"
        :timestamps="timestamps"
        :volumeBoolean="volume"
        :muteVolume="muteVolume"
        :volumeValue="changeVol"
        @volumeInput="changeVol = $event"
        @clickToggleVolume="toggleVolume()"
        :paused="paused"
        :currentTitle="currentTitle"
        :currentVideoTime="currVideoTime"
        :formattedDuration="formattedDuration"
        :showChatButton="showChatButton"
        :chatState="chatState"
        :fullscreenChatState="fullscreenChatState"
        :fullscreenOn="fullscreenOn"
        @rewindTo="rewindTo"
        @togglePlay="togglePlay()"
        @changeSpeed="changeVideoSpeed"
        @clickChat="clickChat()"
        @toggleExpand="toggleExpand()"
        @toggleInterruptFlag="toggleInterruptFlag"
      />
    </substrate>
  </div>
</template>

<script>
import moment from "moment";

import RewindAnimationVue from "./RewindAnimation.vue";
import Substrate from "./Substrate";
import FigcaptionComponent from "./FigcaptionComponent";
import PlayPauseAnimationVue from "./PlayPauseAnimation.vue";

export default {
  name: "video-player",
  components: {
    Substrate,
    FigcaptionComponent,
    RewindAnimationVue,
    PlayPauseAnimationVue
  },
  data() {
    return {
      settingsMenu: false,
      currentTitle: undefined,
      duration: 0,
      currentTime: 0,
      changeVol: null,
      volume: false,
      muteVolume: false,
      paused: false,
      videoElement: undefined,
      fullscreenOn: false,
      fullscreenChatState: false,
      dbClickClicks: 0,
      dbClickTimer: null,
      hasRewindLeft: false,
      hasRewindRight: false,
      videoJustPaused: false,
      videoJustPlayed: false,
      playPauseClickEvent: null,
      interruptFlag: false
    };
  },
  props: {
    video: HTMLVideoElement,
    active: Boolean,
    showChatButton: Boolean,
    chatState: Boolean,
    timestamps: Array
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
    // Определить был ли нажат элемент переданный вторым параметром (target).
    // Возвращает boolean
    defineIsClickedElement(event, target) {
      return event.target.offsetParent == target;
    },
    // Функция вызывается когда происходит двойной клик по элементу
    doubleClickHasHappened(data) {
      this.rewindToLeftOrRight(data);
    },
    // Функция вызывается когда происходит одиночный клик по элементу
    oneClickHasHappened(data) {
      this.playOrPauseVideo(data);
    },
    // Двойной клик на видео
    doubleClickOnVideo(event, callback) {
      // Прерываем выполнение метода при выполнении события
      // onClickOutside в FigcaptionComponent
      if (this.interruptFlag) {
        return;
      }
      if (!this.defineIsClickedElement(event, this.$refs.videoWrapper)) return;

      let xPosition = event.offsetX;
      let elementWidth = event.path[0].clientWidth;
      let boolean = xPosition > elementWidth / 2;

      this.dbClickClicks++;
      if (this.dbClickClicks == 1) {
        this.dbClickTimer = setTimeout(() => {
          this.dbClickClicks = 0;
          this.oneClickHasHappened(event);
        }, 400);
      } else {
        clearTimeout(this.dbClickTimer);
        callback(boolean);
        this.dbClickClicks = 0;
      }
    },
    changeVideoSpeed(speed) {
      this.videoElement.playbackRate = speed;
    },
    onTimeUpdate() {
      this.currentTime = this.videoElement.currentTime;
      if (this.duration === Infinity) return;
      if (!this.timestamps) return;
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
    rewindToLeftOrRight(right) {
      if (right) {
        this.videoElement.currentTime += 10;
        this.hasRewindRight = true;
        setTimeout(() => {
          this.hasRewindRight = false;
        }, 800);
      } else {
        this.videoElement.currentTime -= 10;
        this.hasRewindLeft = true;
        setTimeout(() => {
          this.hasRewindLeft = false;
        }, 800);
      }
      this.onTimeUpdate();
    },
    rewindTo(x) {
      this.videoElement.currentTime =
        (x / this.$refs.figcaption.$refs.progress.$el.clientWidth) *
        this.duration;
      this.onTimeUpdate();
    },
    playVideo() {
      this.videoElement.play();
    },
    pauseVideo() {
      this.videoElement.pause();
    },
    playOrPauseVideo(e) {
      this.playPauseClickEvent = e;
      setTimeout(() => {
        if (this.playPauseClickEvent.detail != 1) return;
        let paused = this.videoElement.paused;
        if (paused) {
          this.playVideo();
          this.videoJustPlayed = true;
          setTimeout(() => {
            this.videoJustPlayed = false;
          }, 1000);
        } else {
          this.pauseVideo();
          this.videoJustPaused = true;
          setTimeout(() => {
            this.videoJustPaused = false;
          }, 1000);
        }
      }, 100);
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
        let elem = this.$el;
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
    isMobileSafari() {
      let userAgent = window.navigator.userAgent;
      return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
    },
    clickTimecode(time) {
      this.videoElement.currentTime = time;
      this.onTimeUpdate();
    },
    setPausedVideo() {
      this.paused = this.videoElement.paused;
    },
    toggleInterruptFlag(value) {
      this.interruptFlag = value;
    }
  },
  watch: {
    changeVol() {
      this.videoElement.volume = this.changeVol;
    }
  },
  mounted() {
    if (!this.$slots.videoSlot) return;
    this.videoElement = this.$slots.videoSlot[0].elm;
    this.videoElement.volume = 0.5;

    if (this.isMobileSafari()) {
      // Hacks for Mobile Safari
      this.videoElement.setAttribute("playsinline", true);
      this.videoElement.setAttribute("controls", true);
      setTimeout(() => {
        this.videoElement.removeAttribute("controls");
      });
    }

    this.setPausedVideo();

    this.videoElement.addEventListener(
      "pause",
      () => (this.paused = this.videoElement.paused)
    );
    this.videoElement.addEventListener("loadedmetadata", event => {
      this.duration = event.target.duration;
    });
    this.videoElement.addEventListener("timeupdate", this.onTimeUpdate);
    this.videoElement.addEventListener("play", () => (this.paused = false));
    this.videoElement.addEventListener("pause", () => (this.paused = true));

    // У videoWrapper 'tabindex = 0'. Здесь происходит автофокус на весь этот элемент
    this.$refs.videoWrapper.focus();
  }
};
</script>

<style lang="sass" scoped>
.video-player
  position: relative
  border-radius: 20px
  outline-style: none
  overflow: hidden
  &__slot-wrap
    width: 100%
    height: 100%
  &__frame
    position: relative
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
  &__frame::before
    content: ""
    position: absolute
    top: 1px
    right: 1px
    bottom: 1px
    left: 1px
    background-color: #000000
    border-radius: 20px
    z-index: -1
  &__frame video
    width: 100%
    height: 100%
    pointer-events: none
  &__play-pause
    position: absolute
  &__rewind-svgs
    position: absolute
    display: flex
    width: 100%
    height: 100%
  &__substrate
    position: absolute
    top: 0
    right: 0
    width: 100%
    height: 100%

  &__frame:fullscreen
    .lessons__messages
      position: fixed
      right: 0
      left: auto
      width: 0%
      opacity: 0
      transition: .3s ease-in-out
    .figcaption-component
      width: 100%
      transition: .3s ease-in-out
    &.chatActive
      .lessons__messages
        width: 30%
        opacity: 1
      .figcaption-component
        width: 70%
</style>
