<template>
  <div class="chip-skipped">
    <description :index="index">{{ inputCopy.description }}</description>
    <div class="chip-list">
      <chip
        v-for="(chip, i) in chipsList"
        :key="i"
        :state="chip.state"
        :text="chip.text"
        @clickElem="selectChip(i, chip.text)"
      />
    </div>
    <div class="answer-item" v-for="(item, i) in inputCopy.body" :key="i">
      <chip-input
        :sentence="item.sentence"
        :selected="resultArr[i].selected"
        :index="index"
        :text="resultArr[i].text"
        :state="resultArr[i].state"
        @clickElement="select(i)"
      ></chip-input>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Description from "./TasksDescription.vue";
import ChipInput from "./ChipInput.vue";
import Chip from "./Chip.vue";

import { mapMutations } from "vuex";
import api from "@/mixins/api";

export default {
  name: "ChipSkipped",
  components: {
    Description,
    ChipInput,
    Chip
  },
  data() {
    return {
      chipsList: [],
      inputCopy: {},
      selectedIndex: null,
      selectText: null,
      selectedChips: [],
      resultArr: []
    };
  },
  props: {
    input: { require: true },
    drag: { require: false },
    index: { require: false }
  },
  methods: {
    ...mapMutations(["setPointByType"]),
    setChipsList() {
      this.chipsList = [];
      this.inputCopy.body.forEach(element => {
        if (element.sentence.match(/\[(.*?)\]/g)) {
          element.sentence.match(/\[(.*?)\]/g).forEach(word => {
            this.chipsList.push({
              text: word.replace("[", "").replace("]", ""),
              state: "default"
            });
          });
        }
      });
    },
    unselect(i) {
      this.resultArr[i].text = "";
      let answerIndex = this.resultArr[i].answerIndex;
      if (this.selectedChips.includes(answerIndex)) {
        this.selectedChips.splice(this.selectedChips.indexOf(answerIndex), 1);
        this.chipsList[answerIndex].state = "default";
      }
    },
    // выбираем пропущенное слово снизу
    select(i) {
      // если мы не выбирали ответ - selectedIndex == null
      if (this.selectedIndex !== null) {
        // отмена чипса при повторном нажатии на него
        this.unselect(i);
      }
      this.resultArr.forEach(element => {
        element.selected = false;
      });
      this.selectedIndex = null;
      this.selectedIndex = i;
      this.resultArr[i].selected = true;
    },
    // выбираем ответ сверху
    selectChip(i, text) {
      if (this.selectedIndex === null) return;
      if (this.selectedChips.includes(i)) return;
      // верхнему, выбранному чипсу присваиваем состояние - 'empty'
      this.chipsList[i].state = "empty";
      this.resultArr[this.selectedIndex].selected = false;
      this.resultArr[this.selectedIndex].answerIndex = i;

      this.resultArr[this.selectedIndex].text = text;

      // заполняем список (индексов) уже выбранных чипсов
      this.selectedChips.push(i);
      this.selectedIndex = null;
    },
    async check() {
      let answers = [];
      // заполняем вспомогательный массив для вставки состояний, статуса и значений для чипсов (снизу)
      this.resultArr.forEach(element => {
        answers.push({ answers: [element.text] });
      });
      console.log("answer:", answers);
      const data = {
        type: "lesson",
        type_check: this.inputCopy.type,
        section: this.inputCopy.section,
        answer: answers
      };
      let result = await api.methods.taskCheck(this.$route.params.id, data);
      result.result.forEach((element, index) => {
        if (element[0] === true) {
          this.resultArr[index].state = "success";
        } else {
          this.resultArr[index].state = "error";
        }
      });
      return { value: result.points, type: this.inputCopy.type };
    }
  },
  beforeMount() {
    this.setInputCopy();
    this.setChipsList();
  },
  mounted() {
    console.log("inputCopy:", this.inputCopy);
    this.inputCopy.body.forEach((_, i) => {
      this.resultArr.push({
        index: i,
        text: null,
        selected: false,
        state: "default",
        answerIndex: null
      });
    });
  }
};

// const clickHandler = function() {
//   alert("Hi");
// };

// EventBus.$on("clicked", clickHandler);
</script>

<style lang="sass" scoped>
.chip-skipped
  display: block
  overflow: visible !important

  .answer-item
    margin-top: 10px

  .chip-list
    .chip + .chip
      margin-left: 1rem
</style>
