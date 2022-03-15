<template>
  <div class="video-player-wrap">
    <div ref="videoElemSlot">
      <figure class="vidFrame" ref="vidFrame">
        <slot name="videoSlot"></slot>
        <figcaption class="vidBar" v-if="fullscreenOn">
          <div class="top">
            <div class="progress">
              <span class="buffered"></span>
            </div>
          </div>
          <dir class="bottom">
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
            </div>
            <div class="right-side">
              <chat-svg :chatOff="false" @clickElem="toggleChat" />
              <expand-svg
                :expanded="true"
                @clickElem="closeExpand"
                @onEsc="closeExpand"
              />
            </div>
          </dir>
        </figcaption>
      </figure>
    </div>
    <div class="video-player">
      <div class="top">
        <div class="progress">
          <span ref="total" id="total">
            <span ref="buffered" id="buffered"
              ><span
                ref="current"
                id="current"
                :class="{ redline: videoIsActive, default: !videoIsActive }"
              ></span
            ></span>
          </span>
        </div>
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
        </div>
        <div class="right-side">
          <chat-svg :chatOff="false" @clickElem="toggleChat" />
          <expand-svg :expanded="false" @clickElem="toggleExpand" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlaySvg from "@/components/Icons/PlaySvg";
import SoundSvg from "@/components/Icons/SoundSvg";
import ChatSvg from "@/components/Icons/ChatSvg";
import ExpandSvg from "@/components/Icons/ExpandSvg";

export default {
  name: "video-player",
  components: {
    PlaySvg,
    SoundSvg,
    ChatSvg,
    ExpandSvg
  },
  data() {
    return {
      changeVol: null,
      player: this.video,
      volume: false,
      muteVolume: false,
      paused: false,
      videoPlayer: undefined,
      currentTime: undefined,
      fullscreenOn: false
    };
  },
  props: ["video"],
  computed: {
    videoIsActive() {
      // const isVideoPlaying = Boolean(this.videoPlayer.currentTime > 0 && !this.videoPlayer.paused && !this.videoPlayer.ended && this.videoPlayer.readyState > 2);
      if (!this.videoPlayer) return false;
      return true;
    }
  },
  methods: {
    playVideo() {
      this.videoPlayer.play();
    },
    pauseVideo() {
      console.log(this.videoPlayer);
      this.videoPlayer.pause();
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
      if (!this.paused) {
        this.pauseVideo();
        this.paused = true;
      } else {
        this.playVideo();
        this.paused = false;
      }
    },
    toggleChat() {
      return;
    },
    toggleExpand() {
      if (!this.videoPlayer.requestFullscreen) return;
      this.$refs.vidFrame.requestFullscreen();
      this.fullscreenOn = true;
    },
    closeExpand() {
      console.log("close expand!");
      document.exitFullscreen();
      this.fullscreenOn = false;
    }
  },
  watch: {
    changeVol() {
      this.videoPlayer.volume = this.changeVol;
    },
    currentTime() {
      console.log("current time:", this.currentTime);
    }
  },
  mounted() {
    this.videoPlayer = this.$refs.videoElemSlot.children[0].children[0].children[0];
    this.videoPlayer.volume = 0.5;
  },
  updated() {
    this.currentTime = this.videoPlayer.currentTime;
  }
};
</script>

<style lang="sass" scoped>
.video-player
  position: absolute
  bottom: 0
  left: 0
  width: 100%
  padding: 4px 10px
  background: transparent
  display: flex
  flex-direction: column

  .top
    width: 100%
    #total
      width: 100%
      background: #999
      #buffered
        background: #000
        #current
          display: block
          line-height: 0
          height: 3px
          width: 100%
          &.redline
            background: #FF0000
          &.default
            background: #333333

  .bottom
    padding: 10px 5px
    display: flex
    align-items: center
    justify-content: space-between
    .left-side
      display: flex
      align-items: center
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

.vidFrame
  position: relative
  top: 0
  left: 0
  width: 100%
  height: auto
  video
    height: 100%
    width: auto
    margin: 0 auto
.vidBar
  position: absolute
  bottom: 0
  right: 0
  left: 0
  padding: 15px 25px
  width: 100%
  display: flex
  flex-direction: column
  .bottom
    display: flex
    align-items: center
    justify-content: space-between
    .left-side
        display: flex
        align-items: center
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
</style>
