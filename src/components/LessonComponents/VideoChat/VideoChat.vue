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
  </div>
</template>

<script>
import VideoComponent from "./VideoComponent";
import Peer from "simple-peer";

import Medias from "./Classes/MediaObjects";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "video-chat",
  data: function() {
    return {
      activeVideoIndex: 0,
      // Connection data
      lessonId: "lessonId",
      initiator: false,
      medias: new Medias(),
      mediaObjects: [],
      peers: [],
      id: false,
      connectedId: [],
      outherIds: [],
      sockets: [],
      dependentPeers: [],
      socketId: false,
      users: []
    };
  },
  methods: {
    ...mapActions(["socketConnect", "toggleChannel"]),
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
    setLessonId() {
      this.lessonId = this.$route.params.id;
    },
    joinToChat() {
      // Удаляем все прошлые подключения
      this.peers = [];
      // 1
      // Говорим остальным участникам чата, что мы подключились
      console.log("Пытаемся сказать, что мы тут");
      this.imHere();
      console.log("Успешно сказали что я тут");
    },
    imHere() {
      // Передаем свой уникальный id, чтобы получить всех список участников чата
      this.socket.emit("im here", { senderId: this.id, roomId: this.lessonId });
      // Ожидаем пока сервер отправит всех юзеров
    },
    onSendUsers() {
      // 2
      // Сервер отправляет всех участников чата
      this.socket.on("send users", data => {
        console.log("Получаем всех юзеров в чате");
        console.log(data);
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
        console.log("Получили всех юзеров и создали для них пиры");
      });
    },
    createPeersForUsers(users, stream) {
      // Создание пира для каждого подключенного юзера
      users.forEach(user => {
        let userId = user.id;
        // Создаем и пушим пир в массив пиров
        let initiator = true;
        let peer = this.createPeer(
          stream,
          { id: userId, avatar: user.avatar, name: user.username },
          initiator
        );
        this.intiatorOnSignal(peer, userId);
        this.peers.push({
          id: userId,
          peer,
          signaling: false
        });
      });
      this.onUserDisconnect();
    },
    createMyVideo(stream) {
      this.medias.push({
        im: true,
        stream,
        id: this.socket.id,
        audioOff: false,
        videoOff: false,
        avatar: this.user.avatar_link,
        name: this.user.name
      });
      this.$forceUpdate();
    },
    getMedia(callback) {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 102, height: 76 },
          // video: { width: 1024, height: 768 },
          audio: true
        })
        .then(stream => {
          callback(stream);
        })
        .catch(() => {});
    },
    createPeer(stream, user = {}, initiator = false) {
      let peer = new Peer({
        initiator,
        stream,
        trickle: true,
        allowHalfTrickle: true,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:global.stun.twilio.com:3478?transport=udp" }
          ]
        }
      });
      peer.on("error", e => {
        console.log(e);
        console.log(this.medias);
        // this.getMedia(stream => {

        // })
        // location.reload();
        // this.medias = new Medias();
        // this.joinToChat();
      });
      peer.on("connect", () => {
        console.log("connect");
      });
      peer.on("stream", stream => {
        this.medias.push(
          {
            im: false,
            stream,
            id: user.id,
            avatar: user.avatar_link,
            name: user.name
          },
          // Передаем только того юзера чьи настройи надо отразить в объекте
          this.getUserById(user.id)
        );
      });
      console.log("Создали пир", initiator ? "Инитатор" : "Не инитатор");
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
        id,
        roomId: this.lessonId
      });
    },
    createDependedPeer(stream, data) {
      let peer = this.createPeer(stream, {
        id: data.msg.sender,
        avatar: data.msg.avatar,
        name: data.msg.username
      });
      this.dependentPeers.push({
        peer,
        id: data.msg.sender
      });
      return peer;
    },
    getDependedPeer(stream, data) {
      let peer = this.dependentPeers.find(peer => peer.id == data.msg.sender);
      if (peer) {
        return { peer, isNewPeer: false };
      } else {
        return {
          peer: this.createDependedPeer(stream, data),
          isNewPeer: true
        };
      }
    },
    intiatorOnSignal(peer, userId) {
      // Как только инитатор просигналил
      peer.on("signal", signal => {
        console.log("Пытаемся просигналить (инитатор)");
        // Проверка на то, что этот пир еще не сигналил и то, что сигнал это не новое предложение о подключении
        // if (!this.getPeerById(userId).signaling || signal.type != "offer") {
        this.getPeerById(userId).signaling = true;
        // Отправляем предложение о соеденении
        console.log("Инитатор отправляет сигнал ", userId);
        this.sendMsgToUser(
          {
            signal,
            name: "signaling initiator",
            username: this.user.name,
            avatar: this.user.avatar_link,
            sender: this.socketId,
            forPeer: userId
          },
          userId
        );
        console.log("Успешно просигналили юзеру");
        // }
      });
    },
    onGetMsg() {
      this.socket.on("get msg", data => {
        switch (data.msg.name) {
          // Получаем предложение о соеденении
          case "signaling initiator":
            // 4
            this.getMedia(stream => {
              let depended = this.getDependedPeer(stream, data);
              let peer = depended.peer;
              // Как только просигналили,
              // if (depended.isNewPeer) {
              peer.on("signal", signal => {
                console.log("Получили сигнал инитатора");
                // Отправляем инитатору ответный сигнал
                console.log("Отправляеум ответный сигнал ", data.msg.forPeer);
                this.sendMsgToUser(
                  {
                    sendeId: this.id,
                    sender: this.socketId,
                    signal,
                    name: "signaling answer",
                    forPeer: data.msg.forPeer
                  },
                  data.msg.sender
                );
              });
              // }
              peer.signal(data.msg.signal);
            });
            break;
          case "signaling answer":
            console.log("Получили сигнал ответа");
            // 5
            // Получаем ответный сигнал от пира и соеденеяемся с ним
            // if (data.msg.signal.type == "answer") {
            if (this.getPeerById(data.msg.forPeer)) {
              console.log(this.getPeerById(data.msg.forPeer));
              this.getPeerById(data.msg.forPeer).peer.signal(data.msg.signal);
              console.log("Использовали сигнал ответа");
            }
            // }
            break;
        }
      });
    },
    disconnectPeers() {
      this.peers.forEach(peer => peer.peer.destroy());
      this.medias = false;
      this.$forceUpdate();
    },
    getPeerById(id) {
      return this.peers.find(peer => peer.id == id);
    },
    onUserDisconnect() {
      this.socket.on("user disconnect", socketId => {
        socketId;
        this.medias.delete(socketId);
      });
    },
    onConnectToGroup() {
      this.socket.on("connect to group", data => {
        this.lessonId = data.roomId;
        this.medias = new Medias();
        this.joinToChat();
        // console.log(this.$route.params.id + data.groupName)
        // this.toggleChannel(this.$route.params.id + "___" + data.groupName);
      });
    },
    onReturnInGroup() {
      this.socket.on("on return in group", () => {
        this.lessonId = this.$route.params.id;
        this.medias = new Medias();
        this.joinToChat();
      });
    },
    pingpong() {
      this.socket.on("ping", () => {
        this.socket.emit("pong");
      });
    }
  },
  computed: {
    ...mapGetters(["socket", "user"]),
    activeMedia() {
      if (this.activeVideoIndex in this.medias.medias) {
        return this.medias.medias[this.activeVideoIndex];
      }
      return false;
    }
  },
  components: {
    VideoComponent
  },
  mounted() {
    this.setLessonId();
    this.onSendUsers();
    this.onGetMsg();
    this.onConnectToGroup();
    this.onToggleCameraSocket();
    this.onToggleMicroSocket();
    this.onReturnInGroup();
    this.joinToChat();
    this.pingpong();
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
