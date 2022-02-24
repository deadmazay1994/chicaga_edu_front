import MediaObject from "./MediaObject";
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
axios.defaults.headers.post["Content-Type"] = "application/json";

const defaulSourseSettings = {
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
    this.connected = false;
    this._serverURL = serverURL;
    this._secret = secret;
    this._OV = new OpenVidu();
    this._session = this._OV.initSession();

    this._session.on("streamCreated", this._streamCreatedHandler.bind(this));
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
  }
  get allParticipants() {
    return [
      {
        itsMe: true,
        mediaObject: this.myMediaObject
      },
      ...this.participants.map(o => ({ itsMe: false, mediaObject: o }))
    ];
  }
  async connect(roomId, { clientData, sourceSettings }) {
    // if (!this.myMediaObject)
    //   throw new Error(
    //     "Before connecting call createMyMediaObject method is required"
    //   );
    if (!sourceSettings) sourceSettings = defaulSourseSettings;
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
    console.log(sourceSettings);
    this._publisher = this._OV.initPublisher(undefined, sourceSettings);
    this._createMyMediaObject(modifyClientData);
    this._session.publish(this._publisher);
    window.addEventListener("beforeunload", this._leaveSession.bind(this));
  }
  disconnect() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.connected = false;
        resolve();
      }, 1000);
    });
  }
  toggleAudioShow() {
    console.log("Mute is toggled");
  }
  toggleVideoShow() {
    console.log("Video show is toggled");
  }
  _leaveSession() {
    if (this._session) this._session.disconnect();
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
  _streamCreatedHandler({ stream }) {
    const subscriber = this._session.subscribe(stream);
    this.participants.push(
      new MediaObject({
        mediaStream: subscriber,
        userInfo: JSON.parse(stream.connection.data).clientData
      })
    );
  }
}
