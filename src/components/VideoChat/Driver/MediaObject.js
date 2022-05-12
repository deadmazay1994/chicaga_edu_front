export default class {
  constructor({ mediaStream, userInfo }) {
    const createId = () =>
      `${userInfo.name}__${Math.floor(
        Math.random() * (10000000 - 1000000 + 1)
      ) + 100000}`;
    this.stream = mediaStream;
    this.id = createId;
    this.userInfo = userInfo;
  }
}
