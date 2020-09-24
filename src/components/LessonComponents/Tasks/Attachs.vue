<script>
import VuetifyAudio from "vuetify-audio";

import Methods from "@/mixins/tasks";
import MediaEvents from "@/mixins/mediaEvents";
import Magnifier from "@/directives/magnifier";
import Zoom from "@/directives/zoom";
import Description from "./TasksDescription";

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
        {...texts}
        <div class="attachs__files">{this.getAttachComponents()}</div>
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
      "user",
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
              //               <div
              //   class="response-content attachs__img"
              //   vZoom
              //   style={
              //     "background-image: url(" +
              //     this.getFileName(e.file_name) +
              //     ")"
              //   }
              // />
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
    }
  },
  computed: {
    ...mapGetters(["socket", "lessonId"])
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
  mixins: [Methods, MediaEvents],
  beforeMount() {
    this.setInputCopy();
  },
  mounted() {
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
