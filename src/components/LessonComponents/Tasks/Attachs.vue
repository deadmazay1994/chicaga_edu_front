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
          time: audio.currentTime
        });
      };
      this.$refs.audio.forEach(audio => {
        if (this.user.role == "teacher") {
          let el = audio.$el.querySelector("audio");
          // audio.$el.querySelector(".mdi-pause, .mdi-play").onclick = () => {
          //   toggle(audio);
          // };
          // Если учитель перемотал запись
          audio.$el.querySelector(".v-progress-linear").onclick = () => {
            toggle(audio);
          };
          // // Если учитель включил или выключил запись
          el.addEventListener("playing", () => toggle(audio));
          el.addEventListener("pause", () => toggle(audio));
        }
      });
    },
    onToggleAudioInStudents() {
      const toSeconds = time => {
        let a = time.split(":");
        return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      };
      this.socket.on("send data", data => {
        this.$refs.audio.forEach(audio => {
          audio.$el.querySelector("audio").currentTime = toSeconds(data.time);
          // методы play, pause работают через раз по этому эмулируем клик
          if (data.val != audio.$el.querySelector("audio").paused) {
            // эмулируем только когда трубемое значение пазуы не совпадает с действительным
            audio.$el.querySelector(".v-btn").click();
          }
        });
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
  },
  mounted() {
    this.toggleAudioInStudents();
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
