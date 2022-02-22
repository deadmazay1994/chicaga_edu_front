import MediaObject from "MediaObject";

export default class {
  constructor() {
    this.participants = [];
    this.myMediaObject = null;
    this.connected = false;
  }
  createMyMediaObject({ mediaStream, userInfo }) {
    // TODO
    // Удалить все аудиотреки
    this.myMediaObject = new MediaObject({
      mediaStream,
      userInfo,
    });
  }
  get allParticipants() {
    return [
      {
        itsMe: true,
        mediaObject: this.myMediaObject,
      },
      ...this.participants.map((participant) => ({
        mediaObject: participant,
        itsMe: false,
      })),
    ];
  }
  connect() {
    if (!this.myMediaObject)
      throw new Error(
        "Before connecting call createMyMediaObject method is required"
      );
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connected = true;
        this.participants.push(this.myMediaObject);
        this.participants.push(this.myMediaObject);
        this.participants.push(this.myMediaObject);
        resolve();
      }, 1000);
    });
  }
  disconnect() {
    return new Promise((resolve) => {
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
}
