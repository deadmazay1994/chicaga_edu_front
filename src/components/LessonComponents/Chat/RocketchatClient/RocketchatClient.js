"use strict";

import BaseFunctions from "./Classes/BaseFunctions";
import User from "./Classes/User";

export default class Rocket {
  constructor(wssUrl) {
    Object.assign(this, BaseFunctions);
    this.connectedToChatServer = false;
    this.socket = new WebSocket(wssUrl);
    this.socket.onopen = () => this.connectWithRocketchat();
    this.socket.onmessage = e => this.onmessage(e);
    this.user = null;
    this.functionsQueueAfterConnecting = [];
  }
  logining(username, password) {
    if (this.connectedToChatServer) {
      this.user = new User(this.socket);
      this.user.logining(username, password);
    } else {
      this.pushFuctionToQueueAfterConnecting("logining", arguments);
    }
  }
  pushFuctionToQueueAfterConnecting(name, args) {
    this.functionsQueueAfterConnecting.push({
      name,
      args
    });
  }
  connectWithRocketchat() {
    this.send({
      msg: "connect",
      version: "1",
      support: ["1"]
    });
  }
  onmessage(msg) {
    switch (this.getMsgName(msg)) {
      case "ping":
        this.pong();
        break;
      case "connected":
        this.connectedToChatServer = true;
        break;
    }
  }
}
