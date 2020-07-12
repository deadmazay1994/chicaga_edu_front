import Io from "socket.io-client";

export default {
  data() {
    return {
      socket: false,
      url: "http://localhost:3000"
    };
  },
  methods: {
    connectToSocket(roomId) {
      roomId;
      this.socket = Io(this.url);
    }
  }
};
