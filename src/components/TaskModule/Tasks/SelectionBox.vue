<template>
  <div class="selection-box">
    <template v-for="(task, index) in taskBody">
      <template v-if="task.text !== null">
        <div class="task" :key="index">
          <div class="task__title">{{ index + 1 }}. {{ task.text }}</div>
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
      return { value: result.points, type: this.taskObject.type };
    }
  },
  mounted() {
    console.log("test123", this.taskObject.body);
    this.taskBody = this.taskObject.body;
    console.log(this.taskBody);
    this.selectAnswersArray = this.taskBody
      // .filter(element => element.text !== null)
      .map(element => {
        return element.answers.map(element => {
          // Добавляем новые свойства в объект
          return { answer: element, selected: false, state: "default" };
        });
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

  .task__title
    color: rgba(95, 0, 47, 1)

  .task__selection
    display: flex
    align-items: center
    gap: 8px
</style>
