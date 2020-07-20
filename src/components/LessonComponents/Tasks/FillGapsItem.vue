<script>
import "@/mixins/methods";

export default {
  name: "fill-gaps-item",
  render(h) {
    const res = [this.getTitle(h)];
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
              class: "fill-gaps-item__text",
              ref: "sentencePart",
              refInFor: true
            },
            letters
          )
        );
        letters = [];
        res.push(
          h("input", {
            class: "fill-gaps-item__input",
            style: {
              // Ширина инпута в зависимости от пропущенного слова
              width: String(this.sentenceMap[gapNum] * 10 + 10) + "px"
            },
            ref: "sentencePart",
            refInFor: true
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
              class: "fill-gaps-item__text",
              ref: "sentencePart",
              refInFor: true
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
        class: {
          "fill-gaps-item": true,
          "fill-gaps-item--correct": this.correct,
          "fill-gaps-item--uncorrect": !this.correct && this.correct != null
        }
      },
      res
    );
  },
  data() {
    return {
      newSentence: "",
      sentenceMap: [],
      correct: null
    };
  },
  methods: {
    setSentenceMap() {
      this.sentence.match(/\[(.*?)\]/g).forEach(gap => {
        this.sentenceMap.push(gap.length - 2);
      });
    },
    getTitle(h) {
      this.newSentence = this.newSentence.replace(/<(.*?)>/g, "");
      let titleText = this.sentence.match(/<(.*?)>/g)[0];
      return h(
        "span",
        {
          class: "fill-gaps-item__title"
        },
        titleText.slice(1, titleText.length - 1)
      );
    },
    check() {
      let res = "";
      this.$refs.sentencePart.forEach(part => {
        res += part.value != undefined ? part.value : part.textContent;
      });
      if (
        this.clear(res) ==
        this.clearDeeper(this.sentence.replace(/<(.*?)>/g, ""))
      ) {
        this.correct = true;
      } else {
        this.correct = false;
      }
    }
  },
  beforeMount() {
    this.setSentenceMap();
    this.newSentence = this.sentence.replace(/\[(.*?)\]/g, "[ ]");
  },
  props: {
    sentence: { required: true }
  }
};
</script>

<style lang="sass" scoped>
@import "@/components/Sass/Varibles.sass"

.fill-gaps-item
  border-radius: 10px
  display: inline-block
  padding: 10px
  &--correct
    background: $success_color
    color: $success_color--text
  &--uncorrect
    background: $error_color
    color: $error_color--text
  &__title
    font-weight: bold
    font-size: 20px
    margin-right: 3px
  &__input
    outline: none
    text-align: center
    border-bottom: 1px solid #000
    margin: 0 5px

.fill-gaps-item--uncorrect
  .fill-gaps-item__input
    color: $error_color--text
    border-bottom: 1px solid $error_color--text

.fill-gaps-item--correct
  .fill-gaps-item__input
    color: $success_color--text
    border-bottom: 1px solid $success_color--text
</style>
