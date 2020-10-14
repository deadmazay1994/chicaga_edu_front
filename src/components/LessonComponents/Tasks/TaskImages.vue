<template>
  <div class="task-image-numbers">
    <v-row>
      <v-col
        lg="6"
        v-for="(tasks, index) in task.shuffled"
        :key="tasks.word"
        @click="setFocus(index)"
      >
        <div class="img-task" :class="answeredClass(index)">
          <div class="img-task__check">
            <div class="img-task__word">{{ tasks.word }}</div>
            <div class="img-task__input">
              <input
                class="input"
                ref="input"
                v-model="task.answers[index]"
                maxlength="1"
                @input="onChangeTask"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                type="number"
              />
            </div>
          </div>
          <v-img
            v-zoom
            :src="IMGSTORE + tasks.name"
            lazy-src="data:image/gif;base64,R0lGODlhBgAFAIAAAP///wAAACH5BAEAAAEALAAAAAAGAAUAAAIFjI+pawUAOw=="
            contain
          ></v-img>
        </div>
      </v-col>
    </v-row>
    <slot></slot>
  </div>
</template>

<script>
import "@/mixins/methods";
import { mapGetters, mapMutations } from "vuex";
import Zoom from "@/directives/zoom";

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
    ...mapMutations(["saveTask"]),
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
    check() {
      this.error = false;
      this.task.shuffled.forEach((task, i) => {
        if (task.number == Number(this.task.answers[i])) {
          task.correct = 1;
        } else {
          task.correct = 0;
          this.error = true;
        }
      });
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
    }
  },
  computed: {
    ...mapGetters(["socket", "teacherId"])
  },
  components: {},
  directives: {
    ...Zoom
  },
  props: ["input", "index"],
  beforeMount() {
    this.setInputCopy();
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
@import "@/components/Sass/Varibles.sass"

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
