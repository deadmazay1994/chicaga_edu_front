<template>
  <div class="chip-skipped">
    <!-- <description :index="index">{{ inputCopy.description }}</description> -->
    <div class="chip-list">
      <chip
        v-for="(chip, i) in variantsList"
        :key="'2' + i"
        :state="chip.state"
        :text="chip.text"
        :answer="chip.text"
        :checkText="Boolean(chip.text)"
        @click="selectChip(i, chip.text)"
      />
    </div>
    <div class="answer-item" v-for="(item, i) in sentencesMap" :key="'3' + i">
      <template v-for="(text, j) in item">
        <template>
          {{ text.replaceAll("{gap}", "") }}
          <chip-input
            v-if="text.endsWith('{gap}')"
            :key="'4' + j"
            :index="index"
            :text="resultArr[i][j].text"
            :state="resultArr[i][j].state"
            :selected="resultArr[i][j].selected"
            @click="select(i, j)"
          ></chip-input>
        </template>
      </template>
    </div>
    <slot></slot>
  </div>
</template>

<script>
// import Description from "./TasksDescription.vue";
import ChipInput from "../Widjets/Chip/ChipInput.vue";
import Chip from "../Widjets/Chip/index.vue";

import { mapMutations } from "vuex";
import api from "@/mixins/api";

const regularGaps = /\[(.*?)\]/g;

export default {
  name: "InsertSkippedWord",
  components: {
    // Description,
    ChipInput,
    Chip
  },
  data() {
    return {
      // Чипсы, которые выводятся в списке вариантов
      variantsList: [],
      inputCopy: {},
      selectedIndex: null,
      selectedChips: [],
      resultArr: [],
      unbound: false,
      // Карты предложений
      // Массив частей предложений
      // После каждой части гарантированно идет пропуск
      // Части могут быть и пустумы строками
      sentencesMap: []
    };
  },
  props: {
    input: { require: true },
    index: { require: false },
    taskObject: Object
  },
  methods: {
    ...mapMutations(["setPointByType"]),
    unselect(i, k) {
      this.resultArr[i][k].text = "";
      let answerIndex = this.resultArr[i][k].answerIndex;
      if (this.selectedChips.includes(answerIndex)) {
        this.resultArr[i][k].answerIndex = null;
        this.selectedChips.splice(this.selectedChips.indexOf(answerIndex), 1);
        this.variantsList[answerIndex].state = "default";
      }
    },
    // выбираем пропущенное слово снизу
    select(i, k) {
      // если мы не выбирали ответ - selectedIndex == null
      if (this.unbound === true) {
        // отмена чипса при повторном нажатии на него
        this.unselect(i, k);
      }
      this.resultArr.map(element => {
        element.map(e => {
          if (e) {
            e.selected = false;
          }
        });
      });
      this.selectedIndex = null;
      this.selectedIndex = { firstIndex: i, secondIndex: k };
      this.resultArr[i][k].selected = true;
    },
    // выбираем ответ сверху
    selectChip(i, text) {
      if (this.selectedIndex === null) return;
      if (this.selectedChips.includes(i)) return;
      // верхнему, выбранному чипсу присваиваем состояние - 'empty'
      this.variantsList[i].state = "empty";
      this.resultArr[this.selectedIndex.firstIndex][
        this.selectedIndex.secondIndex
      ].selected = false;
      this.resultArr[this.selectedIndex.firstIndex][
        this.selectedIndex.secondIndex
      ].answerIndex = i;

      this.resultArr[this.selectedIndex.firstIndex][
        this.selectedIndex.secondIndex
      ].text = text;

      // заполняем список (индексов) уже выбранных чипсов
      this.selectedChips.push(i);
      this.selectedIndex = null;
      this.unbound = true;
    },
    async check() {
      let result = await api.methods.taskCheck(
        this.$route.params.id,
        this.getDataForCheck()
      );
      this.dispalyResults(result.result);
      return { value: result.points, type: this.inputCopy.type };
    },
    setVariantsList() {
      // Устнавливаем варианты из пропусков
      this.inputCopy.body.map(element => {
        let matches = element.sentence.match(regularGaps);
        if (!matches) return;
        matches.forEach(word => {
          this.variantsList.push({
            text: word.replace("[", "").replace("]", ""),
            state: "default"
          });
        });
      });
      // Устанавливаем варианты из лишних/дополнительных слов
      let extraWords = this.inputCopy?.extra_words?.split
        ? this.inputCopy.extra_words.split(",")
        : [];
      this.variantsList = [
        ...this.variantsList,
        ...extraWords.map(text => ({
          text,
          state: "default"
        }))
      ];
      // Перемашиваем, чтобы проходить задание было интересней
      this.variantsList = this.variantsList.sort(() => Math.random() - 0.5);
    },
    setSentencesMap() {
      this.sentencesMap = this.inputCopy.body.map(element => {
        // Для коректной работы алгоритма требуется, чтобы предложение начиналось и заканчивалось не с пропуска
        // Иначе при split все начинает путаться
        // Добавим к каждому предложение по сиволу в начало и конец
        // Тогда алгоритм будет работать корректно, а потом уберем эти символы
        let updatedSentense = "a" + element.sentence + "a";
        // По {gap} потом будем понимать, что в строке был пропуск
        // Все строки, которые получаться будут заканичваться на {gap}
        let textMap = updatedSentense
          .replaceAll(regularGaps, "{gap}🐜")
          .split("🐜");
        // Удаляем символы, которые оказались в первом и последнем массивах
        // В начале и в конце соответсвенно
        const textMapLength = textMap.length;
        if (textMap[0]?.slice) textMap[0] = textMap[0].slice(1);
        if (textMap[textMapLength - 1]?.slice)
          textMap[textMapLength - 1] = textMap[textMapLength - 1].slice(0, -1);
        return textMap.filter(i => i);
      });
    },
    getDataForCheck() {
      return {
        type: "lesson",
        type_check: this.inputCopy.type,
        section: this.inputCopy.section,
        answer: this.resultArr.map(row => {
          if (!row.map) return { answers: [] };
          return {
            answers: row.map(gap => (gap.text !== null ? gap.text : ""))
          };
        })
      };
    },
    initResultArr() {
      this.resultArr = this.sentencesMap.map(sentence =>
        sentence
          .filter(sentence => sentence.endsWith("{gap}"))
          .map((_, i) => ({
            index: i,
            answerIndex: null,
            text: null,
            state: "default",
            selected: false
          }))
      );
    },
    dispalyResults(results) {
      for (const i in results) {
        let row = results[i];
        row.answers
          .filter(answer => {
            console.log(answer);
            return true;
          })
          .forEach((answer, j) => {
            if (!this.resultArr[i][j]) return;
            this.resultArr[i][j].state = answer ? "success" : "error";
          });
      }
    }
  },
  beforeMount() {
    // this.setInputCopy();
    this.inputCopy = this.taskObject;
    console.log("inputCopy:", this.inputCopy);
    this.setVariantsList();
    this.setSentencesMap();
    this.initResultArr();
  },
  mounted() {}
};
</script>

<style lang="sass" scoped>
.chip-skipped
  display: block
  overflow: visible !important

  .answer-item
    margin-top: 10px

  .chip-list
    .chip
      margin-bottom: 3.5px
      margin-right: 5px
      &:last-child
        margin-right: 0
</style>
