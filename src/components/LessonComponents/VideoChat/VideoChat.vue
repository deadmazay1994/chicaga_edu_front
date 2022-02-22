<template>
  <div class="video-chat vue-component">
    <div class="video-chat__videos-wrap">
      <div
        class="video-chat__video-wrap"
        v-for="(mediaObject, index) in medias.medias"
        :key="index"
        :class="{
          'video-chat__video-wrap--active':
            Number(index) == Number(activeVideoIndex),
        }"
        :style="videoWrapJustify(index)"
      >
        <template v-if="Number(index) == Number(activeVideoIndex)">
          <video-component
            :indexVideo="index"
            class="video-chat__video"
            :class="{
              'video-chat__video--active':
                Number(index) == Number(activeVideoIndex),
            }"
            :active="Number(index) == Number(activeVideoIndex)"
            :mediaObject="mediaObject"
            @toggleFullSize="onFullSizeToggle"
            @toggleMicro="onToggleMicro"
          />
        </template>
      </div>
    </div>
    <div class="video-chat-miniatures-wrapper" v-if="medias.medias.length > 0">
      <div class="miniatures-go" @click="scroll('upp')">
        <img src="@/assets/imgs/arrow-up.svg" alt="arrow up" />
      </div>
      <div class="video-chat-miniatures-list" ref="miniatures">
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
      <div class="miniatures-go" @click="scroll('down')">
        <img src="@/assets/imgs/down-arrow.svg" alt="arrow down" />
      </div>
    </div>
  </div>
</template>

<script>
import VideoComponent from "./VideoComponent";
import Peer from "peerjs";

import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "video-chat",
  data: function () {
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
              username: "chicaga",
            },
            {
              url: "turn:45.90.32.84:3478",
              credential: "edupassword",
              username: "chicaga",
            },
            { url: "stun:stun.l.google.com:19302" },
            { url: "stun:stun.schlund.de" },
          ],
        },
      },
      peerOptions: {},
      activeVideoIndex: 0,
      // Connection data
      initiator: false,
      mediaObjects: [],
      peers: [],
      id: false,
      socketId: false,
      users: [],
      color: "",
      queue: [],
    };
  },
  methods: {
    ...mapActions([
      "socketConnect",
      "toggleChannel",
      "setWebcam",
      "setCapture",
      "setLocalstoradgeStatesToTracks",
    ]),
    ...mapMutations(["setLessonId", "destroyPeers", "initMedias", "callPush"]),
    scroll(val) {
      const miniatures = this.$refs.miniatures;
      const scrollHeight = miniatures.scrollHeight;
      if (val == "down") {
        miniatures.scrollBy({
          left: 0,
          top: scrollHeight * 0.9,
          behavior: "smooth",
        });
        console.log("Scroll down");
      } else {
        miniatures.scrollBy({
          left: 0,
          top: -(scrollHeight * 0.9),
          behavior: "smooth",
        });
        console.log("Scroll Up");
      }
    },
    // Логика переключения FullSize
    onFullSizeToggle(index) {
      this.activeVideoIndex = index;
    },
    // Логика переключения канала звука и видео
    onToggleCamera(state) {
      this.socket.emit("toggle camera", state);
    },
    onToggleCameraSocket() {
      this.socket.on("on toggle camera", (data) => {
        console.log("on toggle camera");
        const doF = () => (this.medias.getById(data.id).videoOff = data.state);
        if (this.medias.getById(data.id)) doF();
        else {
          console.log("push to que");
          this.queue.push({
            doF,
            id: data.id,
          });
        }
      });
    },
    onToggleMicro(state) {
      this.socket.emit("toggle micro", state);
    },
    onToggleMicroSocket() {
      this.socket.on("on toggle micro", (data) => {
        console.log("on toggle micro");
        if (this.medias.getById(data.id)) {
          this.medias.getById(data.id).audioOff = data.state;
        }
      });
    },
    onChangeSettings() {
      this.socket.on("on change settings", (data) => {
        if (data.data.toAllUsers) {
          this.medias.getMyMedia()[data.data.name] = data.data.val;
        }
        console.log("on change settings", this.medias.medias);
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
      console.log("join");
      let ifIsSafariSetPeerServerOptionsForSafari = () => {
        let seemsChrome = navigator.userAgent.indexOf("Chrome") > -1;
        let seemsSafari = navigator.userAgent.indexOf("Safari") > -1;
        if (seemsSafari && !seemsChrome)
          this.peerOptions.serialization = "json";
      };
      ifIsSafariSetPeerServerOptionsForSafari();
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
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    },
    createMyVideo(stream) {
      if (stream) {
        stream = stream.clone();
        // Удаляем свое аудио, чтобы не слышать себя
        stream.getAudioTracks().forEach((track) => track.stop());
        this.medias.push({
          im: true,
          stream,
          id: this.socket.id,
          audioOff: false,
          videoOff: false,
          avatar: this.user.avatar_link,
          name: this.user.name,
          color: this.color,
        });
      }
      this.$forceUpdate();
    },
    async getMedia() {
      if (this.myWebcamMedia == null && this.myActiveMediaName == "camera") {
        await this.setWebcam();
      } else if (
        this.myCaptureMedia == null &&
        this.myActiveMediaName == "capture"
      ) {
        await this.setCapture();
      }
      if (this.myActiveMediaName == "camera") {
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
        roomId: this.lessonId,
      });
    },
    doQueue(id) {
      const e = this.queue.find((i) => i.id == id);
      console.log(this.queue);
      if (e) console.log(e);
    },
    intiatorOnSignal(peer, userId) {
      // Как только инитатор просигналил
      peer.on("signal", (signal) => {
        this.getPeerById(userId).signaling = true;
        // Отправляем предложение о соеденении
        this.sendMsgToUser(
          {
            signal,
            name: "signaling initiator",
            username: this.user.name,
            avatar: this.user.avatar_link,
            sender: this.socketId,
            forPeer: userId,
          },
          userId
        );
      });
    },
    onSendUsers() {
      // 2
      // Сервер отправляет всех участников чата
      this.socket.on("send users", async (data) => {
        this.color = data.aboutMe.color;
        // Записываем свой socket id
        this.socketId = data.socketId;
        // Получаем свое изображение и звук
        let stream = await this.getMedia();
        this.users = data.users;
        // Создаем и далее выводим свое изображение
        this.createMyVideo(stream);
        data.users.forEach((user) => {
          let peer = new Peer(this.randomStr(), this.peerServer);
          peer.on("error", () => {
            console.log("Попытка реконекта");
            peer.reconnect();
          });
          this.allPeers.push(peer);
          peer.on("open", () => {
            peer.on("call", (call) => {
              this.callPush(call);
              stream.user = user;
              call.answer(stream);
              call.on("stream", (stream) => {
                this.setLocalstoradgeStatesToTracks();
                this.medias.push(
                  {
                    im: false,
                    stream,
                    id: user.id,
                    peerId: peer.id,
                    avatar: user.avatar,
                    name: user.username,
                    color: user.color,
                  },
                  // Передаем только того юзера чьи настройи надо отразить в объекте
                  this.getUserById(user.id)
                );
                this.doQueue(user.id);
              });
            });
            this.sendMsgToUser(
              {
                peerId: peer.id,
                name: "inititor signal",
                sender: this.socketId,
                user: this.user,
                userSettings: {
                  color: this.color,
                  camera:
                    window.localStorage.getItem("videochat_camera_state") ==
                    "true",
                  micro:
                    window.localStorage.getItem("videochat_microphone_state") ==
                    "true",
                },
              },
              user.id
            );
          });
        });
      });
    },
    onGetMsg() {
      this.socket.on("get msg", (data) => {
        switch (data.msg.name) {
          // Получаем предложение о соеденении
          case "inititor signal":
            var peer = new Peer(this.randomStr(), this.peerServer);
            this.allPeers.push(peer);
            peer.on("error", () => {
              console.log("Попытка реконекта");
              peer.reconnect();
            });
            peer.on("open", () => {
              var conn = peer.connect(data.msg.peerId, this.peerOptions);
              conn.on("open", async () => {
                let stream = await this.getMedia();
                let call = await peer.call(data.msg.peerId, stream);
                this.callPush(call);
                call.on("stream", async (stream) => {
                  this.setLocalstoradgeStatesToTracks();
                  this.medias.push(
                    {
                      im: false,
                      peerId: peer.id,
                      stream,
                      color: data.msg.userSettings.color,
                      id: data.msg.sender,
                      avatar: data.msg.user.avatar_link,
                      name: data.msg.user.name,
                      videoOff: data.msg.userSettings.camera,
                      audioOff: data.msg.userSettings.micro,
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
      return this.peers.find((peer) => peer.id == id);
    },
    onUserDisconnect() {
      this.socket.on("user disconnect", (socketId) => {
        socketId;
        this.medias.delete(socketId);
      });
    },
    onConnectToGroup() {
      this.socket.on("connect to group", (data) => {
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
    },
    videoWrapJustify(currentIndex) {
      // Если текущий элемент стоит до активного,
      // то если у него не четный индекс, то значение должно быть flex-end
      // А если после, то flex-end должен быть у не четных
      let values = ["flex-end", "flex-start"];
      // Значение по умолчанию для не четных
      let indexValue = 0;
      if (currentIndex % 2) {
        indexValue = 1;
      }
      // Сценарий, когда элемент находится после активного
      if (currentIndex < this.activeVideoIndex) {
        indexValue = indexValue === 1 ? 0 : 1;
      }
      return {
        "justify-content": values[indexValue],
      };
    },
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
      "myActiveMediaName",
    ]),
  },
  components: {
    VideoComponent,
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
  },
};
</script>

<style lang="sass" scoped>
.video-chat-miniatures-wrapper
  height: 100%
  position: absolute
  width: 30%
  min-width: 146px
  background-color: #9d000040
  z-index: 10 !important
  right: 0
  border-top-left-radius: 10px
  border-bottom-left-radius: 10px
  .miniatures-go
    height: 12.5%
    display: flex
    align-items: center
    justify-content: center
    z-index: 1001 !important
    transition: all .2s
    &:hover
      cursor: pointer
      background-color: #9d000041

  .video-chat-miniatures-list
    height: 75%
    -ms-overflow-style: none
    scrollbar-width: none
    overflow-y: scroll
  .video-chat-miniatures-list::-webkit-scrollbar
    display: none

.video-chat
  position: relative
  display: flex
  overflow-y: auto
  flex-direction: column
  align-items: center
  justify-content: space-between
  positon: relative
  height: 450px !important
  &__videos-wrap
    display: flex
    flex-wrap: wrap
    width: 100%
    height: 100%
    padding: 10px
    padding-top: 40px
  &__video-wrap
    width: 50%
    display: flex
    height: 150px
    margin-bottom: 10px
    &--active
      width: 0
  .video-chat__video--miniature
    width: calc(100% - 20px)
    height: 100px
    margin: 5px 10px
  &__video
    margin-top: 5px
    width: 50%
    min-width: 140px
    height: 450px
    // &--miniature
    //   &:nth-child(2n)
    //     justify-self: end
    // &:last-child
    //   margin-right: 0
  &__video--active
    width: 100%
    margin: 0
    height: 100%
    position: absolute
    top: 0
    left: 0
@media (max-width: 375px)
  .video-chat
    .video-chat__video--miniature
      width: 125px
      height: 125px
    &__video
      min-width: 120px
</style>
