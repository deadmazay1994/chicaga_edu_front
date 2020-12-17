import BaseFunctions from "./BaseFunctions";

export default class User {
  constructor(socket) {
    Object.assign(this, BaseFunctions);
    this.socket = socket;
    console.log(socket);
  }
  logining(username, password) {
    this.send({
      msg: "method",
      method: "login",
      id: this.createId(),
      params: [
        {
          user: { username: username },
          password: {
            digest: this.hesh(password),
            algorithm: "sha-256"
          }
        }
      ]
    });
  }
}
