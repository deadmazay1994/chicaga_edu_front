import MediaObject from "./MediaObject";
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
axios.defaults.headers.post["Content-Type"] = "application/json";

const defaulSourceSettings = {
  audioSource: undefined, // The source of audio. If undefined default microphone
  videoSource: undefined, // The source of video. If undefined default webcam
  publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
  publishVideo: true, // Whether you want to start publishing with your video enabled or not
  resolution: "640x480", // The resolution of your video
  frameRate: 30, // The frame rate of your video
  insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
  mirror: true // Whether to mirror your local video or not
};

export default class {
  constructor({ serverURL, secret }) {
    if (!serverURL) return new Error("serverURl parametr is required");
    if (!secret) return new Error("secret parametr is required");
    this.participants = [];
    this.myMediaObject = null;
    this._serverURL = serverURL;
    this._secret = secret;
    this._OV = new OpenVidu();
    this._session = this._OV.initSession();
    this._fakeStream = this._setFakeStream();
    this.onParticipantsChange = () => {};
    this.onErrorHandling = () => {};
    this._screenIsPublish = false;

    this._session.on("streamCreated", this._streamCreatedHandler.bind(this));
    this._session.on("streamDestroyed", this._streamDestroyHandler.bind(this));
    this._session.on(
      "streamPropertyChanged",
      this._streamPropertyChangedHandler.bind(this)
    );
    this._session.on("exception", ({ exception }) => {
      console.warn(exception);
    });
  }
  _createMyMediaObject(userInfo) {
    if (!this._publisher?.stream) return;
    const mediaStream = this._publisher;
    this.myMediaObject = new MediaObject({
      mediaStream,
      userInfo: {
        ...userInfo,
        videoActive: this.videoIsPublish,
        audioActive: this.audioIsPublish,
        screenActive: this.screenIsPublish
      }
    });
    this.onParticipantsChange();
  }
  _updateMyMediaObjectUserInfo(userInfo) {
    this.myMediaObject.userInfo = {
      ...this.myMediaObject.userInfo,
      ...userInfo
    };
  }
  get allParticipants() {
    const outhers = this.participants.map(o => ({
      itsMe: false,
      mediaObject: o
    }));
    if (this.myMediaObject)
      return [
        {
          itsMe: true,
          mediaObject: this.myMediaObject
        },
        ...outhers
      ];
    else return outhers;
  }
  get videoIsPublish() {
    return this._publisher.stream.videoActive;
  }
  get audioIsPublish() {
    return this._publisher.stream.audioActive;
  }
  get screenIsPublish() {
    return this._screenIsPublish;
  }
  async joinToRoom(roomId, { clientData, sourceSettings = {}, webinar }) {
    sourceSettings = { ...defaulSourceSettings, sourceSettings };
    this._clientData = clientData;
    this._screenIsPublish = sourceSettings.videoSource === "screen";
    this._token = await this._getToken(roomId).catch(error => {
      console.error("_getToken():", error);
      this.onErrorHandling(error);
    });
    this._setClientId();
    const modifyClientData = this._modifyClientData(clientData, sourceSettings);
    await this._session
      .connect(this._token, {
        clientData: modifyClientData
      })
      .catch(error => {
        console.error("_session.connect():", error);
        this.onErrorHandling(error);
      });
    if (!webinar) {
      this._initPublisher(sourceSettings);
      this._publisher.on("streamCreated", () =>
        this._toggleMedia(sourceSettings, modifyClientData)
      );
      this._publisher.on("exception", ({ exception }) => {
        console.error("joinToRoom():", exception);
        this.onErrorHandling(exception);
      });
      this._session.publish(this._publisher).catch(error => {
        console.error(
          "?????????????????? ???????????? ?????? ???????????????????? ?????????????? Publisher:",
          error
        );
        this.onErrorHandling(error);
      });
    }
    window.addEventListener("beforeunload", this.leaveSession.bind(this));
  }
  _initPublisher(sourceSettings = {}) {
    this._publisher = this._OV.initPublisher(undefined, {
      ...sourceSettings,
      publishAudio: true,
      publishVideo: true
    });
  }
  _toggleMedia(sourceSettings = {}, modifyClientData) {
    const videoIsNotPublished = !sourceSettings.publishVideo;
    if (videoIsNotPublished) {
      this.updateMediaStream({ publishVideo: false }).catch(error => {
        console.error(
          "?????????????????? ???????????? ?? ???????????????????? ?????????????????????? (?????????? - updateMediaStream):",
          error
        );
        this.onErrorHandling(error);
      });
      this._publisher.publishVideo(false);
    }
    const audioIsNotPublish = !sourceSettings.publishAudio;
    if (audioIsNotPublish) {
      this.updateMediaStream({ publishAudio: false }).catch(error => {
        console.error(
          "?????????????????? ???????????? ?? ???????????????????? ?????????????????????? (?????????? - updateMediaStream):",
          error
        );
        this.onErrorHandling(error);
      });
      this._publisher.publishAudio(false);
    }
    this._createMyMediaObject(modifyClientData);
  }
  _modifyClientData(clientData, sourceSettings) {
    return {
      ...clientData,
      videoActive: sourceSettings.publishVideo,
      audioActive: sourceSettings.publishAudio,
      screenActive: this._screenIsPublish,
      id: this._clientId
    };
  }
  publishWebcam(settings = {}) {
    this._screenIsPublish = false;
    this._updateMyMediaObjectUserInfo({
      screenActive: this._screenIsPublish
    });
    if (!settings.publishVideo) this._publisher.publishVideo(true);
    const updateVideo = true;
    const updateAudio = false;
    this.updateMediaStream(
      {
        ...settings
      },
      updateVideo,
      updateAudio
    ).catch(error => {
      console.error(
        "?????????????????? ???????????? ?? ???????????????????? ?????????????????????? (?????????? - updateMediaStream):",
        error
      );
      this.onErrorHandling(error);
    });
    this.onParticipantsChange();
  }
  publishScreen(settings = {}) {
    this._screenIsPublish = true;
    this._updateMyMediaObjectUserInfo({
      screenActive: this._screenIsPublish
    });
    if (!settings.publishVideo) this._publisher.publishVideo(true);
    const updateVideo = true;
    const updateAudio = true;
    this.updateMediaStream(
      {
        ...settings,
        videoSource: "screen",
        mirror: false
      },
      updateVideo,
      updateAudio
    ).catch(error => {
      console.error(
        "?????????????????? ???????????? ?? ???????????????????? ?????????????????????? (?????????? - updateMediaStream):",
        error
      );
      this.onErrorHandling(error);
    });
    this.onParticipantsChange();
  }
  async togglePublishAudio() {
    const updateVideo = false;
    const updateAudio = true;
    this._publisher.publishAudio(!this.audioIsPublish);
    return this.updateMediaStream(
      { publishAudio: this.audioIsPublish },
      updateVideo,
      updateAudio
    ).catch(error => {
      console.error(
        "?????????????????? ???????????? ?? ???????????????????? ?????????????????????? (?????????? - updateMediaStream):",
        error
      );
      this.onErrorHandling(error);
    });
  }
  async togglePublishVideo() {
    const updateVideo = true;
    const updateAudio = false;
    const videoSource =
      this._screenIsPublish && !this.videoIsPublish ? "screen" : undefined;
    this._publisher.publishVideo(!this.videoIsPublish);
    return this.updateMediaStream(
      {
        publishVideo: this.videoIsPublish,
        videoSource
      },
      updateVideo,
      updateAudio
    ).catch(error => {
      console.error(
        "?????????????????? ???????????? ?? ???????????????????? ?????????????????????? (?????????? - updateMediaStream):",
        error
      );
      this.onErrorHandling(error);
    });
  }
  async updateMediaStream(
    settings = {},
    updateVideo = true,
    updateAudio = true
  ) {
    const sourceSettings = this._publisher.properties;
    const newSettings = {
      ...sourceSettings,
      ...settings
    };
    let mediaStream = await this._getMediaStream(newSettings);
    let videoPromise, audioPromise;
    let replaceTrack = (track, errorText) => {
      if (!track) return;
      return this._publisher.replaceTrack(track).catch(error => {
        console.error(errorText, error);
        this.onErrorHandling(error);
      });
    };
    if (updateVideo) {
      let videoTrack = mediaStream.getVideoTracks()[0];
      videoPromise = replaceTrack(
        videoTrack,
        "?????????????????? ???????????? ?????? ???????????? ?????????????? ????????????????????????:"
      );
    }
    if (updateAudio) {
      let audioTrack = mediaStream.getAudioTracks()[0];
      audioPromise = replaceTrack(
        audioTrack,
        "?????????????????? ???????????? ?????? ???????????? ?????????????? ????????????????????????:"
      );
      // ?????????????? ?????? ?? OV
      // https://github.com/OpenVidu/openvidu/issues/449
      this._publisher.videoReference.muted = true;
    }
    return Promise.all([videoPromise, audioPromise]);
  }
  leaveSession() {
    if (this._session) this._session.disconnect();
    this._session = undefined;
    this._publisher = undefined;
    this.participants = [];
    this.OV = undefined;

    window.removeEventListener("beforeunload", this.leaveSession);
  }
  async _getMediaStream(settings) {
    let mediaStream;
    let errorCallback = error => {
      console.error(
        "?????????????????? ???????????? ?????? ?????????????????? ?????????????????????????????????? ?????????????????????? (?????????? - this._OV.getUserMedia):",
        error
      );
      this.onErrorHandling(error);
    };
    if (settings.videoSource === "screen") {
      mediaStream = await navigator.mediaDevices
        .getDisplayMedia({
          audio: true,
          video: true
        })
        .catch(errorCallback);
      let mediaStreamForAudio = await this._OV
        .getUserMedia({
          ...settings,
          videoSource: false
        })
        .catch(errorCallback);
      if (
        mediaStream.getAudioTracks()[0] &&
        mediaStreamForAudio.getAudioTracks()[0]
      ) {
        let mergedAudioTrack = this._mergeAudioTracks(
          mediaStream.getAudioTracks()[0],
          mediaStreamForAudio.getAudioTracks()[0]
        );
        mediaStream.removeTrack(mediaStream.getAudioTracks()[0]);
        mediaStream.addTrack(mergedAudioTrack);
      }
    } else {
      mediaStream = await this._OV.getUserMedia(settings).catch(errorCallback);
    }
    // ???????? ?????? ???????????? ???? ?????????? ????????????, ???? ???????????? ???????????????? ??????
    if (!settings.publishVideo)
      mediaStream.addTrack(this._fakeStream.getVideoTracks()[0]);
    if (!settings.publishAudio)
      mediaStream.addTrack(this._fakeStream.getAudioTracks()[0]);
    return mediaStream;
  }
  _mergeAudioTracks(first, second) {
    let fisrtMedia = new MediaStream();
    fisrtMedia.addTrack(first);

    let secondMedia = new MediaStream();
    secondMedia.addTrack(second);

    const audioContext = new AudioContext();
    let audioIn_01 = audioContext.createMediaStreamSource(fisrtMedia);
    let audioIn_02 = audioContext.createMediaStreamSource(secondMedia);

    let dest = audioContext.createMediaStreamDestination();

    audioIn_01.connect(dest);
    audioIn_02.connect(dest);

    return dest.stream.getAudioTracks()[0];
  }
  _setFakeStream() {
    let silence = () => {
      try {
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        let ctx = new AudioContext(),
          oscillator = ctx.createOscillator();
        let dst = oscillator.connect(ctx.createMediaStreamDestination());
        oscillator.start();
        const gainNode = ctx.createGain();
        gainNode.gain.value = 0;
        return Object.assign(dst.stream.getAudioTracks()[0], {
          enabled: false
        });
      } catch (error) {
        alert(error + " 1");
      }
    };

    let black = ({ width = 640, height = 480 } = {}) => {
      let canvas = Object.assign(document.createElement("canvas"), {
        width,
        height
      });
      canvas.getContext("2d").fillRect(0, 0, width, height);
      let stream = canvas.captureStream();
      return Object.assign(stream.getVideoTracks()[0], { enabled: false });
    };

    let blackSilence = (...args) =>
      new MediaStream([black(...args), silence()]);

    return blackSilence();
  }
  _setClientId() {
    this._clientId = `${this._clientData.name}__${Math.floor(
      Math.random() * (10000000 - 1000000 + 1)
    ) + 100000}`;
  }
  _getToken(roomId) {
    return this._createSession(roomId).then(sessionId =>
      this._createToken(sessionId)
    );
  }
  _createSession(sessionId) {
    // ?????????????? ?????????? ???? ???????????????? ?? ???????? OpenVidu
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this._serverURL}/openvidu/api/sessions`,
          JSON.stringify({
            customSessionId: sessionId
          }),
          {
            auth: {
              username: "OPENVIDUAPP",
              password: this._secret
            }
          }
        )
        .then(response => response.data)
        .then(data => resolve(data.id))
        .catch(error => {
          if (error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.warn(
              `No connection to OpenVidu Server. This may be a certificate error at ${this._serverURL}`
            );
            if (
              window.confirm(
                `No connection to OpenVidu Server. This may be a certificate error at ${this._serverURL}\n\nClick OK to navigate and accept it. If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${this._serverURL}"`
              )
            ) {
              location.assign(`${this._serverURL}/accept-certificate`);
            }
            reject(error.response);
          }
        });
    });
  }
  _createToken(sessionId) {
    // ?????????????? ?????????? ???? ???????????????? ?? ???????? OpenVidu
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this._serverURL}/openvidu/api/sessions/${sessionId}/connection`,
          {},
          {
            auth: {
              username: "OPENVIDUAPP",
              password: this._secret
            }
          }
        )
        .then(response => response.data)
        .then(data => resolve(data.token))
        .catch(error => reject(error.response));
    });
  }
  _getParticipantIndexFromStream(stream) {
    return this.allParticipants
      .map(p => p.mediaObject.stream?.stream)
      .findIndex(
        p => p.connection.connectionId === stream.connection.connectionId
      );
  }
  _getMediaObjectFromStream(stream) {
    const index = this._getParticipantIndexFromStream(stream);
    if (index < 0 || index >= this.allParticipants.length) return;
    return this.allParticipants[index].mediaObject;
  }
  _streamCreatedHandler({ stream }) {
    const subscriber = this._session.subscribe(stream);
    this.participants.push(
      new MediaObject({
        mediaStream: subscriber,
        userInfo: {
          audioActive: true,
          videoActive: true,
          screenActive: null,
          ...JSON.parse(stream.connection.data).clientData
        }
      })
    );
    this.onParticipantsChange();
  }
  _streamDestroyHandler({ stream }) {
    const index = this.participants
      .map(p => p.stream?.stream)
      .findIndex(
        p => p.connection.connectionId === stream.connection.connectionId
      );
    if (index < 0) return;
    this.participants.splice(index, 1);
    this.onParticipantsChange();
  }
  _streamPropertyChangedHandler({ stream }) {
    const mediaObject = this._getMediaObjectFromStream(stream);
    mediaObject.userInfo.audioActive = stream.audioActive;
    mediaObject.userInfo.videoActive = stream.videoActive;
    this.onParticipantsChange();
  }
}
