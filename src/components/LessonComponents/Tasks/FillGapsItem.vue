<script>
import "@/mixins/methods";
import { mapGetters } from "vuex";

export default {
  name: "fill-gaps-item",
  render(h) {
    const res = [this.getImg(h), this.getTitle(h)];
    let gap = false;
    let letters = [];
    // Номер пропуска
    let gapNum = 0;
    for (let i = 0; i < this.newSentence.split("").length; i++) {
      // Перебираем каждую букву в слове
      let l = this.newSentence.split("")[i];
      // Если условвие выполнено значит дальше идет gap
      if (l == "[") {
        // Перескакиваем с [ на следующею букву
        i++;
        l = this.newSentence.split("")[i];
      } else if (l == "]") {
        gap = true;
      }

      // Если это пропуск
      if (gap) {
        res.push(
          h(
            "span",
            {
              class: "fill-gaps-item__text"
            },
            letters
          )
        );
        letters = [];
        this.pushMissingAnswers(gapNum);
        res.push(
          h("input", {
            class: {
              "fill-gaps-item__input": true,
              "fill-gaps-item__input--correct":
                this.answers[gapNum].correct == true,
              "fill-gaps-item__input--uncorrect":
                !this.answers[gapNum].correct && this.answered
            },
            style: {
              // Ширина инпута в зависимости от длинны пропущенного слова
              width: String(this.sentenceMap[gapNum] * 10 + 10) + "px"
            },
            on: {
              input: event => {
                this.updateModelInput(
                  event.target.value,
                  event.target.dataset.index
                );
              }
            },
            attrs: {
              "data-index": gapNum
            },
            refInFor: true,
            ref: "input"
          })
        );
        gap = false;
        gapNum++;
      } else if (!gap) {
        letters.push(l);
      }

      if (i == this.newSentence.split("").length - 1) {
        res.push(
          h(
            "span",
            {
              class: "fill-gaps-item__text"
            },
            letters
          )
        );
        letters = [];
      }
    }
    return h(
      "div",
      {
        class: "fill-gaps-item",
        props: ["index"]
      },
      res
    );
  },
  data() {
    return {
      newSentence: "",
      sentenceMap: [],
      correct: null,
      answers: [],
      answered: false
    };
  },
  methods: {
    updateModelInput(val, inputIndex) {
      if (this.answers) {
        this.answers[inputIndex].val = val;
        this.$set(this.answers, inputIndex, this.answers[inputIndex]);
        this.$refs.input[inputIndex].value = val;
        this.sendData();
      }
    },
    updateAllmodels() {
      if (this.answers) {
        this.answers.forEach((ans, i) => {
          this.$refs.input[i].value = ans.val;
        });
      }
    },
    sendData() {
      this.$emit("sendChanges", {
        data: this._data,
        index: this.index
      });
    },
    pushMissingAnswers(inputIndex) {
      if (this.answers) {
        // Если в массиве ответа слишком мало элементов, то добавляем их ровно до inputIndex + 1
        if (inputIndex >= this.answers.length) {
          for (let i = 0; i < inputIndex - this.answers.length + 1; i++) {
            this.answers.push({
              val: "",
              correct: null
            });
          }
        }
      }
    },
    setSentenceMap() {
      if (this.sentence.match(/\[(.*?)\]/g)) {
        this.sentence.match(/\[(.*?)\]/g).forEach(gap => {
          this.sentenceMap.push(gap.length - 2);
        });
      }
    },
    getTitle(h) {
      this.newSentence = this.newSentence.replace(/<(.*?)>/g, "");
      let titleText = "";
      if (this.sentence.match(/<(.*?)>/g)) {
        titleText = this.sentence.match(/<(.*?)>/g)[0];
      }
      return h(
        "span",
        {
          class: "fill-gaps-item__title"
        },
        titleText.slice(1, titleText.length - 1)
      );
    },
    getImg(h) {
      if (this.img) {
        return h("img", {
          attrs: {
            src: this.IMGSTORE + this.img
          },
          class: "fill-gaps-item__img"
        });
      }
    },
    check() {
      if (this.answers) {
        let error = 0;
        this.answered = true;
        let trueAnswers = this.sentence.match(/\[(.*?)\]/g);
        for (let i = 0; i < this.answers.length; i++) {
          if (
            this.clearDeeper(trueAnswers[i]) ==
            this.clearDeeper(this.answers[i].val)
          ) {
            this.answers[i].correct = true;
          } else {
            error = true;
            this.answers[i].correct = false;
          }
        }
        this.$emit("oncheck", {
          index: this.index,
          result: this.answers
        });
        return error;
      }
    },
    customForceUpdate(data) {
      data.data.answers.forEach((ans, i) => {
        this.updateModelInput(ans.val, i);
      });
    }
  },
  computed: {
    ...mapGetters(["socket"])
  },
  beforeMount() {
    if (this.childSaved) {
      this._data = this.childSaved[this.index];
    }
    if (this.sentence) {
      this.setSentenceMap();
      this.newSentence = this.sentence.replace(/\[(.*?)\]/g, "[ ]");
    }
  },
  mounted() {
    if (this.childSaved) {
      this.updateAllmodels();
    }
  },
  props: {
    sentence: { required: true },
    img: { required: false },
    index: { required: false },
    childSaved: { required: false }
  }
};
</script>

<style lang="sass" scoped>
@import "@/components/Sass/Varibles.sass"

.fill-gaps-item
  border-radius: 10px
  display: inline-flex
  align-items: center
  padding: 10px
  &--correct
    background: $success_color
    color: $success_color--text
  &--uncorrect
    background: $error_color
    color: $error_color--text
  &__title
    font-weight: bold
    margin-right: 5px
  &__input
    outline: none
    text-align: center
    border-bottom: 1px solid #000
    margin: 0 5px
    &--correct
      color: $success_color
      border-bottom-color: $success_color
    &--uncorrect
      color: $error_color
      border-bottom-color: $error_color
  &__img
    display: inline-block
    max-height: 50px
    width: auto

.fill-gaps-item--uncorrect
  .fill-gaps-item__input
    color: $error_color--text
    border-bottom: 1px solid $error_color--text

.fill-gaps-item--correct
  .fill-gaps-item__input
    color: $success_color--text
    border-bottom: 1px solid $success_color--text
</style>
