<script>
import "@/mixins/methods";
import api from "@/mixins/api";
import { mapGetters } from "vuex";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default {
  name: "fill-gaps-item",
  render(h) {
    const res = [this.getImg(h)];
    let gap = false;
    let letters = [];
    // Номер пропуска
    let gapNum = 0;
    if (this.newSentence) {
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
          if (!this.inputSize) this.setInputSize(this.sentenceMap[gapNum] * 10);
          res.push(
            h("input", {
              class: {
                "fill-gaps-item__input": true,
                "fill-gaps-item__input--correct":
                  this.answers[gapNum].correct === true,
                "fill-gaps-item__input--uncorrect":
                  !this.answers[gapNum].correct &&
                  this.answers[gapNum].correct != null
              },
              style: {
                // Ширина инпута в зависимости от длинны пропущенного слова
                width: this.inputSize + "px"
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
    } else {
      console.log("this.newSentence is false: render:parseText");
    }
    return h(
      "div",
      {
        class: "fill-gaps-item",
        props: ["index"],
        ref: "fillGapsItem"
      },
      res
    );
  },
  data() {
    return {
      inputSize: 0,
      newSentence: "",
      sentenceMap: [],
      correct: null,
      answers: [],
      answered: false
    };
  },
  methods: {
    setInputSize(number) {
      this.inputSize = number + getRandomInt(number + 10) + 10;
    },
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
    createElementFromHTML(htmlString) {
      var div = document.createElement("div");
      div.innerHTML = htmlString.trim();

      // Change this to div.childNodes to support multiple top-level nodes
      return div.firstChild;
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
    async getLesson() {
      let r = await api.methods.getFullLesson(this.$route.params.id);
      return {
        type: r.lesson[this.activeGroupIndexLesson].tasks[0].type,
        section: r.lesson[this.activeGroupIndexLesson].tasks[0].section,
        id: r.id
      };
    },
    check() {
      let answers = [];
      if (this.answers) {
        this.answered = true;
        this.answers.forEach(elem => {
          answers.push(elem);
        });
        this.getLesson().then(res => {
          const data = {
            type: "lesson",
            type_check: res.type,
            section: res.section,
            answer: [{ answers: answers.map(a => a.val) }]
          };
          console.log("FillGapsItem.vue res:", res); // test
          let result = api.methods.taskCheck(res.id, data); // mock
          result.then(res => {
            this.answers.forEach((_, i) => {
              this.answers[i].correct = res[i];
            });
          });
        });
      }
    },
    setStatus(result) {
      result.forEach((correct, i) => {
        if (!this.answers[i]) this.answers[i] = {};
        this.answers[i].correct = correct;
      });
      this.$emit("oncheck", {
        index: this.index,
        result: this.answers
      });
    },
    showAnswers() {
      let trueAnswers = this.sentence.match(/\[(.*?)\]/g);
      if (trueAnswers) {
        trueAnswers.forEach((ans, i) =>
          this.updateModelInput(ans.substring(1, ans.length - 1), i)
        );
      }
    },
    customForceUpdate(data) {
      data.answers.forEach((ans, i) => {
        this.updateModelInput(ans.val, i);
      });
    },
    parseText() {
      if (this.$refs.fillGapsItem) {
        this.$refs.fillGapsItem
          .querySelectorAll(".fill-gaps-item__text")
          .forEach(el => {
            let parsed = el.textContent.replace(
              /</g,
              "<span class='fill-gaps-item__title'"
            );
            parsed = parsed
              .replace(/>/g, "</span>")
              .replace(/__title'/g, "__title'>");
            el.textContent = "";
            el.insertAdjacentHTML("beforeend", parsed);
          });
      } else {
        console.log("this.$refs.fillGapsItem is false: FillGapsItem:parseText");
      }
    }
  },
  computed: {
    ...mapGetters(["socket", "activeGroupIndexLesson"]),
    answer() {
      return this.answers.map(a => a.val);
    }
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
    this.parseText();
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

<style lang="sass">
// Scoped не ставить!!!
@import "@/assets/styles/variables.sass"

.fill-gaps-item
  border-radius: 10px
  // display: inline-flex
  // align-items: center
  padding: 10px
  width: calc( 100% - 40px )
  margin-left: 8px
  &--correct
    background: $success_color
    color: $success_color--text
  &--uncorrect
    background: $error_color
    color: $error_color--text
  &__title
    font-weight: bold
  &__input
    outline: none
    text-align: center
    border-bottom: 1px solid #000
    margin: 0 8px
    &:first-child
      margin: 0
    &--correct
      color: $success_color
      border-bottom-color: $success_color
    &--uncorrect
      color: $error_color
      border-bottom-color: $error_color
  &__img
    display: block
    max-width: 100%
    margin: 0 auto
    margin-bottom: 5px
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
