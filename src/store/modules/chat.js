import Rocket from "@/assets/Rocket.js";

const SITEURL = "https://edu.chicaga.ru";

export default {
  namespaces: true,
  actions: {
    async initChat(ctx, data) {
      let rocket = new Rocket(data.socketUrl, data.login, data.password);
      ctx.commit("setLogin", data.login);
      ctx.commit("updateRocket", rocket);
      ctx.commit("updateChatElement", data.chatElem);
      ctx.commit("updateRoom", data.room);
      await rocket.checkLogined().then(() => {
        // Функция выполняется срауз после логина
        ctx.dispatch("onLogin", {
          login: data.login,
          password: data.password
        });
      });
    },
    async onLogin(ctx, data) {
      let rocket = ctx.getters.getRocket;
      if (rocket.error == "User not found") {
        await rocket.register({
          name: data.login,
          password: data.password,
          email:
            Math.random()
              .toString(36)
              .replace(/[^a-z]+/g, "") + "@mail.com"
        });
      }
      ctx.dispatch("toggleChannel", ctx.getters.getRoom);
    },
    async toggleChannel(ctx, name) {
      ctx.commit("updateLoading", true);

      ctx.commit("updateRoom", name);
      let rocket = ctx.getters.getRocket;
      // Чтобы каждый раз не загружаеть юзера, который отправил сообщение
      // Загружаем всех изеров в комнате сразу
      // Передаем либо roomName, либо roomId
      await ctx.dispatch("setMembers", {
        roomName: ctx.getters.getRoom,
        roomId: false
      });

      rocket.getRoom(ctx.getters.getRoom).then(room => {
        ctx.commit("updateRoomId", room.data.room._id);
        // Получаем id канала
        let id = room.data.room._id;
        rocket.loadHistory(id, false, 1000).then(r => {
          // Подгружаем историю чата и записываем ее в массив сообщений
          // Название группы-ключ в массиве сообщений
          let data = {
            data: r.result.messages,
            room: ctx.getters.getRoom
          };
          // Данные, которые приходят с сервера не удовлетворяют нам
          // Их надо дополнять при помощи данной функции
          data.data = rocket.updateMsgs(data.data.reverse());
          data.data.forEach(msg => {
            for (let i in ctx.getters.getMembers) {
              let user = ctx.getters.getMembers[i].find(
                member => member.username == msg.u.username
              );
              if (user) {
                msg.u.name = user.name;
              }
            }
          });
          // Записываем данные
          ctx.commit("appendMsgs", data);
          // Изменяем текущие сообщения
          ctx.commit("updateCurrentMsgs", data.room);
          // Подписываемся на все следующее сообщения
          rocket.subscribe(ctx.getters.getRoomId);
          // Событие прихода нового сообщения
          rocket.newMsgCallback = r => {
            ctx.dispatch("newMsgCallback", r);
          };
          ctx.dispatch("scrollToBottom");
          ctx.commit("updateLoading", false);
        });
      });
    },
    loadMoreMsg(ctx) {
      let rocket = ctx.getters.getRocket;
      let date =
        ctx.getters.getCurrentMsgs[ctx.getters.getCurrentMsgs.length - 1]
          ._updatedAt.$date;
      rocket.loadHistory(ctx.getters.getRoom, date).then(r => {
        let data = {
          data: r.result.messages,
          room: ctx.getters.getRoom
        };
        // Данные, которые приходят с сервера не удовлетворяют нам
        // Их надо дополнять при помощи данной функции
        data.data = rocket.updateMsgs(data.data.reverse());
      });
    },
    sendMsg(ctx) {
      // Отправка сообщений
      ctx.getters.getRocket.createMsg(
        ctx.getters.getInput,
        ctx.getters.getRoomId,
        ctx.getters.getAttachments
      );
    },
    newMsgCallback({ commit, getters, state, dispatch }, r) {
      let rocket = getters.getRocket;
      let msgs = rocket.updateMsgs(r.fields.args);
      let senderName;
      for (let key in getters.getMembers) {
        senderName = getters.getMembers[key].find(
          memeber => memeber.username == r.fields.args[0].u.username
        ).name;
      }
      r.fields.args[0].u.name = senderName;
      commit("appendMsgs", { data: msgs, room: getters.getRoom });
      dispatch("scrollToBottom");
      state.preload = false;
      if (!state.chatIsOpen) {
        state.newMsgsNum++;
        new Audio("/audios/newmsg.mp3").play();
      }
    },
    async setMembers(ctx, room) {
      // Функция получает всех подписчиков комнаты
      let res = await ctx.getters.getRocket.getMembers(
        room.roomName,
        room.roomId
      );
      let memberIds = {};
      res.data.members.forEach(member => {
        // Формируем массив для получения всех пользователей данной группы
        let key = ctx.getters.getRoom;
        if (!(key in memberIds)) {
          memberIds.key = [];
        }
        memberIds.key.push(member._id);
      });
      ctx.commit("appendMembers", {
        roomId: ctx.getters.getRoom,
        members: res.data.members
      });
      let userIsSubscribed = res.data.members.find(
        member => member.username == ctx.getters.getLogin
      );
      if (!userIsSubscribed) {
        try {
          let subR = await ctx.getters.getRocket.subscribeToGroup(
            room.roomName
          );
          if (subR) {
            await ctx.dispatch("setMembers", {
              roomName: ctx.getters.getRoom,
              roomId: false
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    createUserInChat(ctx, user) {
      ctx.getters.getRocket.createUser(user);
    },
    async createChannel(ctx, data) {
      let rocket = ctx.getters.getRocket;
      return rocket.createPrivateGroup(data);
    },
    async searchMsg(ctx, text) {
      ctx.commit("updateLoading", true);

      let res = await ctx.getters.getRocket.searchMsg(
        ctx.getters.getRoomId,
        text
      );
      let msgs = {
        data: ctx.getters.getRocket.updateMsgs(res.data.messages),
        room: "search"
      };
      ctx.commit("setMsgs", msgs);
      // Изменяем текущие сообщения
      ctx.commit("updateCurrentMsgs");

      ctx.commit("updateLoading", false);
    },
    scrollToBottom({ getters }) {
      setTimeout(() => {
        let dialog = getters.getChatElem.getElementsByClassName("masseges")[0];
        if (dialog) {
          dialog.scrollTop = dialog.scrollHeight;
        }
      }, 70);
    }
  },
  mutations: {
    updateChatElement(state, el) {
      state.chatElem = el;
    },
    updateLogined(state, logined) {
      state.logined = logined;
    },
    setLogin(state, login) {
      state.login = login;
    },
    updateRocket(state, rocket) {
      state.rocket = rocket;
    },
    setMsgs(state, msgs) {
      if (!(msgs.room in state.msgs)) {
        state.msgs[msgs.room] = [];
      }
      let updatedMsgs = [];
      msgs.data.forEach(msg => {
        msg.attachments = state.rocket.getFilesLink(msg);
        updatedMsgs.push(msg);
      });
      state.msgs[msgs.room] = updatedMsgs;
    },
    appendMsgs(state, msgs) {
      if (!(msgs.room in state.msgs)) {
        state.msgs[msgs.room] = [];
      }
      msgs.data.forEach(msg => {
        state.legardoUsers.forEach(user => {
          if (user.gid == msg.u.username) {
            msg.u.name = user.fio;
            if (user.image != SITEURL) {
              msg.u.avatar = user.image;
            }
          }
        });
        msg.attachments = state.rocket.getFilesLink(msg);

        // Проверка на уникальность сообщения в массиве сообщений
        if (state.msgs[msgs.room].length == 0) {
          // Если массив пуст, то последубщий перебор и пуш в переборе не будут произведены
          state.msgs[msgs.room].push(msg);
        } else {
          let unique = 1;
          for (const key in state.msgs[msgs.room]) {
            // eslint-disable-next-line no-prototype-builtins
            if (state.msgs[msgs.room].hasOwnProperty(key)) {
              const oldMsg = state.msgs[msgs.room][key];
              // Если сообщение не уникальное, переключаем флажок
              oldMsg._id == msg._id ? (unique = 0) : false;
              break;
            }
          }
          // Если уникальное сообщение, то добавляем его в массив сообщений
          unique ? state.msgs[msgs.room].push(msg) : false;
        }
      });
    },
    appendMembers(state, members) {
      state.members[members.roomId] = members.members;
    },
    updateInput(state, value) {
      state.currentInput = value;
    },
    updateCurrentMsgs(state, value) {
      // Если поиск активен, то текущая коммната как-бы становится search
      if (state.searchStatus) {
        state.currentMsgs = state.msgs["search"];
      } else {
        state.currentMsgs = state.msgs[value];
      }
    },
    updateRoomId(state, value) {
      state.roomId = value;
    },
    updateRoom(state, value) {
      state.room = value;
    },
    updateFile(state, value) {
      console.log(value);
      state.attachments = value;
    },
    updateLoading(state, value) {
      state.loading = value;
    },
    toggleOpenChat(state) {
      state.chatIsOpen = !state.chatIsOpen;
      state.newMsgsNum = 0;
    },
    updatePreload(state) {
      state.preload = true;
    }
  },
  state: {
    rocket: false,
    chatElem: false,
    login: "",
    msgs: {},
    members: [],
    legardoUsers: [],
    logined: false,
    currentInput: "",
    room: "",
    roomId: "",
    currentMsgs: false,
    attachments: false,
    searchStatus: false,
    loading: true,
    chatIsOpen: true,
    newMsgsNum: 0,
    preload: null
  },
  getters: {
    allMsgs(state) {
      return state.msgs;
    },
    getChatElem(state) {
      return state.chatElem;
    },
    getLogin(state) {
      return state.login;
    },
    getCurrentMsgs(state) {
      return state.currentMsgs;
    },
    getRocket(state) {
      return state.rocket;
    },
    getInput(state) {
      return state.currentInput;
    },
    getRoom(state) {
      return state.room;
    },
    getRoomId(state) {
      return state.roomId;
    },
    getMembers(state) {
      return state.members;
    },
    getAttachments(state) {
      return state.attachments;
    },
    getSearchStatus(state) {
      return state.searchStatus;
    },
    getLoading(state) {
      return state.loading;
    },
    getLegardoUsers(state) {
      return state.legardoUsers;
    },
    chatIsOpen(state) {
      return state.chatIsOpen;
    },
    newMsgsNum: state => state.newMsgsNum,
    preload(state) {
      return state.preload;
    }
  }
};
