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
import P from "peerjs";

import Medias from "./Classes/MediaObjects";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "video-chat",
  data: function() {
    return {
      peerServer: {
        host: "edu.chicaga.ru",
        port: 8000,
        secure: true,
        config: {
          iceServers: [
            { url: "stun:stun01.sipphone.com" },
            { url: "stun:stun.ekiga.net" },
            { url: "stun:stun.fwdnet.net" },
            { url: "stun:stun.ideasip.com" },
            { url: "stun:stun.iptel.org" },
            { url: "stun:stun.rixtelecom.se" },
            { url: "stun:stun.schlund.de" },
            { url: "stun:stun.l.google.com:19302" },
            { url: "stun:stun1.l.google.com:19302" },
            { url: "stun:stun2.l.google.com:19302" },
            { url: "stun:stun3.l.google.com:19302" },
            { url: "stun:stun4.l.google.com:19302" },
            { url: "stun:stunserver.org" },
            { url: "stun:stun.softjoys.com" },
            { url: "stun:stun.voiparound.com" },
            { url: "stun:stun.voipbuster.com" },
            { url: "stun:stun.voipstunt.com" },
            { url: "stun:stun.voxgratia.org" },
            { url: "stun:stun.xten.com" },
            {
              url: "turn:numb.viagenie.ca",
              credential: "muazkh",
              username: "webrtc@live.com"
            },
            {
              url: "turn:192.158.29.39:3478?transport=udp",
              credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
              username: "28224511:1379330808"
            },
            {
              url: "turn:192.158.29.39:3478?transport=tcp",
              credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
              username: "28224511:1379330808"
            },
            {
              url: "turn:turn.bistri.com:80",
              credential: "homeo",
              username: "homeo"
            },
            {
              url: "turn:turn.anyfirewall.com:443?transport=tcp",
              credential: "webrtc",
              username: "webrtc"
            }
          ]
        }
      },
      allPeers: [],
      activeVideoIndex: 0,
      // Connection data
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
      users: [],
      peerInitator: false,
      peerDepended: false
    };
  },
  methods: {
    ...mapActions(["socketConnect", "toggleChannel"]),
    ...mapMutations(["setLessonId"]),
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
        if (this.medias.getById(data.id)) {
          this.medias.getById(data.id).audioOff = data.state;
        }
      });
    },
    onChangeSettings() {
      this.socket.on("on change settings", data => {
        if (data.data.toAllUsers) {
          this.medias.getMyMedia()[data.data.name] = data.data.val;
        }
        let user = this.medias.getById(data.id);
        if (user) {
          if (data.data.name in user) {
            user[data.data.name] = data.data.val;
            console.log(data.data);
          }
        }
      });
    },
    // Логика подключения
    joinToChat() {
      // Удаляем все прошлые подключения
      console.log(this.allPeers);
      this.allPeers.forEach(peer => {
        console.log(peer);
        peer.destroy();
      });
      this.medias = new Medias();
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
    randomStr() {
      return (
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      );
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
          // video: { width: 102, height: 76 },
          video: { width: 1024, height: 768 },
          audio: true
        })
        .then(stream => {
          callback(stream);
        })
        .catch(e => {
          alert("Не удалось получить доступ к веб-камере");
          console.log("Не удалось получить доступ к веб-камере по причине", e);
        });
    },
    createPeer(stream, user = {}, initiator = false) {
      user;
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
      this.allPeers.push(peer);
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
          // this.createPeersForUsers(data.users, stream);
          console.log(
            data.users,
            "количество пользователей",
            data.users.length
          );
          data.users.forEach(user => {
            let peer = new P(this.randomStr(), this.peerServer);
            this.allPeers.push(peer);
            // let peer = new P(user.id, this.peerServer);
            peer.on("open", () => {
              console.log(
                "Пир открылся для пользователя",
                user.username || user.name
              );
              peer.on("call", call => {
                console.log("Пришел звонок от", user.username || user.name);
                stream.user = user;
                call.answer(stream);
                console.log(
                  "Отправили ответ юзеру",
                  user.username || user.name
                );
                call.on("stream", stream => {
                  console.log("Получили стрим от", user.username || user.name);
                  this.medias.push(
                    {
                      im: false,
                      stream,
                      id: user.id,
                      avatar: user.avatar_link,
                      name: user.username
                    },
                    // Передаем только того юзера чьи настройи надо отразить в объекте
                    this.getUserById(user.id)
                  );
                });
              });
              this.sendMsgToUser(
                {
                  peerId: peer.id,
                  name: "inititor signal",
                  sender: this.socketId,
                  user: this.user
                },
                user.id
              );
              console.log(
                "Отправили предложение о соеденении",
                user.username || user.name
              );
            });
            // const conn = peer.connect(user.id + "-depend");
            // conn.on("open", () => {
            // console.log("open");
            // });
          });
        });
        console.log("Получили всех юзеров и создали для них пиры");
      });
    },
    onGetMsg() {
      this.socket.on("get msg", data => {
        switch (data.msg.name) {
          // Получаем предложение о соеденении
          case "inititor signal":
            var peer = new P(this.randomStr(), this.peerServer);
            this.allPeers.push(peer);
            // var peer = new P(this.socketId, this.peerServer);
            peer.on("open", () => {
              console.log("open peer depended", data.msg.user.name);
              var conn = peer.connect(data.msg.peerId);
              conn.on("open", () => {
                console.log("open connect depended", data.msg.user.name);
                this.getMedia(async stream => {
                  let call = await peer.call(data.msg.peerId, stream);
                  console.log("open my stream depended", data.msg.user.name);
                  call.on("stream", stream => {
                    console.log("open stream depend", data.msg.user.name);
                    this.medias.push(
                      {
                        im: false,
                        stream,
                        id: data.msg.sender,
                        avatar: data.msg.user.avatar_link,
                        name: data.msg.user.name
                      },
                      // Передаем getUserByIdолько того юзера чьи настройи надо отразить в объекте
                      this.getUserById(data.msg.sender)
                    );
                  });
                });
              });
            });
            break;
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
        this.setLessonId(data.roomId);
        this.joinToChat();
        // console.log(this.$route.params.id + data.groupName)
        // this.toggleChannel(this.$route.params.id + "___" + data.groupName);
      });
    },
    onReturnInGroup() {
      this.socket.on("on return in group", () => {
        this.setLessonId(this.$route.params.id);
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
    ...mapGetters(["socket", "user", "lessonId"]),
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
    MediaStream.prototype.user = null;
    this.setLessonId(this.$route.params.id);
    this.onSendUsers();
    this.onGetMsg();
    this.onConnectToGroup();
    this.onToggleCameraSocket();
    this.onToggleMicroSocket();
    this.onReturnInGroup();
    this.onUserDisconnect();
    this.onChangeSettings();
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
