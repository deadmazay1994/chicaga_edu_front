<script>
import Methods from "@/mixins/tasks";
import { mapGetters, mapMutations } from "vuex";
import VuetifyAudio from "vuetify-audio";

export default {
  name: "attachs",
  render() {
    let texts = [];
    this.inputCopy.addons.forEach(addon =>
      texts.push(<pre class="text-subtitle-2">{addon.text}</pre>)
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
    ...mapMutations(["saveTask", "saveChildTask"]),
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
                <vuetify-audio file={this.getFileName(e.file_name)} />
              );
              break;
          }
        });
      });
      return components;
    }
  },
  computed: {
    ...mapGetters(["socket"])
  },
  components: {
    VuetifyAudio
  },
  props: ["input", "index"],
  mixins: [Methods],
  beforeMount() {
    this.setInputCopy();
  }
};
</script>

<style scoped="scoped" lang="sass">
.attachs
  &__files *
    margin-top: 15px
</style>
