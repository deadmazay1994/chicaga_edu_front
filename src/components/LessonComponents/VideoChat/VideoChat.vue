<template>
  <div class="video-chat vue-component">
    <div class="video-chat__big-video-wrap">
      <video-component
        class="video-chat__video video-chat__video--active"
        v-if="activeMedia"
        :mediaObject="activeMedia"
        :indexVideo="activeVideoIndex"
        :active="true"
        @toggleFullSize="onFullSizeToggle"
        @toggleMicro="onToggleMicro"
      />
    </div>
    <div class="video-chat__miniatures">
      <template v-for="(mediaObject, index) in medias.medias">
        <video-component
          v-if="Number(index) != Number(activeVideoIndex)"
          class="video-chat__video video-chat__video--miniature"
          :miniature="true"
          :mediaObject="mediaObject"
          :indexVideo="index"
          @toggleFullSize="onFullSizeToggle"
          @toggleMicro="onToggleMicro"
          :key="index"
        />
      </template>
    </div>
  </div>
</template>

<script>
import VideoComponent from "./VideoComponent";
import Peer from "peerjs";

import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "video-chat",
  data: function() {
    return {
      peerServer: {
        host: "edu.chicaga.ru",
        port: 8000,
        secure: true,
        iceTransportPolicy: "relay",
        debug: false,
        sdpSemantics: "unified-plan",
        config: {
          iceServers: [
            {
              url: "turn:45.90.32.84:3478?transport=tcp",
              credential: "edupassword",
              username: "chicaga"
            },
            {
              url: "turn:45.90.32.84:3478",
              credential: "edupassword",
              username: "chicaga"
            },
            { url: "stun:45.90.32.84:3478" },
            { url: "stun:stun01.sipphone.com" },
            { url: "stun:23.21.150.121" },
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
      activeVideoIndex: 0,
      // Connection data
      initiator: false,
      mediaObjects: [],
      peers: [],
      id: false,
      socketId: false,
      users: []
    };
  },
  methods: {
    ...mapActions([
      "socketConnect",
      "toggleChannel",
      "setWebcam",
      "setCapture"
    ]),
    ...mapMutations(["setLessonId", "destroyPeers", "initMedias", "callPush"]),
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
        if (this.medias.getById(data.id)) {
          this.medias.getById(data.id).videoOff = data.state;
        }
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
      this.destroyPeers();
      this.initMedias();
      // 1
      // Говорим остальным участникам чата, что мы подключились
      this.imHere();
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
    async getMedia() {
      if (this.myWebcamMedia == null && this.activeMyMedia == "camera") {
        await this.setWebcam();
      } else if (
        this.myWebcamMedia == null &&
        this.activeMyMedia == "capture"
      ) {
        await this.setCapture();
      }
      if (this.activeMyMedia == "camera") {
        return this.myWebcamMedia;
      } else {
        return this.myCaptureMedia;
      }
    },
    getUserById(id) {
      for (var i in this.users) {
        if (this.users[i].id == id) {
          return this.users[i];
        }
      }
      return false;
    },
    sendMsgToUser(msg, id) {
      this.socket.emit("send msg for user", {
        msg,
        id,
        roomId: this.lessonId
      });
    },
    intiatorOnSignal(peer, userId) {
      // Как только инитатор просигналил
      peer.on("signal", signal => {
        this.getPeerById(userId).signaling = true;
        // Отправляем предложение о соеденении
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
      });
    },
    onSendUsers() {
      // 2
      // Сервер отправляет всех участников чата
      this.socket.on("send users", async data => {
        // Записываем свой socket id
        this.socketId = data.socketId;
        // Получаем свое изображение и звук
        let stream = await this.getMedia();
        this.users = data.users;
        this.createMyVideo(stream);
        data.users.forEach(user => {
          let peer = new Peer(this.randomStr(), this.peerServer);
          peer.on("error", () => {
            peer.reconnect();
          });
          this.allPeers.push(peer);
          peer.on("open", () => {
            peer.on("call", call => {
              this.callPush(call);
              stream.user = user;
              call.answer(stream);
              call.on("stream", stream => {
                this.medias.push(
                  {
                    im: false,
                    stream,
                    id: user.id,
                    peerId: peer.id,
                    avatar: user.avatar,
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
                user: this.user,
                userSettings: {
                  camera:
                    window.localStorage.getItem("videochat_camera_state") ==
                    "true",
                  micro:
                    window.localStorage.getItem("videochat_microphone_state") ==
                    "true"
                }
              },
              user.id
            );
          });
        });
      });
    },
    onGetMsg() {
      this.socket.on("get msg", data => {
        switch (data.msg.name) {
          // Получаем предложение о соеденении
          case "inititor signal":
            var peer = new Peer(this.randomStr(), this.peerServer);
            this.allPeers.push(peer);
            peer.on("open", () => {
              var conn = peer.connect(data.msg.peerId);
              conn.on("open", async () => {
                let stream = await this.getMedia();
                let call = await peer.call(data.msg.peerId, stream);
                this.callPush(call);
                call.on("stream", async stream => {
                  this.medias.push(
                    {
                      im: false,
                      peerId: peer.id,
                      stream,
                      id: data.msg.sender,
                      avatar: data.msg.user.avatar_link,
                      name: data.msg.user.name,
                      videoOff: data.msg.userSettings.camera,
                      audioOff: data.msg.userSettings.micro
                    },
                    // Передаем getUserByIdолько того юзера чьи настройи надо отразить в объекте
                    this.getUserById(data.msg.sender)
                  );
                });
              });
            });
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
    },
    onConnectToGroup() {
      this.socket.on("connect to group", data => {
        this.setLessonId(data.roomId);
        this.joinToChat();
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
    ...mapGetters([
      "socket",
      "user",
      "lessonId",
      "videoOff",
      "allPeers",
      "medias",
      "myCaptureMedia",
      "myWebcamMedia",
      "activeMyMedia"
    ]),
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
  positon: relative
  &__big-video-wrap
    width: 100%
    height: 100%
  &__miniatures
    position: absolute
    left: 0
    width: 98%
    margin: 30px 1%
    margin-top: 60px
    display: grid
    grid-template-columns: 50% 50%
  .video-chat__video--miniature
    width: 150px
    height: 150px
    border: 3px solid #c4ac7e
  &__video
    margin-top: 5px
    width: 50%
    min-width: 140px
    &--miniature
      &:nth-child(2n)
        justify-self: end
    &:last-child
      margin-right: 0
  &__video--active
    width: 100%
    margin: 0
</style>
