export default {
  methods: {
    addPlayPauseEvent(media) {
      media.addEventListener("playing", this.mediaPlaying);
      media.addEventListener("pause", this.mediaStoping);
    },
    mediaPlaying() {
      this.$store.dispatch("setAudioOff", true);
    },
    mediaStoping() {
      this.$store.dispatch("setAudioOff", false);
    }
  }
};
