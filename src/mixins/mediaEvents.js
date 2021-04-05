export default {
  methods: {
    addPlayPauseEvent(media) {
      media.addEventListener("playing", () => {
        this.mediaPlaying(media);
      });
      media.addEventListener("pause", () => {
        this.mediaStoping(media);
      });
      media.addEventListener("volumechange", () => {
        this.$store.commit("setMediaData", media);
      });
    },
    mediaPlaying(media) {
      this.$store.dispatch("setCurrentMedia", media);
      this.$store.dispatch("setAudioOff", true);
      this.$store.dispatch("setAudioOff", true);
    },
    mediaStoping(media) {
      this.$store.commit("setMediaData", media);
      this.$store.dispatch("setAudioOff", false);
      this.$store.dispatch("setAudioOff", false);
    }
  }
};
