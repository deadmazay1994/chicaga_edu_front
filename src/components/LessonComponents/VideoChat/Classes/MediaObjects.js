export default class {
  constructor() {
    this.medias = [];
  }
  push(mediaData, user = false) {
    // Второй параметр это юзер настройки которого надо описать тут
    let error = 0;
    this.medias.forEach(media => {
      // Если такой юзер уже существует, то не добавляем его
      if (mediaData.id == media.id) {
        error = 1;
        console.log("This user is exist ", mediaData.id);
      }
    });
    error;
    if (!error) {
      if (user) {
        mediaData.videoOff = user.videoOff;
        mediaData.audioOff = user.audioOff;
      }
      this.medias.push(new myMedia(mediaData));
      return true;
    } else {
      return false;
    }
  }
  getById(id) {
    if (this.medias.find(media => media.id == id)) {
      return this.medias.find(media => media.id == id);
    } else {
      console.log("This user does't exitst ", id);
      return false;
    }
  }
  mediaId(id) {
    for (var i in this.medias) {
      if (this.medias[i].id == id) {
        return i;
      }
    }
    console.log("This user does't exitst ", id);
  }
  delete(id) {
    console.log(id, this.medias);
    if (this.medias[this.mediaId(id)]) {
      if (!this.medias[this.mediaId(id)].im) {
        this.medias.splice(this.mediaId(id), 1);
      }
    }
  }
}

class myMedia {
  constructor(data) {
    this.im = data.im;
    this.stream = data.stream;
    this.id = data.id;
    this.audioOff = data.audioOff;
    this.videoOff = data.videoOff;
    this.avatar = data.avatar;
    this.name = data.name;
  }
}
