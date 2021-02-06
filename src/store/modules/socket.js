// import Socket from "@/mixins/socket.js";
import Io from "socket.io-client";

export default {
  namespaces: true,
  actions: {
    socketConnect({ commit, state, getters }, roomId) {
      let socket = Io(state.socketUrl);
      socket.emit("connect to room", {
        roomId,
        username: getters.user.name || "Гость",
        avatar: getters.user.avatar_link || getters.user.avatar
      });
      commit("setSocket", socket);
    },
    initSocketEvents({ dispatch }) {
      dispatch("onSendUsers");
      dispatch("onRecconnect");
      dispatch("onUpdateUsers");
    },
    onRecconnect({ state }) {
      state.socket.on("on reconnect to room", () => {
        console.log("recconect");
      });
    },
    queryGetUsers({ state }) {
      state.socket.emit("get users", state.roomId);
    },
    onSendUsers({ state, commit }) {
      state.socket.on("send users ids", users => {
        commit("setSocketUsers", users);
        if (users[0]) {
          commit("setActiveUser", users[0].id);
        }
      });
    },
    onUpdateUsers({ state, dispatch }) {
      state.socket.on("query update users", () => {
        dispatch("queryGetUsers", state.roomId);
      });
    },
    onSendErrors({ state, commit }) {
      state.socket.on("send errors", data => {
        commit("setSocketUserErrors", data);
      });
    },
    changeUserSetting({ state }, setting) {
      state.socket.emit("change setting", setting);
    }
  },
  mutations: {
    setSocket(state, socket) {
      state.socket = socket;
    },
    setSocketUsers(state, users) {
      users.forEach(user => {
        user.errorCounter = 0;
      });
      state.socketUsers = users;
    },
    setRoomId(state, roomId) {
      state.roomId = roomId;
    },
    setSocketUserErrors(state, data) {
      state.socketUsers.find(user => data.userId == user.id).errorCounter =
        data.errorCounter;
    },
    setActiveUser(state, id) {
      state.activeUser = id;
    }
  },
  state: {
    socket: false,
    socketUrl: "https://edu.chicaga.ru:5000",
    socketUsers: [],
    roomId: "",
    activeUser: false
  },
  getters: {
    socket: state => {
      return state.socket;
    },
    socketUrl: state => {
      return state.socketUrl;
    },
    socketUsers: state => {
      return state.socketUsers;
    },
    roomId: state => {
      return state.roomId;
    },
    activeUser: state => {
      return state.activeUser;
    }
  }
};
