<template>
  <div class="selection-box">
    <div v-for="(item, index) in selectAnswersArray" :key="index">
      <div v-if="item !== null">{{ item }}</div>
    </div>
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
import Chip from "../Widjets/Chip";

export default {
  name: "SelectionBox",
  data() {
    return {
      taskBody: undefined,
      selectAnswersArray: []
    };
  },
  props: {
    taskObject: Object
  },
  components: {
    Chip
  },
  methods: {
    selectAnswer(row, i) {
      // "Выбрать / Отменить" вариант ответа
      this.selectAnswersArray[row][i].selected = !this.selectAnswersArray[row][
        i
      ].selected;
    },
    getDataForCheck() {
      return {
        type: "lesson",
        type_check: this.taskObject.type,
        section: this.taskObject.section,
        answer: this.selectAnswersArray.map(row => {
          // if ((typeof row[Symbol.iterator] !== "function") === false)
          //   return { answers: [] };
          return {
            answers: row.map(answer => {
              if (answer.selected === true) {
                return answer.selected;
              }
            })
          };
        })
      };
    },
    check() {
      console.log("test getDataForCheck:", this.getDataForCheck());
    }
  },
  mounted() {
    this.taskBody = this.taskObject.body;
    this.selectAnswersArray = this.taskBody
      .filter(element => element.text !== null)
      .map(element => {
        return element.answers.map(element => {
          return { answer: element, selected: false };
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
