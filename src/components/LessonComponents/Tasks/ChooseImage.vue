<template>
  <div class="choose-img vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <div v-for="(choose, i) in task" :key="i" class="choose-img__item">
      <p>{{ choose.text }}</p>
      <div
        class="choose-img__img-wrap"
        v-for="(answer, j) in choose.answers"
        :key="j"
      >
        <v-img
          class="choose-img__img"
          :src="getFileName(answer)"
          v-zoom
          :class="{
            'choose-img__img--correct': answer.correctAnsewered == true,
            'choose-img__img--uncorrect': answer.correctAnsewered == false,
          }"
        />
        <tick
          class="choose-img__select"
          color="#c3ab7c"
          :tickActive="answer.selected"
          @click.native="toggleChoose(answer)"
        />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Description from "./TasksDescription";
import Tick from "@/components/Icons/Tick";

import { mapGetters, mapMutations } from "vuex";
import Zoom from "@/directives/zoom";

export default {
  name: "choose-img",
  data: function () {
    return {
      task: {},
      inputCopy: false,
    };
  },
  methods: {
    ...mapMutations(["saveTask", "saveChildTask"]),
    getFileName(element) {
      return element?.file?.file_name_abs;
    },
    check() {
      this.error = false;
      this.task.forEach((item) => {
        item.answers.forEach((answer) => {
          answer.correctAnsewered = answer.selected == answer.correct;
          if (!this.error) {
            this.error = !answer.correctAnsewered;
          }
        });
      });
      this.$forceUpdate();
    },
    showAnswers() {
      this.task.forEach((item) => {
        item.answers.forEach((answer) =>
          this.$set(answer, "selected", answer.correct)
        );
        this.$forceUpdate();
      });
    },
    toggleChoose(answer) {
      this.$set(answer, "selected", !answer.selected);
      // Этот костыль надо поправить в будущем
      this.$forceUpdate();
    },
    setTask() {
      this.task = this.inputCopy.body.map((task) => {
        task.answers = task.answers.map((answer) => {
          answer.selected = false;
          answer.correctAnsewered = null;
          return answer;
        });
        return task;
      });
    },
  },
  computed: {
    ...mapGetters(["socket"]),
  },
  components: {
    Description,
    Tick,
  },
  directives: {
    ...Zoom,
  },
  props: ["input", "saved", "index"],
  beforeMount() {
    this.setTask();
  },
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.choose-img
  &__img-wrap
    position: relative
    display: inline-block
    max-width: 45%
    margin-right: 10px
    margin-bottom: 10px
  &__img
    &--correct
      border: 5px solid $success_color
    &--uncorrect
      border: 5px solid $error_color
  &__select
    width: 35px
    height: 35px
    position: absolute
    bottom: 5px
    left: 5px
    cursor: pointer
    background: #0007
</style>
