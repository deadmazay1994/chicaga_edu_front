<script>
export default {
  name: "ChipInput",
  render() {
    return (
      <div>
        <input class="chip-input" ref="input" type="text" />
        {this.sentence}
        {this.answers}
      </div>
    );
  },
  data() {
    return {
      answers: []
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
        console.log("test22", value);
        this.answers[inputIndex].value = value;
        this.$set(this.answers, inputIndex, this.answers[inputIndex]);
        this.$refs.input[inputIndex].value = value;
        this.sendData();
      }
    },
    customForceUpdate(data) {
      data.answers.forEach((element, i) => {
        this.updateModelInput(element.value, i);
      });
    }
  }
};
</script>

<style lang="sass" scoped>
input
  border-bottom: 1px solid black
</style>
