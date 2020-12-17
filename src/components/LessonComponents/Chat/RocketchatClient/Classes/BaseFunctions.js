const sha256 = require("js-sha256").sha256;

export default {
  send(msg) {
    // Отправка сообщения
    this.socket.send(JSON.stringify(msg));
  },
  pong() {
    this.send({
      msg: "pong"
    });
  },
  getMsgData(msgEvent) {
    if (msgEvent.data) {
      return JSON.parse(msgEvent.data);
    }
    return { msg: "msg data is empty", id: "msg data is empty" };
  },
  getMsgName(msgEvent) {
    return this.getMsgData(msgEvent).msg || "msg name is empty";
  },
  getMsgId(msgEvent) {
    return this.getMsgData(msgEvent).id || "msg id is empty";
  },
  createId() {
    return Math.random().toString(36);
  },
  hesh(str) {
    // Кодирует строку в формат sha256
    return sha256(str);
  }
};
