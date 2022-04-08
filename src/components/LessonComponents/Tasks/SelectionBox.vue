<template>
  <div class="selection-box vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <table>
      <tr v-if="!underline">
        <td class="table-title"></td>
        <td
          class="table-title"
          v-for="(state, i) in inputCopy.addons"
          :key="i + 'b'"
        >
          {{ state }}
        </td>
      </tr>
      <tr v-for="(task, i) in inputCopy.body" :key="i">
        <td class="table-item" :class="statusClass(i)">{{ task.text }}</td>
        <td
          class="table-item"
          :class="{ ...statusClass(i), ...{ 'pa-0': underline } }"
          v-for="(ans, j) in task.answers"
          :key="j + 'a'"
        >
          <v-checkbox
            v-if="!underline"
            v-model="answers[i][j]"
            class="pa-0 selection-box__checkbox"
            :color="checkboxColor(i)"
            @click.native="onChangeTask"
          ></v-checkbox>
          <div
            :class="{ ...activeAnswerClass(i, j), ...statusClass(i) }"
            v-if="underline"
            class="pa-3"
            @click="
              toggleAnswer(i, j);
              onChangeTask();
            "
          >
            {{ ans.text }}
          </div>
        </td>
      </tr>
    </table>

    <slot></slot>
  </div>
</template>

<script>
import Description from "./TasksDescription";

import { mapGetters, mapMutations } from "vuex";

import api from "@/mixins/api";

export default {
  name: "selection-box",
  data: function() {
    return {
      answers: [],
      results: [],
      inputCopy: {},
      error: true
    };
  },
  methods: {
    ...mapMutations(["saveTask"]),
    activeAnswerClass(i, j) {
      return {
        "selection-box__box--active--underline": this.answers[i][j]
      };
    },
    toggleAnswer(i, j) {
      // Copy
      let tmp = this.answers[i].slice();
      tmp[j] = !tmp[j];
      this.$set(this.answers, i, tmp);
    },
    setAnswersArr() {
      this.inputCopy.body.forEach(task => {
        let answersRow = [];
        task.answers.forEach(() => answersRow.push(false));
        this.answers.push(answersRow);
      });
    },
    checkErrorUnderline(task, i) {
      let error = false;
      task.answers.forEach((ans, j) => {
        if (ans.correct == undefined) ans.correct = false;
        if (
          ans.correct != this.answers[i][j] &&
          this.answers[i][j] != undefined
        ) {
          error = true;
        }
      });
      return error;
    },
    checkError(task, i) {
      if (this.underline) {
        return this.checkErrorUnderline(task, i);
      } else {
        let error = false;
        task.answers.forEach((ans, j) => {
          if (ans != this.answers[i][j]) {
            error = true;
          }
        });
        return error;
      }
    },
    async getLesson() {
      let r = await api.methods.getFullLesson(this.$route.params.id);
      return {
        type: r.lesson[this.activeGroupIndexLesson].tasks[0].type,
        section: r.lesson[this.activeGroupIndexLesson].tasks[0].section,
        id: r.id
      };
    },
    check() {
      this.error = false;
      let answers = this.answers;
      this.getLesson().then(res => {
        const data = {
          type: "dz",
          type_check: res.type,
          section: res.section,
          answer: answers
        };
        let result = api.methods.taskCheck(res.id, data); // mock
        result.then(res => {
          this.inputCopy.body.forEach((_, i) => {
            // Vue не умеет изменять значение массивов на прямую
            // Нужно изменять так как это указано ниже
            // https://ru.vuejs.org/v2/guide/reactivity.html
            this.$set(this.results, i, res[i]);
          });
        });
      });
    },
    showAnswers() {
      this.inputCopy.body.forEach((task, i) => {
        task.answers.forEach((answer, j) => {
          // Если underline, то берем свойство
          if (this.underline) this.$set(this.answers[i], j, answer.correct);
          else this.$set(this.answers[i], j, answer);
        });
      });
    },
    statusClass(i) {
      return {
        "table-item--correct": this.results[i] == true,
        "table-item--uncorrect": this.results[i] == false
      };
    },
    checkboxColor(i) {
      if (this.results[i] != undefined) {
        return "white";
      }
    }
  },
  computed: {
    ...mapGetters(["socket", "activeGroupIndexLesson"])
  },
  components: {
    Description
  },
  props: ["input", "underline", "index"],
  beforeMount() {
    this.setInputCopy();
    this.setAnswersArr();
  }
};
</script>

<style lang="sass">
@import "@/assets/styles/variables.sass"

.table-item
  position: relative
.selection-box
  &__box--active--underline
    background: $main_color !important
    color: $main_color--text !important
    padding: 10px
.selection-box__checkbox .v-input--selection-controls__input
  margin: 0 auto !important
</style>
