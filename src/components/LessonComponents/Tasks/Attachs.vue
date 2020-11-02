<script>
import VuetifyAudio from "vuetify-audio";

import Magnifier from "@/directives/magnifier";
import Zoom from "@/directives/zoom";
import Description from "./TasksDescription";

import SocketMixin from "@/mixins//socket";
import MediaEvents from "@/mixins/mediaEvents";

import { mapGetters, mapMutations } from "vuex";

import { VImg } from "vuetify/lib";

export default {
  name: "attachs",
  render() {
    let texts = [];
    if (this.inputCopy.addons) {
      this.inputCopy.addons.forEach(addon =>
        texts.push(<pre class="text-subtitle-2 pre">{addon.text}</pre>)
      );
    }
    return (
      <div class="attachs">
        <description index={this.index}>
          {this.inputCopy.description}
        </description>
        <div class="task-wrap">
          {...texts}
          <div class="attachs__files">{this.getAttachComponents()}</div>
        </div>
      </div>
    );
  },
  data: function() {
    return {
      inputCopy: false
    };
  },
  methods: {
    ...mapMutations([
      "saveTask",
      "saveChildTask",
      "setVideoOff",
      "setAudioOff"
    ]),
    getFileName(filename) {
      return this.IMGSTORE + filename;
    },
    getFileType(mime) {
      return mime.split("/")[0];
    },
    getAttachComponents() {
      let components = [];
      this.inputCopy.body.forEach(files => {
        files.forEach(e => {
          switch (this.getFileType(e.file_type)) {
            case "image":
              components.push(
                <v-img src={this.getFileName(e.file_name)} vZoom />
              );
              break;
            case "video":
              components.push(
                <video
                  class="response-content"
                  controls="true"
                  ref="video"
                  refInFor={true}
                  src={this.getFileName(e.file_name)}
                />
              );
              break;
            case "audio":
              components.push(
                <vuetify-audio
                  ref="audio"
                  refInFor={true}
                  file={this.getFileName(e.file_name)}
                />
              );
              break;
          }
        });
      });
      return components;
    },
    addEventsToMedia() {
      if (this.$refs.audio) {
        this.$refs.audio.forEach(audio => {
          this.addPlayPauseEvent(audio.$el.querySelector("audio"));
        });
      }
      if (this.$refs.video) {
        this.$refs.video.forEach(video => this.addPlayPauseEvent(video));
      }
    },
    toggleAudioInStudents() {
      const toggle = audio => {
        this.socketSendToAllInLesson({
          eventName: "toggle audio in users",
          val: audio.$el.querySelector("audio").paused,
          time: audio.currentTime,
          filePath: audio.$el.querySelector("audio").getAttribute("src"),
          timeNow: Date.now()
        });
      };
      if (this.$refs.audio) {
        this.$refs.audio.forEach(audio => {
          if (this.user.role == "teacher") {
            let el = audio.$el.querySelector("audio");
            // Если учитель перемотал запись
            audio.$el.querySelector(".v-progress-linear").onclick = () => {
              toggle(audio);
            };
            // // Если учитель включил или выключил запись
            el.addEventListener("playing", () => toggle(audio));
            el.addEventListener("pause", () => toggle(audio));
          }
        });
      }
    },
    toggleVideoInStudents() {
      if (this.$refs.video) {
        const toggle = video => {
          this.socketSendToAllInLesson({
            eventName: "toggle video in users",
            paused: video.paused,
            time: video.currentTime,
            filePath: video.getAttribute("src"),
            timeNow: Date.now()
          });
        };
        if (this.user.role == "teacher") {
          this.$refs.video.forEach(v => {
            v.addEventListener("playing", () => toggle(v));
            v.addEventListener("pause", () => toggle(v));
          });
        }
      }
    },
    onToggleAudioInStudents() {
      const toSeconds = time => {
        let a = time.split(":");
        return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      };
      const allAudioForEach = callback =>
        Array.from(document.querySelectorAll("audio")).forEach(audio =>
          callback(audio)
        );
      this.socket.on("send data", data => {
        if (data.eventName == "toggle audio in users") {
          allAudioForEach(audio => {
            if (audio.getAttribute("src") == data.filePath) {
              audio.currentTime =
                toSeconds(data.time) - (data.timeNow - Date.now()) / 1000;
              if (data.val != audio.paused) {
                audio
                  .closest(".attachs__files")
                  .querySelector("button")
                  .click();
              }
            }
          });
        }
      });
    },
    onToggleVideoInStudents() {
      const allvideoForEach = callback =>
        Array.from(document.querySelectorAll("video")).forEach(video =>
          callback(video)
        );
      this.socket.on("send data", data => {
        if (data.eventName == "toggle video in users") {
          allvideoForEach(v => {
            if (v.getAttribute("src") == data.filePath) {
              v.currentTime = data.time - (data.timeNow - Date.now()) / 1000;
              data.paused ? v.pause() : v.play();
            }
          });
        }
      });
    }
  },
  computed: {
    ...mapGetters(["socket", "lessonId", "socket", "user"])
  },
  directives: {
    ...Magnifier,
    ...Zoom
  },
  components: {
    VuetifyAudio,
    VImg,
    Description
  },
  props: ["input", "index"],
  mixins: [MediaEvents, SocketMixin],
  beforeMount() {
    this.setInputCopy();
    this.onToggleAudioInStudents();
    this.onToggleVideoInStudents();
  },
  mounted() {
    this.toggleAudioInStudents();
    this.toggleVideoInStudents();
    this.addEventsToMedia();
  }
};
</script>

<style scoped="scoped" lang="sass">
.attachs
  &__files *
    margin-top: 15px
  &__img
    width: 100%
    height: 100%
</style>
