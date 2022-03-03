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
      let startCapture = async () => {
        let captureStream = null;
        try {
          captureStream = await navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: true
          });
        } catch (err) {
          commit("pushShuckbar", {
            success: false,
            val: "Не удалось получить доступ к экрану",
            timeout: 99999
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
        call.peerConnection.getSenders().forEach(s => {
          if (newStream.getVideoTracks()[0]) {
            s.replaceTrack(newStream.getVideoTracks()[0]);
          }
          if (newStream.getAudioTracks()[0]) {
            s.replaceTrack(newStream.getAudioTracks()[0]);
          }
        });
      });
      // Удаляем все звуковые дорожки, чтобы не слышатть самого себя
      let clone = newStream.clone();
      clone.getAudioTracks().forEach(track => track.stop());
      getters.medias.medias.find(media => media.im).stream = clone;
    },
    toggleCaptureAndCameraAction({ state, dispatch, commit }) {
      if (state.myActiveMediaName == "camera") {
        dispatch("replaceStream", state.myCaptureMedia);
        commit("switchmyActiveMediaName", "capture");
      } else {
        dispatch("replaceStream", state.myWebcamMedia);
        commit("switchmyActiveMediaName", "camera");
      }
    },
    setLocalstoradgeStatesToTracks({ getters }) {
      if (getters.myWebcamMedia) {
        getters.myWebcamMedia
          .getVideoTracks()
          .forEach(track => (track.enabled = !getters.videoOff));
        getters.myWebcamMedia
          .getAudioTracks()
          .forEach(track => (track.enabled = !getters.audioOff));
      }
      if (getters.myCaptureMedia) {
        getters.myCaptureMedia
          .getVideoTracks()
          .forEach(track => (track.enabled = !getters.videoOff));
        getters.myCaptureMedia
          .getAudioTracks()
          .forEach(track => (track.enabled = !getters.audioOff));
      }
    },
    toggleMediaTrackPC({ getters, dispatch }, { mediaType, value, el }) {
      console.log({"mediaType": mediaType, "value": value, "el": el});
      let track;
      if (mediaType == "video" && getters.myActiveMediaName == "camera") {
        track = getters.myWebcamMedia.getVideoTracks()[0];
        dispatch("setVideoOff", value);
      } else if (
        mediaType == "audio" &&
        getters.myActiveMediaName == "camera"
      ) {
        console.log("track", track);
        track = getters.myWebcamMedia.getAudioTracks()[0];
        dispatch("setAudioOff", value);
      } else if (
        mediaType == "video" &&
        getters.myActiveMediaName == "capture"
      ) {
        track = getters.myCaptureMedia.getVideoTracks()[0];
        dispatch("setVideoOff", value);
      } else if (
        mediaType == "audio" &&
        getters.myActiveMediaName == "capture"
      ) {
        track = getters.myWebcamMedia.getAudioTracks()[0];
        dispatch("setAudioOff", value);
      }
      el;
      // console.group(
      //   `Media status ${mediaType} is ${!value ? "enabled" : "disabled"}`
      // );
      // if (el) {
      //   console.log(el);
      // }
      // console.groupEnd();
      track.enabled = !value;
      track;
    },
    async addTrack(state, params) {
      let peerConnection = params[0];
      let track = params[1];
      let stream = params[2];
      const newSender = peerConnection.addTrack(track, stream);
      peerConnection.createOffer(offer => {
        peerConnection.setLocalDescription(offer, () => {
          console.log(offer);
        });
      });
      return newSender;
    }
  },
  mutations: {
    setAudioOffMutation(state, value) {
      state.audioOff = value;
    },
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
    switchmyActiveMediaName(state, mediaName) {
      state.myActiveMediaName = mediaName;
    },
    callPush(state, call) {
      state.calls.push(call);
    }
  },
  state: {
    videoOff: window.localStorage.getItem("videochat_camera_state") == "true",
    audioOff:
      window.localStorage.getItem("videochat_microphone_state") == "true",
    allPeers: [],
    medias: new Medias(),
    myCaptureMedia: null,
    myWebcamMedia: null,
    myActiveMediaName: "camera",
    myActiveMedia: null,
    calls: []
  },
  getters: {
    videoOff: state => state.videoOff,
    audioOff: state => state.audioOff,
    allPeers: state => state.allPeers,
    medias: state => state.medias,
    myCaptureMedia: state => state.myCaptureMedia,
    myWebcamMedia: state => state.myWebcamMedia,
    myActiveMediaName: state => state.myActiveMediaName,
    myActiveMedia: state => {
      return state.myActiveMediaName == "video"
        ? state.myWebcamMedia
        : state.myCaptureMedia;
    },
    calls: state => state.calls
  }
};
