import Medias from "@/components/LessonComponents/VideoChat/Classes/MediaObjects";

export default {
  namespaces: true,
  actions: {
    setVideoOff({ state, rootGetters }, val) {
      state.videoOff = val;
      rootGetters.socket.emit("toggle camera", val);
    },
    setAudioOff({ state, rootGetters }, val) {
      state.audioOff = val;
      rootGetters.socket.emit("toggle micro", val);
    }
  },
  mutations: {
    pushPeer(state, peer) {
      state.allPeers.push(peer);
    },
    destroyPeers(state) {
      state.allPeers.forEach(peer => peer.destroy());
    },
    disconnectPeers(state) {
      state.allPeers.forEach(peer => peer.disconnect());
    },
    initMedias(state) {
      state.medias = new Medias();
    }
  },
  state: {
    videoOff: false,
    audioOff: false,
    allPeers: [],
    medias: new Medias()
  },
  getters: {
    videoOff: state => state.videoOff,
    allPeers: state => state.allPeers,
    medias: state => state.medias
  }
};
