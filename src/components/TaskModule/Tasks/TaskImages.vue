<template>
  <div class="task-image-numbers">
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
</template>

<script>
import "@/mixins/methods";
import api from "@/mixins/api";
import { mapGetters, mapMutations } from "vuex";

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
      return { value: result.points, type: TYPE_CHECK };
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
      return element?.file?.file_name_abs;
    }
  },
  computed: {
    ...mapGetters(["activeGroupIndexLesson"])
  },
  components: {},
  directives: {},
   props: {
    input: { require: true },
    taskObject: Object
  },
  beforeMount() {
    this.inputCopy = this.taskObject;
    console.log(this.taskObject)
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

.img-task
  position: relative
  display: flex
  &__check
    max-width: 50px
    position: absolute
    z-index: 4
    bottom: 10px
    left: 10px
    background: #fff
    border: 1px solid #000
    border-radius: 3px
    display: flex
    overflow: hidden
    flex-direction: row
    box-shadow: 0 0 11px rgba(0, 0, 0, 0.14)
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button
      -webkit-appearance: none
    input[type='number']
      width: 20px
      outline: none
      text-align: center
  &__word, &__input
    width: 30px
    text-align: center
  &__word
    border-right: 1px solid #000
    padding: 0 4px 0 4px

  &--correct
    .img-task
      &__check
        border-color: $success_color

      &__word
        background-color: $success_color
        border-color: $success_color
        color: $success_color--text
  &--in-correct
    .img-task
      &__check
        border-color: $error_color

      &__word
        background-color: $error_color
        border-color: $error_color
        color: $error_color--text
</style>
