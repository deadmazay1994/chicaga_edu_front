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
    },
    async setCapture({ commit }) {
      let startCapture = async (displayMediaOptions = {}) => {
        let captureStream = null;
        try {
          captureStream = await navigator.mediaDevices.getDisplayMedia(
            displayMediaOptions
          );
        } catch (err) {
          commit("pushShuckbar", {
            success: false,
            val: "Не удалось получить доступ к экрану"
          });
        }
        return captureStream;
      };
      let capture = await startCapture();
      if (capture) {
        commit("setMyCaptureMedia", capture);
      }
    },
    async setWebcam({ commit }) {
      let startWebcam = async () => {
        let stream = null;
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            // video: { width: 102, height: 76 },
            video: { width: 624, height: 480 },
            audio: true
          });
        } catch (err) {
          commit("pushShuckbar", {
            success: false,
            val: "Не удалось получить доступ к вебкамере"
          });
        }
        return stream;
      };
      let webcam = await startWebcam();
      if (webcam) {
        commit("setMyWebcamMedia", webcam);
      }
    },
    replaceStream({ getters }, newStream) {
      getters.calls.forEach(call => {
        call.peerConnection
          .getSenders()
          .forEach(s => s.replaceTrack(newStream.getVideoTracks()[0]));
      });
      getters.medias.medias.find(media => media.im).stream = newStream;
    },
    toggleCaptureAndCameraAction({ state, dispatch, commit }) {
      if (state.activeMyMedia == "camera") {
        dispatch("replaceStream", state.myCaptureMedia);
        commit("switchAviveMyMedia", "capture");
      } else {
        dispatch("replaceStream", state.myWebcamMedia);
        commit("switchAviveMyMedia", "camera");
      }
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
    },
    setMyCaptureMedia(state, myCaptureMedia) {
      state.myCaptureMedia = myCaptureMedia;
    },
    setMyWebcamMedia(state, media) {
      state.myWebcamMedia = media;
    },
    switchAviveMyMedia(state, mediaName) {
      state.activeMyMedia = mediaName;
    },
    callPush(state, call) {
      state.calls.push(call);
    }
  },
  state: {
    videoOff: false,
    audioOff: false,
    allPeers: [],
    medias: new Medias(),
    myCaptureMedia: null,
    myWebcamMedia: null,
    activeMyMedia: "camera",
    calls: []
  },
  getters: {
    videoOff: state => state.videoOff,
    allPeers: state => state.allPeers,
    medias: state => state.medias,
    myCaptureMedia: state => state.myCaptureMedia,
    myWebcamMedia: state => state.myWebcamMedia,
    activeMyMedia: state => state.activeMyMedia,
    calls: state => state.calls
  }
};
