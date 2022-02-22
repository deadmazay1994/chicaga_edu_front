<template>
  <div class="web-cam vue-component">
    <div class="video-chat__videos-wrap">
      <div
        class="video-chat__video-wrap"
        v-for="(mediaObject, index) in medias.medias"
        :key="index"
        :class="{
          'video-chat__video-wrap--active':
          Number(index) === Number(activeVideoIndex),
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
    <div class="video-chat-miniatures-wrapper" v-if="medias.medias.length > 0 && miniaturesOn">
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
import VideoComponent from "@components/LessonComponents/VideoChat/VideoComponent";

export default {
  name: "WebCam",
  components: { VideoComponent },
  props: {
    miniaturesOn: Boolean
  },
  methods: {
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

    // Оставлять эти методы?
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
    randomStr() {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    },
  }
}
</script>