export default {
  methods: {
    addPlayPauseEvent(media) {
      media.addEventListener("playing", this.mediaPlaying);
      media.addEventListener("pause", this.mediaStoping);
    },
    mediaPlaying() {
      this.$store.dispatch("changeUserSetting", {
        name: "audioOff",
        val: true,
        text: "Ваш микрофон выключен",
        snuckbarStatus: true,
        roomId: this.lessonId
      });
    },
    mediaStoping() {
      this.$store.dispatch("changeUserSetting", {
        name: "audioOff",
        val: false,
        text: "Ваш микрофон включен",
        snuckbarStatus: true,
        roomId: this.lessonId
      });
    }
  }
};
