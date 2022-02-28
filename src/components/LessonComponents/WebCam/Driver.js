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
  mirror: false // Whether to mirror your local video or not
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
    this.onParticipantsChange = () => {};

    this._session.on("streamCreated", this._streamCreatedHandler.bind(this));
    this._session.on("streamDestroyed", this._streamDestroyHandler.bind(this));
    this._session.on(
      "streamPropertyChanged",
      this._streamPropertyChangedHandler.bind(this)
    );
  }
  _createMyMediaObject(userInfo) {
    // TODO
    // Удалить все аудиотреки
    if (!this._publisher?.stream) return;
    const mediaStream = this._publisher;
    this.myMediaObject = new MediaObject({
      mediaStream,
      userInfo
    });
    this.onParticipantsChange();
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
  async joinToRoom(roomId, { clientData, sourceSettings = {} }) {
    // if (!this.myMediaObject)
    //   throw new Error(
    //     "Before connecting call createMyMediaObject method is required"
    //   );
    if (!sourceSettings)
      sourceSettings = { ...defaulSourceSettings, sourceSettings };
    this._clientData = clientData;
    this._token = await this._getToken(roomId);
    this._setClientId();
    const modifyClientData = {
      ...clientData,
      id: this._clientId
    };
    await this._session.connect(this._token, {
      clientData: modifyClientData
    });
    this._publisher = this._OV.initPublisher(undefined, sourceSettings);
    this._createMyMediaObject(modifyClientData);
    this._session.publish(this._publisher);
    window.addEventListener("beforeunload", this.leaveSession.bind(this));
  }
  disconnect() {
    return this;
  }
  togglePublishAudio() {
    const state = this.audioIsPublish;
    this._publisher.publishAudio(!state);
    return this;
  }
  togglePublishVideo() {
    const state = this.videoIsPublish;
    this._publisher.publishVideo(!state);
    return this;
  }
  async updateVideoTrack(settings = {}) {
    const sourceSettings = this._publisher.properties;
    const newSettings = {
      ...sourceSettings,
      ...settings
    };
    const newMediaStream = await this._OV.getUserMedia(newSettings);
    const screenTrack = newMediaStream.getVideoTracks()[0];
    return this._publisher.replaceTrack(screenTrack);
  }
  publishWebcam(settings = {}) {
    this.updateVideoTrack({
      ...settings,
      videoSource: "webcam"
    });
  }
  publishScreen(settings = {}) {
    this.updateVideoTrack({
      ...settings,
      videoSource: "screen"
    });
  }
  leaveSession() {
    if (this._session) this._session.disconnect();
    this._session = undefined;
    this._publisher = undefined;
    this.participants = [];
    this.OV = undefined;

    window.removeEventListener("beforeunload", this.leaveSession);
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
    // Функция взята из примеров в доке OpenVidu
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
    // Функция взята из примеров в доке OpenVidu
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
        userInfo: JSON.parse(stream.connection.data).clientData
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
