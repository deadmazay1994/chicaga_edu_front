<template>
  <div class="chip-skipped">
    {{ selectedChips }}
    <hr />
    {{ inputCopy.body }}
    <hr />
    {{ resultArr }}
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
    select(i) {
      if (this.selectedIndex !== null) {
        console.log("unselect", i, this.resultArr[i].index);
        this.resultArr[i].text = "";
        this.chipsList[i].state = "default";
        this.selectedChips.forEach(element => {
          if (this.resultArr[i].index == element) {
            this.selectedChips.splice(element);
            this.chipsList[element].state = "default";
          }
        });
      }
      this.resultArr.forEach(element => {
        element.selected = false;
      });
      this.selectedIndex = null;
      this.selectedIndex = i;
      this.resultArr[i].selected = true;
    },
    selectChip(i, text) {
      if (this.selectedIndex === null) return;
      if (this.selectedChips.includes(i)) return;
      // верхнему, выбранному чипсу присваиваем состояние - 'empty'
      this.chipsList[i].state = "empty";
      this.resultArr[this.selectedIndex].selected = false;
      this.resultArr[this.selectedIndex].text = text;
      // список (индексов) уже выбранных чипсов
      this.selectedChips.push(i);
    },
    // async getLesson() {
    //   let r = await api.methods.getFullLesson(this.$route.params.id);
    //   return {
    //     type: r.lesson[this.activeGroupIndexLesson].tasks[0].type,
    //     section: r.lesson[this.activeGroupIndexLesson].tasks[0].section,
    //     id: r.id
    //   };
    // },
    async check() {
      let answers = [];

      this.resultArr.forEach(element => {
        answers.push({ answers: [element.text] });
      });
      // let r = await this.getLesson();
      console.log("answer:", answers);
      const data = {
        type: "lesson",
        type_check: this.inputCopy.type,
        section: this.inputCopy.section,
        answer: answers
      };
      console.log("ответ:", this.inputCopy);
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
        state: "default"
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
