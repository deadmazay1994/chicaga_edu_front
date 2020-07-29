// import Socket from "@/mixins/socket.js";
import Io from "socket.io-client";

export default {
  namespaces: true,
  actions: {
    socketConnect({ commit, state }, lessonId) {
      if (!state.socket) {
        // state.socket = Socket.connectToSocket(lessonId);
        // console.log(Socket)
        let socket = Io(state.socketUrl);
        socket.emit("connect to room", lessonId);
        commit("setSocket", socket);
      }
    }
  },
  mutations: {
    setSocket(state, socket) {
      state.socket = socket;
    }
  },
  state: {
    socket: false,
    socketUrl: "https://edu.chicaga.ru:5000"
  },
  getters: {
    socket: state => {
      return state.socket;
    }
  }
};
