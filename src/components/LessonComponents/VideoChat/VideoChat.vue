<template>
  <div class="video-chat vue-component">
    <div class="video-chat__big-video-wrap mb-2">
      <video-component
        class="video-chat__video video-chat__video--active"
        v-if="activeMedia"
        :mediaObject="activeMedia"
        :indexVideo="activeVideoIndex"
        :active="true"
        @toggleFullSize="onFullSizeToggle"
        @toggleCamera="onToggleCamera"
        @toggleMicro="onToggleMicro"
      />
    </div>
    <div class="video-chat__miniatures">
      <template v-for="(mediaObject, index) in medias.medias">
        <video-component
          v-show="Number(index) != Number(activeVideoIndex)"
          class="video-chat__video"
          :mediaObject="mediaObject"
          :indexVideo="index"
          @toggleFullSize="onFullSizeToggle"
          @toggleCamera="onToggleCamera"
          @toggleMicro="onToggleMicro"
          :key="index"
        />
      </template>
    </div>
    <!-- <v-btn v-on:click="joinToChat()">Присоедениться</v-btn> -->
  </div>
</template>

<script>
import Socket from "@/mixins/socket.js";
import VideoComponent from "./VideoComponent";
import Peer from "simple-peer";

import Medias from "./Classes/MediaObjects";

export default {
  name: "video-chat",
  data: function() {
    return {
      activeVideoIndex: 0,
      // Connection data
      lessonId: "lessonId",
      socket: false,
      initiator: false,
      medias: new Medias(),
      mediaObjects: [],
      peers: [],
      id: false,
      connectedId: [],
      outherIds: [],
      sockets: [],
      socketId: false,
      users: []
    };
  },
  methods: {
    // Логика переключения FullSize
    onFullSizeToggle(index) {
      this.activeVideoIndex = index;
    },
    // Логика переключения канала звука и видео
    onToggleCamera(state) {
      this.socket.emit("toggle camera", state);
    },
    onToggleCameraSocket() {
      this.socket.on("on toggle camera", data => {
        this.medias.getById(data.id).videoOff = data.state;
      });
    },
    onToggleMicro(state) {
      this.socket.emit("toggle micro", state);
    },
    onToggleMicroSocket() {
      this.socket.on("on toggle micro", data => {
        this.medias.getById(data.id).audioOff = data.state;
      });
    },
    // Логика подключения
    setId() {
      // this.id = window.location.hash;
      this.id = this.generateId();
    },
    setLessonId() {
      this.lessonId = window.location.hash.substr(1);
    },
    generateId() {
      return (
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      );
    },
    joinToChat() {
      // 1
      // Говорим остальным участникам чата, что мы подключились
      this.imHere();
    },
    imHere() {
      // Передаем свой уникальный id, чтобы получить всех список участников чата
      this.socket.emit("im here", { senderId: this.id });
      // Ожидаем пока сервер отправит всех юзеров
    },
    onSendUsers() {
      // 2
      // Сервер отправляет всех участников чата
      this.socket.on("send users", data => {
        // data = {
        // senderId,
        // users
        // socketId:
        // }
        // Записываем свой socket id
        this.socketId = data.socketId;
        // Получаем свое изображение и звук
        this.getMedia(stream => {
          this.users = data.users;
          this.createMyVideo(stream);
          // Для каждого юзера создаем пир
          this.createPeersForUsers(data.users, stream);
        });
      });
    },
    createPeersForUsers(users, stream) {
      // Создание пира для каждого подключенного юзера
      users.forEach(user => {
        let userId = user.id;
        // Создаем и пушим пир в массив пиров
        let initiator = true;
        let peer = this.createPeer(stream, userId, initiator);
        this.peers.push({
          id: userId,
          peer,
          signaling: false
        });
        this.intiatorOnSignal(peer, userId);
      });
      this.onUserDisconnect();
    },
    intiatorOnSignal(peer, userId) {
      // Как только инитатор просигналил
      peer.on("signal", signal => {
        // Проверка на то, что этот пир еще не сигналил и то, что сигнал это не новое предложение о подключении
        if (!this.getPeerById(userId).signaling || signal.type != "offer") {
          this.getPeerById(userId).signaling = true;
          // Отправляем предложение о соеденении
          this.sendMsgToUser(
            {
              signal,
              name: "signaling initiator",
              sender: this.socketId,
              forPeer: userId
            },
            userId
          );
        }
      });
    },
    createMyVideo(stream) {
      this.medias.push({
        im: true,
        stream,
        id: this.socket.id,
        audioOff: false,
        videoOff: false
      });
    },
    getMedia(callback) {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 1024, height: 768 },
          audio: true
        })
        .then(stream => {
          callback(stream);
        })
        .catch(() => {});
    },
    createPeer(stream, user = "", initiator = false) {
      let peer = new Peer({
        initiator,
        stream,
        trickle: false
      });
      peer.on("error", e => {
        console.log(e);
      });
      peer.on("stream", stream => {
        this.medias.push(
          {
            im: false,
            stream,
            id: user,
            audioOff: false,
            videoOff: false
          },
          // Передаем только того юзера чьи настройи надо отразить в объекте
          this.getUserById(user)
        );
      });
      return peer;
    },
    getUserById(id) {
      for (var i in this.users) {
        if (this.users[i].id == id) {
          return this.users[i];
        }
      }
      console.log("Данный юзер не найден");
      return false;
    },
    sendMsgToUser(msg, id) {
      this.socket.emit("send msg for user", {
        msg,
        id
      });
    },
    myPeerForSender(stream, senderId) {
      // Каждый сендер может посылать сигнал несколько раз
      // Чтобы на каждый сигнал не создавать пира, а создавать пира только для каждого инитатора делаем проверки
      // id = peer.id + "-" + sender гарантирует, что для каждого сендера будет создан свой пир
      let peer = false;
      if (this.peers.find(() => this.socketId + "-" + senderId) != undefined) {
        peer = this.peers.find(() => this.socketId + "-" + senderId);
      } else {
        this.peers.push({
          id: this.socketId + "-" + senderId,
          signaling: false,
          peer: this.createPeer(stream, senderId)
        });
        peer = this.peers[this.peers.length - 1];
      }
      if (peer) {
        return peer.peer;
      }
      console.log("Не получилось вернуть текущего пира для сендера");
      return false;
    },
    onGetMsg() {
      this.socket.on("get msg", data => {
        switch (data.msg.name) {
          // Получаем предложение о соеденении
          case "signaling initiator":
            // 4
            this.getMedia(stream => {
              // let peer = this.myPeerForSender(stream, data.msg.sender);
              let peer = this.createPeer(stream, data.msg.sender);
              peer.signal(data.msg.signal);
              // Как только просигналили
              peer.on("signal", signal => {
                // Отправляем инитатору ответный сигнал
                this.sendMsgToUser(
                  {
                    sendeId: this.id,
                    signal,
                    name: "signaling answer",
                    forPeer: data.msg.forPeer
                  },
                  data.msg.sender
                );
              });
            });
            break;
          case "signaling answer":
            // 5
            // Получаем ответный сигнал от пира и соеденеяемся с ним
            this.getPeerById(data.msg.forPeer).peer.signal(data.msg.signal);
            break;
          default:
            break;
        }
      });
    },
    getPeerById(id) {
      return this.peers.find(peer => peer.id == id);
    },
    onUserDisconnect() {
      this.socket.on("user disconnect", socketId => {
        socketId;
        this.medias.delete(socketId);
      });
    }
  },
  computed: {
    activeMedia() {
      return this.medias.medias[this.activeVideoIndex];
    }
  },
  components: {
    VideoComponent
  },
  props: [],
  mixins: [Socket],
  mounted() {
    this.setLessonId();
    this.setId();
    this.socket = this.connectToSocket();
    this.onSendUsers();
    this.onGetMsg();
    this.joinToChat();
    this.onToggleCameraSocket();
    this.onToggleMicroSocket();

    this.socket.on("ping", () => {
      this.socket.emit("pong");
    });
  }
};
</script>

<style lang="sass" scoped>
.video-chat
  position: relative
  display: flex
  overflow-y: auto
  flex-direction: column
  align-items: center
  justify-content: space-between
  &__big-video-wrap
    height: 70%
    width: 100%
  &__miniatures
    width: 100%
    display: flex
    justify-content: center
  &__video
    width: 30%
    margin-right: 1%
    margin-bottom: 5px
    &::last-child
      margin-right: 0
  &__video--active
    width: 100%
    margin: 0
</style>
