<template>
  <div class="chip-skipped">
    <description :index="index">{{ inputCopy.description }}</description>
    <div class="chip-list">
      <chip
        v-for="(chip, i) in chipsList"
        :key="'2' + i"
        :state="chip.state"
        :text="chip.text"
        :answer="chip.text"
        :checkText="Boolean(chip.text)"
        @click="selectChip(i, chip.text)"
      />
    </div>
    <div
      class="answer-item"
      v-for="(item, i) in splitedWordsArr"
      :key="'3' + i"
    >
      <template v-for="(j, k) in item">
        <template>
          {{ j }}
          <chip-input
            :key="'4' + k"
            v-if="k != item.length - matchGaps"
            :index="index"
            :text="resultArr[i][k].text"
            :state="resultArr[i][k].state"
            :selected="resultArr[i][k].selected"
            @click="select(i, k)"
          ></chip-input>
        </template>
      </template>
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
      resultArr: [],
      unbound: false,
      splitedWordsArr: [],
      matchGaps: 0
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
      this.inputCopy.body.map(element => {
        if (element.sentence.match(/\[(.*?)\]/g)) {
          element.sentence.match(/\[(.*?)\]/g).map(word => {
            this.chipsList.push({
              text: word.replace("[", "").replace("]", ""),
              state: "default"
            });
          });
        }
      });
      this.chipsList = this.chipsList.sort(() => Math.random() - 0.5);
      this.inputCopy.body.map(element => {
        if (!(element.sentence.match(/\[(.*?)\]/g).length > 1))
          this.matchGaps = 1;
        this.splitedWordsArr.push(
          element.sentence.replaceAll(/\[(.*?)\]/g, "🐜").split("🐜")
        );
      });
    },
    unselect(i, k) {
      this.resultArr[i][k].text = "";
      let answerIndex = this.resultArr[i][k].answerIndex;
      if (this.selectedChips.includes(answerIndex)) {
        this.resultArr[i][k].answerIndex = null;
        this.selectedChips.splice(this.selectedChips.indexOf(answerIndex), 1);
        this.chipsList[answerIndex].state = "default";
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
      this.chipsList[i].state = "empty";
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
      let answers = [];
      // заполняем вспомогательный массив для вставки состояний, статуса и значений для чипсов (снизу)
      this.resultArr.map(element => {
        if (!element) return;
        element.map(e => {
          if (e && e.text) {
            answers.push({ answers: [e.text] });
          }
        });
      });
      console.log("answer:", answers);
      const data = {
        type: "lesson",
        type_check: this.inputCopy.type,
        section: this.inputCopy.section,
        answer: answers
      };
      let result = await api.methods.taskCheck(this.$route.params.id, data);
      result.result.map((answer, index) => {
        if (this.matchGaps > 0) {
          answer.answers[0] == true
            ? (this.resultArr[index][0].state = "success")
            : (this.resultArr[index][0].state = "error");
        } else {
          this.resultArr.map((element, i) => {
            element.map((e, k) => {
              if (e && e.text) {
                answer.answers[0] == true
                  ? (this.resultArr[i][k].state = "success")
                  : (this.resultArr[i][k].state = "error");
              }
            });
          });
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
    this.splitedWordsArr.map(e => {
      this.resultArr.push(
        e.map((e, i) => {
          if (i !== this.splitedWordsArr.length) {
            return {
              index: i,
              answerIndex: null,
              text: null,
              state: "default",
              selected: false
            };
          }
        })
      );
    });
  }
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
