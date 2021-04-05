<template>
  <div v-if="currentMedia" class="media-manager vue-component">
    <div class="media-manager__controls">
      <button
        @click="togglePlayPause"
        type="button"
        class="ma-2 v-btn v-btn--depressed v-btn--flat v-btn--icon v-btn--outlined v-btn--round theme--light v-size--default"
      >
        <span class="v-btn__content"
          ><i
            aria-hidden="true"
            class="v-icon notranslate mdi theme--light"
            :class="currentMedia.paused ? 'mdi-play' : 'mdi-pause'"
          ></i
        ></span>
      </button>
      <button
        @click="toStart"
        type="button"
        class="ma-2 v-btn v-btn--depressed v-btn--flat v-btn--icon v-btn--outlined v-btn--round theme--light v-size--default"
      >
        <span class="v-btn__content"
          ><i
            aria-hidden="true"
            class="v-icon notranslate mdi mdi-stop theme--light"
          ></i
        ></span>
      </button>
    </div>
    <v-progress-linear
      class="media-manager__progress"
      height="5"
      v-model="percentage"
      :value="(currentMedia.currentTime / currentMedia.duration) * 100"
      @click="setTimeByClickProgress"
    ></v-progress-linear>
    <div class="media-manager__time">
      {{ formatSecondsToHMS(currentMedia.currentTime) }} /
      {{ formatSecondsToHMS(currentMedia.duration) }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "media-manager",
  data: function() {
    return {};
  },
  methods: {
    play() {
      this.currentMedia.play();
      this.mediaData.paused = false;
      // this.playPauseBtn.classList.add("mdi-pause");
      // this.playPauseBtn.classList.remove("mdi-play");
    },
    pause() {
      this.currentMedia.pause();
      this.mediaData.paused = true;
      // this.playPauseBtn.classList.remove("mdi-pause");
      // this.playPauseBtn.classList.add("mdi-play");
    },
    toStart() {
      this.currentMedia.currentTime = 0;
      this.mediaData.currentTime = 0;
      this.pause();
    },
    togglePlayPause() {
      if (this.mediaData.paused) this.play();
      else this.pause();
    },
    setTimeByClickProgress() {
      this.currentMedia.currentTime = parseInt(
        (this.mediaData.duration / 100) * this.percentage
      );
    },
    formatSecondsToHMS(seconds) {
      if (seconds) {
        return new Date(seconds * 1000).toISOString().substr(11, 8);
      }
      return "00:00:00";
    }
  },
  computed: {
    ...mapGetters(["mediaData", "currentMedia"]),
    vuetifyAudioElement() {
      return this.currentMedia.parentElement;
    },
    playPauseBtn() {
      return this.vuetifyAudioElement
        .querySelector("button")
        .querySelector("i");
    },
    percentage: {
      get() {
        return (this.mediaData.currentTime / this.currentMedia.duration) * 100;
      },
      set(percentage) {
        this.currentMedia.currentTime = parseInt(
          (this.currentMedia.duration / 100) * percentage
        );
      }
    }
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.media-manager
  display: flex
  flex-wrap: wrap
  align-items: center
  &__progress
    width: 60%
    margin: 0 10px
    cursor: pointer
  &__time
    color: rgba(0, 0, 0, .8)
    font-size: 14px
</style>
