<script>
import Chip from "./Chip.vue";

export default {
  name: "ChipInput",
  render() {
    this.pushMissingAnswers(0);
    let condition = "";
    console.log("test25 this.answer:", this.answer[0], this.answer[0] !== "");
    if (this.answer[0])
      condition = (
        <chip ref="chip" vOn:clickElem={this.clickElem()}>
          <template slot="word">{this.answer}</template>
        </chip>
      );
    let html = (
      <div class="chip-input">
        <div class="chip-input__element" ref="input">
          {condition}
        </div>
        {this.newSentence}
      </div>
    );
    return html;
  },
  components: {
    Chip
  },
  data() {
    return {
      answers: [],
      newSentence: ""
    };
  },
  props: {
    state: {
      type: String,
      default: "default"
    },
    sentence: { required: true },
    img: { required: false },
    index: { required: false },
    childSaved: { required: false }
  },
  computed: {
    answer() {
      return this.answers.map(element => element.value);
    }
  },
  methods: {
    pushMissingAnswers(inputIndex) {
      if (this.answers) {
        if (inputIndex >= this.answers.length) {
          for (let i = 0; i < inputIndex - this.answers.length + 1; i++) {
            this.answers.push({
              value: ""
            });
          }
        }
      }
    },
    updateAllModels() {
      if (this.answers) {
        this.answers.forEach((element, i) => {
          this.$refs.input[i].value = element.value;
        });
      }
    },
    updateModelInput(value, inputIndex) {
      if (this.answers) {
        console.log("test25", value, inputIndex);
        console.log("test25 answers:", this.answers, "index:", inputIndex);
        this.answers[inputIndex].value = value;
        // console.log("test25 input:", this.$refs.chip.$el);
        this.$set(this.answers, inputIndex, this.answers[inputIndex]);
        // this.$refs.chip.$el.innerHTML = value;
        // this.sendData();
      }
    },
    customForceUpdate(data) {
      data.answers.forEach((element, i) => {
        this.updateModelInput(element.value, i);
      });
    },
    getTitle() {
      this.n;
    },
    clickElem() {
      console.log("test25 clicked ChipInput.vue");
      this.$emit("clickElem");
    }
  },
  beforeMount() {
    if (this.sentence) {
      this.newSentence = this.sentence.replace(/\[(.*?)\]/g, "");
    }
  }
};
</script>

<style lang="sass" scoped>
.chip-input
  display: flex
  align-items: flex-end

.chip-input__element
  width: 200px
  margin-top: .5rem
  height: 35px
  border-bottom: 1px solid black
  text-align: center
</style>
