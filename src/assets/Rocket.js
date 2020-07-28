import axios from "axios";

const sha256 = require("js-sha256").sha256;

export default class Rocket {
  constructor(socketUrl, login, password) {
    // Задаем начальные параметры
    this.socketUrl = socketUrl;
    this.connected = false;
    this.socket = false;
    this.response = false;
    this.token = false;
    this.userId = false;

    this.history = false;
    this.subscribeResponse = false;
    this.registerResponse = false;
    this.responseCreatePrivateGroup = false;

    this.room = false;

    this.login = login;
    this.password = password;

    this.logined = false;

    this.newMsgCallback = () => {};

    this.setRestApiUrl();

    // Создаем сокет для общения с сервером
    this.createSocket();

    this.socket.onopen = () => {
      // Событие соеденения с сервером
      this.connect();
    };

    this.socket.onmessage = e => {
      // Событие принятия сообщения на сервер
      this.socketOnMessage(e);
      this.msgCallback();
    };
  }

  msgCallback() {
    // Сервер отправляет response, в котором указывает id сообщения и/или свамо сообщение
    // Для каждого id и сообщения, нужно выполнять свои callback
    // Данный метод и занимается этим
    switch (this.msg) {
      case "connected":
        this.logining(this.login, this.password);
        break;
      // case "added":
      //     this.onLogin()
    }

    switch (this.msgId) {
      case "loadHistory":
        this.history = this.response;
        break;
      case "register":
        this.registerResponse = this.response;
        break;
      case "subscribe":
        this.subscribeResponse = this.response;
        break;

      case "createPrivateGroup":
        this.responseCreatePrivateGroup = this.response;
        break;

      case "login":
        this.onLogin();
        break;

      case "id":
        this.newMsgCallback(this.response);
        break;
    }
  }

  socketOnMessage(e) {
    this.setLastMsg(e);
    // Чтобы сервер не разорвал соеденение переодически отправляем ему pong
    this.pong();
  }

  createSocket() {
    this.socket = new WebSocket(this.socketUrl);
  }

  connect() {
    let notConnect = !this.connected;
    if (notConnect) {
      this.send({
        msg: "connect",
        version: "1",
        support: ["1"]
      });
    } else {
      console.log("Соеденение уже установлено");
    }
  }

  logining(login, password) {
    // Запрос на авторизацию
    this.send({
      msg: "method",
      method: "login",
      id: "login",
      params: [
        {
          user: { username: login },
          password: {
            digest: this.hesh(password),
            algorithm: "sha-256"
          }
        }
      ]
    });
  }

  subscribe(room) {
    this.send({
      msg: "sub",
      id: "subscribe",
      name: "stream-room-messages",
      params: [room, false]
    });
  }
  register(user) {
    this.send({
      msg: "method",
      method: "registerUser",
      id: "register",
      params: [
        {
          email: String(user.email),
          pass: String(user.password),
          name: String(user.name)
        }
      ]
    });

    return this.checkProperty("registerResponse");
  }

  async setRoom(roomId) {
    this.room = await this.getRoom(false, roomId);
  }

  async loadHistory(roomId, time = false, size = 50) {
    let pagination = null;
    if (time) {
      // Если требуется загрузить с какого-то сообщения
      pagination = { $date: time };
    }
    // Загружаем исторю комнаты
    this.send({
      msg: "method",
      method: "loadHistory",
      id: "loadHistory",
      params: [roomId, pagination, size, { $date: time }]
    });
    let response = await this.checkProperty("history");
    return response;
  }

  async loadMoreMsg(roomId, lastMsg) {
    return await this.loadHistory(roomId, lastMsg.ts.$date);
  }

  sendFile(description, room, file) {
    this.post("rooms.upload/" + room, {
      file,
      description
    });
  }

  createMsg(msg, room, file = false) {
    let msgId = Math.random().toString(36);
    if (file) {
      this.sendFile(msg, room, file);
    }

    if (msg != "") {
      this.send({
        msg: "method",
        method: "sendMessage",
        id: "sendMessage",
        params: [
          {
            rid: room,
            id: msgId,
            msg: msg
          }
        ]
      });
    }
  }

  updateMsgs(msgs) {
    // Дополняем данные с сервера
    function uppendToDate(t) {
      // to string
      t += "";
      return t.length >= 2 ? t : "0" + t;
    }

    msgs.forEach(msg => {
      let date = new Date(msg._updatedAt.$date || msg._updatedAt);
      msg.u.avatar = this.getAvatar(msg.u.username);
      msg.time =
        uppendToDate(date.getHours()) + ":" + uppendToDate(date.getMinutes());
    });

    return msgs;
  }

  randomStr(len, arr) {
    var ans = "";
    for (var i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  checkProperty(property) {
    // Возращаем промис в котором проверяем n раз в секунду обновил ли сервер свойство
    // Если да, то выполняем resolve
    return new Promise(resolve => {
      let interval = setInterval(() => {
        if (this[property]) {
          clearInterval(interval);
          resolve(this[property]);
        }
      }, 50);
    });
  }

  async checkLogined() {
    return this.checkProperty("logined");
  }

  onLogin() {
    // Событие авторизации
    this.logined = true;
    if (this.response.result) {
      this.token = this.response.result.token;
      this.userId = this.response.result.id;
      console.log(this.token, this.userId);
    } else {
      this.error = this.response.error.reason;
    }
  }

  get msgId() {
    return this.response.id;
  }

  get msg() {
    return this.response.msg;
  }

  setLastMsg(event) {
    this.response = JSON.parse(event.data);
  }

  send(msg) {
    // Отправка сообщения
    this.socket.send(JSON.stringify(msg));
  }

  setRestApiUrl() {
    this.restApiUrl =
      "https://" + this.socketUrl.split("wss://")[1].split("/websocket")[0];
  }

  async searchMsg(roomId, searchText, count = 10) {
    return await this.get("chat.search", {
      roomId,
      searchText,
      count
    });
  }

  async getUser(id) {
    let user = await this.get("users.info", {
      userId: id
    });
    // user.awatar = awatar
    return user;
  }

  async getUsers(ids) {
    let users = [];
    for (let index = 0; index < ids.length; index++) {
      const id = ids[index];
      let data = await this.getUser(id);
      users.push(data.data.user);
    }
    return users;
  }

  getAvatar(name) {
    return this.restApiUrl + "/avatar/" + name;
    // return await this.get("users.getAvatar", {
    //     userId: id
    // })
    // return await axios.get("http://chat.trivers.ru/avatar/rawil")
  }
  getRoom(roomName, roomId) {
    let query = {};
    if (roomName) {
      query = {
        roomName
      };
    } else {
      query = {
        roomId
      };
    }
    try {
      return this.get("rooms.info", query);
    } catch (error) {
      console.log(error);
    }
  }
  getRoomQuery(roomName, roomId) {
    if (roomName) {
      return {
        roomName
      };
    } else {
      return {
        roomId
      };
    }
  }

  getMembers(roomName, roomId) {
    let query = {};
    if (roomName) {
      query = {
        roomName
      };
    } else {
      query = {
        roomId
      };
    }
    return this.get("channels.members", query);
  }
  getChannel(roomName, roomId) {
    let query = {};
    if (roomName) {
      query = {
        roomName
      };
    } else {
      query = {
        roomId
      };
    }
    return this.get("channels.info", query);
  }
  getFilesLink(msg) {
    let getFullPath = path => {
      return path != undefined
        ? this.restApiUrl + path
        : console.log("Input is incorrect");
    };
    let formatAttachmentUrl = attachmentUrl => {
      return attachmentUrl != undefined
        ? `${attachmentUrl}?rc_uid=${this.userId}&rc_token=${this.token}`
        : console.log("Input is incorrect");
    };

    // eslint-disable-next-line no-prototype-builtins
    if (msg.hasOwnProperty("attachments")) {
      if (msg.attachments) {
        msg.attachments.forEach(attachment => {
          attachment.image_url = formatAttachmentUrl(
            getFullPath(attachment.image_url)
          );
          attachment.image_preview = formatAttachmentUrl(
            getFullPath(attachment.image_preview)
          );
          attachment.title_link = formatAttachmentUrl(
            getFullPath(attachment.title_link)
          );
        });
        return msg.attachments;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async createUser(user) {
    return await this.post("users.create", user);
  }

  async createPrivateGroup(data) {
    return await this.post("groups.create", data);
  }

  async post(method, data, contentType = "application/json") {
    let url = this.restApiUrl + "/api/v1/" + method;
    let formData = new FormData();

    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        formData.append(key, value);
      }
    }

    return await axios({
      method: "POST",
      url,
      headers: {
        "X-Auth-Token": this.token,
        "X-User-Id": this.userId,
        "Content-type": contentType
      },
      data: formData
    });
  }

  async get(method, data) {
    let query = "";
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        query += key + "=" + element + "&";
      }
    }
    query = query.slice(0, query.length - 1);

    let url = this.restApiUrl + "/api/v1/" + method + "?" + query;
    let response = await axios({
      method: "get",
      url,
      headers: {
        "X-Auth-Token": this.token,
        "X-User-Id": this.userId
      }
    });

    document.cookie = "X-Auth-Token=" + this.token;
    document.cookie = "X-User-Id=" + this.userId;

    return response;
  }

  pong() {
    // На ping отвечаем pong
    if (this.response.msg == "ping") {
      this.send({
        msg: "pong"
      });
    }
  }

  hesh(str) {
    // Кодирует строку в формат sha256
    return sha256(str);
  }
}
