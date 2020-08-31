<script>
import VuetifyAudio from "vuetify-audio";

import Methods from "@/mixins/tasks";
import Magnifier from "@/mixins/magnifier";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "attachs",
  render() {
    let texts = [];
    this.inputCopy.addons.forEach(addon =>
      texts.push(<pre class="text-subtitle-2 pre">{addon.text}</pre>)
    );
    return (
      <div class="attachs">
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
    ...mapMutations(["saveTask", "saveChildTask", "user"]),
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
                <img
                  class="response-content"
                  vLigthbox
                  vMagnifier
                  src={this.getFileName(e.file_name)}
                />
              );
              break;
            case "video":
              components.push(
                <video
                  class="response-content"
                  controls="true"
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
    addEventsToAudio() {
      if (this.$refs.audio) {
        this.$refs.audio.forEach(audio => {
          audio.$el
            .querySelector("audio")
            .addEventListener("playing", this.audioPlaying);
          audio.$el
            .querySelector("audio")
            .addEventListener("pause", this.audioStoping);
        });
      }
    },
    audioPlaying() {
      this.$store.dispatch("changeUserSetting", {
        name: "audioOff",
        val: true,
        text: "Ваш микрофон выключен",
        snuckbarStatus: true,
        roomId: this.lessonId
      });
    },
    audioStoping() {
      this.$store.dispatch("changeUserSetting", {
        name: "audioOff",
        val: false,
        text: "Ваш микрофон включен",
        snuckbarStatus: true,
        roomId: this.lessonId
      });
    }
  },
  computed: {
    ...mapGetters(["socket", "lessonId"])
  },
  components: {
    VuetifyAudio
  },
  props: ["input", "index"],
  mixins: [Methods, Magnifier],
  beforeMount() {
    this.setInputCopy();
  },
  mounted() {
    this.addEventsToAudio();
  }
};
</script>

<style scoped="scoped" lang="sass">
.attachs
  &__files *
    margin-top: 15px
</style>
