<template>
  <div class="video-chat vue-component">
    <div class="video" v-if="streamOn && !onLoading">
      <div class="video-chat__videos-wrap">
        <div
          class="video-chat__video-wrap"
          :style="videoWrapJustify(activeVideoIndex)"
          v-if="medias.length > activeVideoIndex"
        >
          <video-component
            :indexVideo="activeVideoIndex"
            class="video-chat__video video-chat__video--active"
            :itsMe="activeMediaStream.itsMe"
            :active="true"
            :miniature="false"
            :iconOff="false"
            :mediaObject="activeMediaStream.mediaObject"
          />
        </div>
      </div>
      <div
        class="video-chat-miniatures-wrapper"
        v-if="medias.length > 0 && miniaturesOn"
      >
        <div class="miniatures-go" @click="scroll('upp')">
          <img src="@/assets/imgs/arrow-up.svg" alt="arrow up" />
        </div>
        <div class="video-chat-miniatures-list" ref="miniatures">
          <template v-for="(mediaObject, index) in miniaturesMediaStream">
            <video-component
              class="video-chat__video video-chat__video--miniature"
              :miniature="true"
              :iconOff="true"
              :itsMe="mediaObject.itsMe"
              :mediaObject="mediaObject.mediaObject"
              :indexVideo="index"
              :key="index"
              @click-by-video="setActiveVideoIndex(mediaObject)"
            />
          </template>
        </div>
        <div class="miniatures-go" @click="scroll('down')">
          <img src="@/assets/imgs/down-arrow.svg" alt="arrow down" />
        </div>
      </div>
    </div>
    <div class="notice" v-if="!streamOn && !onLoading">
      <span class="text">
        {{ mediaError }}
      </span>
      <a href="http://localhost:8080/edu/#/faq">ссылка на FAQ</a>
    </div>
    <div class="loading" v-if="onLoading">
      <v-skeleton-loader type="image" height="100%" />
    </div>
  </div>
</template>

<script>
import VideoComponent from "@/components/LessonComponents/VideoChat/VideoComponent";
import Driver from "./Driver";
import { mapGetters } from "vuex";

export default {
  name: "WebCam",
  components: { VideoComponent },
  data() {
    return {
      medias: [],
      activeVideoIndex: 0,
      miniaturesOn: true,
      streamOn: null,
      mediaError: null,
      onLoading: true,
      driver: null,
      del: false
    };
  },
  computed: {
    ...mapGetters(["user"]),
    activeMediaStream() {
      if (!this.medias[this.activeVideoIndex]) return this.medias[0];
      return this.medias[this.activeVideoIndex];
    },
    miniaturesMediaStream() {
      return this.medias.filter((m, i) => i !== this.activeVideoIndex);
    }
  },
  props: ["roomId"],
  methods: {
    scroll(val) {
      const miniatures = this.$refs.miniatures;
      const scrollHeight = miniatures.scrollHeight;
      if (val == "down") {
        miniatures.scrollBy({
          left: 0,
          top: scrollHeight * 0.9,
          behavior: "smooth"
        });
      } else {
        miniatures.scrollBy({
          left: 0,
          top: -(scrollHeight * 0.9),
          behavior: "smooth"
        });
      }
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
        "justify-content": values[indexValue]
      };
    },
    // Логика переключения FullSize
    onFullSizeToggle(index) {
      this.activeVideoIndex = index;
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
    setActiveVideoIndex(media) {
      this.activeVideoIndex =
        this.medias.findIndex(
          m => m.mediaObject.userInfo.id === media.mediaObject.userInfo.id
        ) || 0;
    },
    mediaStreamSuccessHundle() {
      const driver = new Driver({
        serverURL: "https://video.chicaga.ru",
        secret: "123456"
      });
      this.driver = driver;
      let user = {
        name: this.user.name,
        avatar: this.user.avatar_link
      };
      const videoStateLS = window.localStorage.getItem(
        "videochat_camera_state"
      );
      const audioStateLS = window.localStorage.getItem(
        "videochat_microphone_state"
      );
      let videoState = true;
      let audioState = true;
      if (videoStateLS !== null) videoState = JSON.parse(videoStateLS);
      if (audioStateLS !== null) audioState = JSON.parse(audioStateLS);

      let settings = {
        publishAudio: audioState,
        publishVideo: videoState
      };

      const roomId =
        this.roomId !== undefined ? this.roomId : this.$route.params.userid;
      // Всякий раз, когда имзеняется список подписчиков комнаты
      // вызывается эта функция, чтобы обновить список подписчиков,
      // который используем мы
      driver.onParticipantsChange = this.setMediaStreamFromDirver;
      // Присоеденяемся к комнате
      driver.joinToRoom(roomId, { clientData: user, sourceSettings: settings });
      this.streamOn = true;
      this.onLoading = false;
    },
    mediaStreamErrorHundle(error) {
      this.mediaError = error;
      this.streamOn = false;
      this.onLoading = false;
      switch (error.name) {
        case "NotAllowedError":
          this.mediaError =
            "Доступ к камере или микрофону не разрешен браузером";
          break;
        case "SecurityError":
          this.mediaError = "Ошибка безопасности";
          break;
        case "NotFoundError":
          this.mediaError = "Устройство не обнаружено";
          break;
        default:
          this.mediaError = error.message;
      }
    },
    setMediaStreamFromDirver() {
      this.medias = this.driver.allParticipants.map(m => ({
        itsMe: m.itsMe,
        mediaObject: {
          id: m.mediaObject.id,
          stream: m.mediaObject.stream,
          userInfo: { ...m.mediaObject.userInfo }
        }
      }));
    },
    async setMediaStream() {
      this.mediaStreamSuccessHundle();
    }
  },
  mounted() {
    this.setMediaStream();
    this.$on("toggleCamera", () => {
      this.driver.togglePublishVideo();
    });
    this.$on("toggleMicro", () => {
      this.driver.togglePublishAudio();
    });
    this.$on("publishWebcam", () => {
      this.driver.publishWebcam();
    });
    this.$on("publishScreen", () => {
      this.driver.publishScreen();
    });
  },
  created() {
    this.$watch(() => this.$route.params, this?.driver?.leaveSession);
  }
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
    position: absolute
    left: 0
    top: 0
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
  .notice
    display: flex
    align-items: center
    justify-content: center
    min-height: 450px
    border-radius: 12px
    background-color: #f8f8f8
    width: 100%
    padding: 0 1.5rem
    flex-direction: column
    .text
      text-align: center
  .loading
    width: 100%
    height: 100%
    ::v-deep .v-skeleton-loader.v-skeleton-loader--is-loading
      .v-skeleton-loader__image
        height: 100%

@media (max-width: 375px)
  .video-chat
    .video-chat__video--miniature
      width: 125px
      height: 125px
    &__video
      min-width: 120px
</style>
