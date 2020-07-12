<template>
  <div class="video-chat vue-component">
    <!-- <video-miniature
      v-for="(video, index) in videos"
      :src="video"
      :key="index"
    />-->
    <video
      class="video"
      v-for="(src, index) in this.videos"
      :src="src"
      :key="index"
      autoplay
    ></video>
    <v-btn v-on:click="joinToChat()">Присоедениться</v-btn>
  </div>
</template>

<script>
import Socket from "@/mixins/socket.js";
// import VideoMiniature from "@/components/LessonComponents/VideoMiniature";
import Peer from "simple-peer";

export default {
  name: "video-chat",
  data: function() {
    return {
      roomId: null,
      initiator: false,
      videos: [],
      peers: [],
      id: false,
      connectedId: [],
      outherIds: []
    };
  },
  methods: {
    setId() {
      this.id = window.location.hash;
      // this.id = this.generateId();
    },
    setRoomId() {
      this.roomId = window.location.hash.substr(1);
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
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true
        })
        .then(signal => {
          this.getIdOuther(signal);
          this.queryGetIdOuther();
          // this.initiatorOnSignal();
          this.acceptAnswerSignal();
        })
        .catch(() => {});
    },
    queryGetIdOuther() {
      this.socket.emit("get id", this.id);
    },
    eventSendId() {
      this.socket.on("get id", id => {
        this.socket.emit("send id", {
          myId: this.id,
          ofRequestId: id
        });
      });
    },
    getIdOuther(stream) {
      this.socket.on("send id", data => {
        let initiator = true;
        if (data.ofRequestId == this.id) {
          let peer = this.createPeer(stream, initiator);
          peer.on("signal", signal => {
            this.sendSignal(signal);
          });
          this.pushPeer(peer, { id: data.myId });
        }
      });
    },
    createPeer(stream, initiator = false) {
      let peer = new Peer({
        initiator,
        stream,
        trickle: false
      });
      peer.on("connect", () => {
        console.log("connected");
      });
      peer.on("stream", stream => {
        this.videos.push(stream);
        setTimeout(() => {
          let video = [...document.getElementsByClassName("video")];
          video = video[this.videos.length - 1];
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream); // for older browsers
          }
          video.play();
        }, 1000);

        // cnsole.log(video);
      });
      return peer;
    },
    initiatorOnSignal() {
      this.peers.forEach(peer => {
        peer.peer.on("signal", signal => {
          this.sendSignal(signal);
        });
      });
    },
    sendSignal(signal) {
      this.socket.emit("send signal", {
        signal,
        id: this.id
      });
    },
    receivedSignal() {
      this.socket.on("create socket", data => {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true
          })
          .then(stream => {
            let isPeerNotConnected = !this.isPeerConnected(data);
            if (isPeerNotConnected) {
              // Пушим пир в список всех пиров, которые ответили на запрос initiator'ов
              this.pushPeer(
                this.receivedSignaling(this.createPeer(stream), data),
                data
              );
            }
          })
          .catch(() => {});
      });
    },
    isPeerConnected(data) {
      let perrIsset = 0;
      for (const i in this.peers) {
        const peerObj = this.peers[i];
        if (peerObj.id == data.id) {
          perrIsset = true;
          break;
        }
      }
      return perrIsset;
    },
    receivedSignaling(peer, recived) {
      peer.signal(recived.signal);
      peer.on("signal", signal => {
        this.sendAnswerSignal(signal, recived.id);
      });
      return peer;
    },
    sendAnswerSignal(signal, initiatiorId) {
      this.socket.emit("send answer signal", {
        initiatiorId,
        senderId: this.id,
        signal
      });
    },
    acceptAnswerSignal() {
      this.socket.on("accept answer signal", data => {
        // if (data.initiatiorId == this.id) {
        this.peers.forEach(peer => {
          if (data.senderId == peer.id) {
            peer.peer.signal(data.signal);
          }
        });
        // }
      });
    },
    pushPeer(peer, recivedData) {
      this.peers.push({
        id: recivedData.id,
        peer
      });
    }
  },
  computed: {},
  components: {
    // VideoMiniature
  },
  props: [],
  mixins: [Socket],
  mounted() {
    this.setRoomId();
    this.setId();
    this.connectToSocket({ roomId: this.roomId });
    this.eventSendId();
    this.receivedSignal();
  }
};
</script>
