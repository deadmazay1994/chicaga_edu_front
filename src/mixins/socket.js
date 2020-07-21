import Io from "socket.io-client";

export default {
  data() {
    return {
      socket: false,
      socketUrl: "http://localhost:5000"
      // socketUrl: "https://edu.chicaga.ru:5000"
    };
  },
  methods: {
    connectToSocket(roomId) {
      roomId;
      let socket = Io(this.socketUrl);
      return socket;
    }
  }
};
