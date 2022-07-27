<template>
  <div class="task-image-numbers">
    <scroll-x>
      <div class="task-imgs">
        <div
          class="img-task"
          v-for="(tasks, index) in task.shuffled"
          :key="tasks.word"
          @click="setFocus(index)"
          :class="answeredClass(index)"
        >
          <div class="img-task__check">
            <div class="img-task__word">{{ tasks.word }}</div>
            <div class="img-task__input">
              <input
                class="input"
                ref="input"
                v-model="task.answers[index]"
                maxlength="1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                type="number"
              />
            </div>
          </div>
          <img :src="getFileName(tasks)" />
        </div>
      </div>
    </scroll-x>
  </div>
</template>

<script>
import "@/mixins/methods";
import api from "@/mixins/api";
import { mapGetters, mapMutations } from "vuex";
import ScrollX from "@/components/Base/ScrollX.vue";

export default {
  name: "task-images",
  data: function() {
    return {
      description: "",
      task: {
        answers: [],
        shuffled: []
      },
      error: true,
      inputCopy: false
    };
  },
  methods: {
    ...mapMutations(["saveTask", "setPointByType"]),
    setShuffled() {
      // let arr = this.shuffle(this.inputCopy.body);
      // Перемешивание отключено
      if (!this._data.isSavedTask) {
        this.task.shuffled = this.inputCopy.body;
      }
    },
    setAlphabetical() {
      let arr = this.alphabetical(this.task.shuffled);
      this.task.shuffled = arr;
    },
    setFocus(index) {
      this.$refs.input[index].focus();
    },
    answeredClass(i) {
      return {
        "img-task--correct": this.task.shuffled[i].correct == 1,
        "img-task--in-correct": this.task.shuffled[i].correct == 0
      };
    },
    async getLesson() {
      let r = await api.methods.getFullLesson(this.$route.params.id);
      return {
        type: r.lesson[this.activeGroupIndexLesson].tasks[0].type,
        section: r.lesson[this.activeGroupIndexLesson].tasks[0].section,
        id: r.id
      };
    },
    async check() {
      this.error = false;
      let answers = this.task.answers;
      const TYPE_CHECK = this.inputCopy.type;
      console.log();
      const data = {
        type: "lesson",
        type_check: this.inputCopy.type,
        section: this.inputCopy.section,
        answer: answers
      };
      let result = await api.methods.taskCheck(this.$route.params.id, data); // mock
      this.task.shuffled.forEach((task, i) => {
        task.correct = result.result[i];
        this.error = result.result[i];
      });
      return {
        value: result.points,
        type: TYPE_CHECK,
        answer: result.result
      };
    },
    showAnswers() {
      this.task.shuffled.forEach((task, i) =>
        this.$set(this.task.answers, i, task.number)
      );
    },
    setAnswers() {
      this.inputCopy.body.forEach(() => this.task.answers.push(""));
    },
    getGroup(answer) {
      for (const i in this.task.groups) {
        if (this.task.groups[i].answer == answer) {
          return this.task.groups[i];
        }
      }
    },
    getFileName(element) {
      return element?.file?.file_name_abs || element?.file_name_abs;
    }
  },
  computed: {
    ...mapGetters(["activeGroupIndexLesson"])
  },
  components: { ScrollX },
  directives: {},
  props: ["input", "taskObject", "unique_id"],
  beforeMount() {
    this.inputCopy = this.taskObject;
    console.log(this.taskObject);
    this.description = this.inputCopy.description;
    this.setAnswers();
    this.setShuffled();
    if (!this._data.isSavedTask) {
      this.setAlphabetical();
    }
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.task-image-numbers
  width: 100%

.task-imgs
  display: flex
  column-gap: 4px

.img-task
  position: relative
  display: flex
  align-items: center
  justify-content: center
  flex-shrink: 0
  min-width: 50px
  max-width: 250px
  height: 180px
  background-color: #fff
  border: 2px solid #fff
  border-radius: 4px
  overflow: hidden
  &__check
    position: absolute
    bottom: 3px
    left: 3px
    display: flex
    width: 60px
    font-weight: 600
    font-size: 24px
    line-height: 32px
    background-color: #dcdcdc
    border: 2px solid #fff
    border-radius: 10px
    overflow: hidden
    z-index: 4
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button
      -webkit-appearance: none
    input[type='number']
      width: 100%
      outline: none
      text-align: center
      -moz-appearance: textfield
  &__word, &__input
    width: 50%
    padding-right: 2px
    padding-left: 2px
    text-align: center
  &__word
    border-right: 1px solid #fff
  img
    max-width: 100%
    max-height: 100%
    object-fit: contain

  &--correct
    .img-task
      &__check
        border-color: #8EDC51
        background-color: #E9FFD6
        input
          color: #8EDC51
      &__word
        border-color: #8EDC51
        color: #8EDC51

  &--in-correct
    .img-task
      &__check
        border-color: #E94A45
        background-color: #FDEDEC
        input
          color: #E94A45
      &__word
        border-color: #E94A45
        color: #E94A45
</style>
