<template>
  <div class="video-player">
    <div class="top">
      <span ref="total" id="total">
        <span ref="buffered" id="buffered"
          ><span ref="current" id="current"></span
        ></span>
      </span>
    </div>
    <div class="bottom">
      <div class="left-side">
        <play-svg :onPause="paused" @clickElem="togglePlay" />
        <div class="volume-area" @mouseenter="showVolume" @mouseleave="hideVolume">
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
    </div>
    <div class="right-side"></div>
  </div>
</template>

<script>
import PlaySvg from "@/components/Icons/PlaySvg";
import SoundSvg from "@/components/Icons/SoundSvg";

export default {
  name: "video-player",
  components: {
    PlaySvg,
    SoundSvg
  },
  data() {
    return {
      changeVol: null,
      player: this.video,
      volume: false,
      muteVolume: false,
      paused: false
    };
  },
  props: ["video"],
  methods: {
    playVideo() {
      this.player.play();
    },
    pauseVideo() {
      this.player.pause();
    },
    showVolume() {
      this.volume = true
    },
    hideVolume() {
      this.volume = false
    },
    toggleVolume() {
      if (!this.muteVolume) {
        this.changeVol = 0
        this.muteVolume = true
      }
      else {
        this.changeVol = 50
        this.muteVolume = false
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
    }
  },
  watch: {
    changeVol() {
      console.log(this.video)
      this.video.volume = this.changeVol
    }
  }
};
</script>

<style lang="sass" scoped>
.video-player
  position: absolute
  bottom: 0
  left: 0
  width: 100%
  padding: 5px
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
          background: red
          line-height: 0
          height: 4px
          width: 100%

  .bottom
    padding: .25rem 5px
    margin-top: .25rem
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
        margin-left: 1rem
        .volume-input-block
          margin-left: 1rem
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

    input[type=range]
      -webkit-appearance: none
      width: 100%
      background: transparent
      &:focus
        outline: none
      &::-webkit-slider-thumb
        -webkit-appearance: none
        border: none
        height: 14px
        width: 14px
        border-radius: 50%
        background: #FFFFFF
        cursor: pointer
        margin-top: -5px
      &::-webkit-slider-runnable-track
        width: 100%
        height: 4px
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