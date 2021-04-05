export default {
  namespaces: true,
  actions: {
    setCurrentMedia({ commit, getters }, media) {
      if (getters.currentMedia != media && getters.currentMedia) {
        getters.currentMedia.pause();
      }
      commit("setCurrentMedia", media);
      commit("setMediaData", media);
    }
  },
  mutations: {
    setCurrentMedia: (state, media) => {
      state.currentMedia = media;
      state.mediaUpdateInterval = setTimeout(function tick() {
        if (state.currentMedia && media.src == state.currentMedia.src) {
          state.mediaData.currentTime = media.currentTime;
          setTimeout(tick, 250);
        }
      }, 250);
    },
    resetMedia: state => {
      state.currentMedia = null;
      state.mediaData.currentTime = 0;
    },
    setMediaData: (state, media) => {
      state.mediaData.currentTime = media.currentTime;
      state.mediaData.paused = media.paused;
      state.mediaData.duration = media.duration;
      state.mediaData.muted = media.volume == 0;
    }
  },
  state: {
    currentMedia: null,
    mediaData: {
      currentTime: 0,
      paused: true,
      muted: false,
      duratatdurationion: 0
    }
  },
  getters: {
    currentMedia: state => state.currentMedia,
    mediaData: state => state.mediaData,
    mediaUpdateInterval: state => state.mediaUpdateInterval
  }
};
