<template>
  <div class="audio-player">
    <audio :src="src" ref="audio"></audio>
    <div class="audio-player__wrapper">
      <player-button
        class="audio-player__button"
        :color="playerThemeColor"
        :paused="audioElementIsPaused"
        @click.native="togglePlay()"
      />
      <div class="audio-player__progress-wrapper">
        <audio-progress
          class="audio-player__progress"
          :color="playerThemeColor"
          :currentTime="audioElementCurrentTime"
          :duration="audioElementDuration"
          @setProgressPosition="updateAudioElementTime"
        />
        <span class="audio-player__time audio-player__time--left">{{
          formattedTime(audioElementCurrentTime)
        }}</span>
        <span class="audio-player__time audio-player__time--right">{{
          formattedTime(audioElementDuration)
        }}</span>
      </div>
    </div>
    <sprite-sheet></sprite-sheet>
  </div>
</template>

<script>
import AudioProgress from "./AudioProgress.vue";
import PlayerButton from "./PlayerButton.vue";

export default {
  name: "audio-player",
  components: {
    AudioProgress,
    PlayerButton
  },
  data: function() {
    return {
      audioElementIsPaused: undefined,
      audioElement: null,
      audioElementCurrentTime: 0,
      audioElementDuration: null
    };
  },
  props: {
    src: {
      type: String,
      required: true
    },
    playerThemeColor: {
      type: String,
      default: "linear-gradient(180deg, #FF6440 0%, #CC2D23 100%)"
    }
  },
  methods: {
    togglePlay() {
      if (this.audioElementIsPaused) this.audioElement.play();
      else this.audioElement.pause();
    },
    onTimeUpdate() {
      this.audioElementCurrentTime = this.$refs.audio.currentTime;
      if (this.duration === Infinity) return;
    },
    updateAudioElementTime(positionInPercent) {
      const updatedTime = (positionInPercent * this.audioElementDuration) / 100;
      this.audioElement.currentTime = updatedTime;
    },
    formattedTime(time) {
      const formatTime = function(str) {
        if (str.length == 1) return `0${str}`;
        return str;
      };

      time = parseInt(time);

      let hours = Math.trunc(time / 60);
      let minutes = time % 60;

      return formatTime(String(hours)) + ":" + formatTime(String(minutes));
    }
  },
  mounted() {
    this.audioElement = this.$refs.audio;
    this.audioElement.addEventListener("loadedmetadata", event => {
      this.audioElementDuration = event.target.duration;
      this.audioElementIsPaused = true;
    });
    this.audioElement.addEventListener("playing", () => {
      this.audioElementIsPaused = false;
    });
    this.audioElement.addEventListener("pause", () => {
      this.audioElementIsPaused = true;
    });
    this.audioElement.addEventListener("timeupdate", this.onTimeUpdate);
  }
};
</script>

<style scoped="scoped" lang="sass">
.audio-player
  &__wrapper
    display: flex
    align-items: center
  &__button
    margin-right: 16px
  &__progress-wrapper
    position: relative
    width: 100%
    padding: 22px 24px
    border-radius: 30px
    background-color: #FFFFFF
    -webkit-box-shadow: 0px 4px 20px rgba(128, 128, 128, 0.2)
    -moz-box-shadow: 0px 4px 20px rgba(128, 128, 128, 0.2)
    box-shadow: 0px 4px 20px rgba(128, 128, 128, 0.2)
  &__time
    position: absolute
    bottom: 3px
    font-size: 12px
    font-weight: 400
  &__time--left
    left: 24px
  &__time--right
    right: 24px
</style>
