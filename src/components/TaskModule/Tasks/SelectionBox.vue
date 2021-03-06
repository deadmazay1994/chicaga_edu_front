<template>
  <div class="selection-box">
    <template v-for="(task, index) in taskBody">
      <template v-if="task.text !== null">
        <div class="task" :key="index">
          <div class="task__title" v-html="index + 1 + '. ' + task.text"></div>
          <div class="task__selection">
            <template v-for="(answerObject, i) in selectAnswersArray[index]">
              <template>
                <chip
                  :key="i"
                  :text="answerObject.answer.text"
                  :checkText="true"
                  :selected="answerObject.selected"
                  :state="answerObject.state"
                  @click="selectAnswer(index, i)"
                />
              </template>
            </template>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import api from "@/mixins/api";

import Chip from "../Widjets/Chip/";

export default {
  name: "SelectionBox",
  data() {
    return {
      taskBody: undefined,
      selectAnswersArray: []
    };
  },
  props: {
    taskObject: Object,
    unique_id: String,
    singleSelect: {
      type: Boolean,
      default: false
    },
    mutationResponse: {
      type: Function,
      default: response => response.result
    },
    getAnswersFunction: {
      type: Function,
      default: null
    }
  },
  components: {
    Chip
  },
  methods: {
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex]
        ];
      }

      return array;
    },
    selectAnswer(row, i) {
      // "Выбрать / Отменить" вариант ответа
      if (this.singleSelect) {
        this.selectAnswersArray[row].map(element => (element.selected = false));
      }
      this.selectAnswersArray[row][i].selected = !this.selectAnswersArray[row][
        i
      ].selected;
    },
    getDataForCheck() {
      let answerFunction = selectAnswersArray => {
        return selectAnswersArray.map(row => {
          if (!Array.isArray(row)) return [];
          return row.map(answer => {
            if (answer.selected === true) return 1;
            else return 0;
          });
        });
      };
      if (this.getAnswersFunction) answerFunction = this.getAnswersFunction;
      return {
        type: "lesson",
        type_check: this.taskObject.type,
        section: this.taskObject.section,
        answer: answerFunction(this.selectAnswersArray)
      };
    },
    displayResults(results) {
      results.map((row, i) => {
        row.map((answer, j) => {
          if (!this.selectAnswersArray[i][j]) return;
          this.selectAnswersArray[i][j].state = answer ? "success" : "error";
        });
      });
    },
    async check() {
      let result = await api.methods.taskCheck(
        this.unique_id,
        this.getDataForCheck()
      );
      const resultObj = {
        result: result.result,
        userSelected: this.selectAnswersArray // сюда передать выбор пользователя
      };
      let resultMutated = this.mutationResponse(resultObj);
      this.displayResults(resultMutated);
      return {
        value: result.points,
        type: this.taskObject.type,
        answer: result.result
      };
    }
  },
  mounted() {
    this.taskBody = this.taskObject.body;
    this.selectAnswersArray = this.taskBody.map(element => {
      return this.shuffle(
        element.answers.map(element => {
          return { answer: element, selected: false, state: "default" };
        })
      );
    });
  }
};
</script>

<style lang="sass" scoped>
.selection-box
  display: flex
  flex-direction: column
  gap: 16px

.task
  display: flex
  align-items: center
  justify-content: space-between
  flex-wrap: wrap
  column-gap: 8px

  .task__title
    color: rgba(95, 0, 47, 1)

  .task__selection
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 8px

  .chip
    text-align: left
</style>
