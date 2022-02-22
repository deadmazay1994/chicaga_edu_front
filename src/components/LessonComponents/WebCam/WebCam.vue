<template>
  <div class="video-chat vue-component">
    <div class="video" v-if="streamOn">
      <div class="video-chat__videos-wrap">
        <div
          class="video-chat__video-wrap"
          v-for="(mediaObject, index) in medias"
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
              :mediaObject="mediaObject.mediaObject"
            />
          </template>
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
          <template v-for="(mediaObject, index) in medias">
            <video-component
              v-if="Number(index) != Number(activeVideoIndex)"
              class="video-chat__video video-chat__video--miniature"
              :miniature="true"
              :mediaObject="mediaObject.mediaObject"
              :indexVideo="index"
              :key="index"
            />
          </template>
        </div>
        <div class="miniatures-go" @click="scroll('down')">
          <img src="@/assets/imgs/down-arrow.svg" alt="arrow down" />
        </div>
      </div>
    </div>
    <div class="notice" v-if="!streamOn">
      <span class="text">
        {{ mediaError }}
      </span>
      <a href="http://localhost:8080/edu/#/faq">ссылка на FAQ</a>
    </div>
  </div>
</template>

<script>
import VideoComponent from "@/components/LessonComponents/VideoChat/VideoComponent";
import Driver from "./Driver";

export default {
  name: "WebCam",
  components: { VideoComponent },
  data() {
    return {
      medias: [],
      activeVideoIndex: 0,
      miniaturesOn: false,
      streamOn: null,
      mediaError: null,
    };
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
    // Логика переключения FullSize
    onFullSizeToggle(index) {
      this.activeVideoIndex = index;
    },
    randomStr() {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    },
    mediaStreamSuccessHundle(mediaStream) {
      const driver = new Driver();
      let user = {
        name: "testuser",
        avatar: "https://edu.chicaga.ru/images/avatars/no_avatar.jpg",
      };
      let stream = mediaStream;

      driver.createMyMediaObject({ mediaStream: stream, userInfo: user });
      driver.connect().then(() => {
        let driverMedias = driver.allParticipants;
        this.medias = driverMedias.filter((media) => media.itsMe === true);
      });
      this.streamOn = true;
    },
    mediaStreamErrorHundle(error) {
      this.mediaError = error;
      console.log(error.name + ": " + error.message);
      this.streamOn = false;
    },
    async setMediaStream() {
      const constraints = { video: { width: 624, height: 480 }, audio: true };

      await navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
          this.mediaStreamSuccessHundle(mediaStream);
        })
        .catch((err, mediaStream) => {
          console.log("catch: ", mediaStream);
          this.mediaStreamErrorHundle(err);
          switch (err.name) {
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
              this.mediaError = err.message;
          }
        });
    },
  },
  mounted() {
    this.setMediaStream();
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
@media (max-width: 375px)
  .video-chat
    .video-chat__video--miniature
      width: 125px
      height: 125px
    &__video
      min-width: 120px
</style>
