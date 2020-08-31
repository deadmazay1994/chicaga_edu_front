<template>
  <div class="selection-box vue-component">
    <description>{{ inputCopy.description }}</description>
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

import Methods from "@/mixins/tasks";
import { mapGetters, mapMutations } from "vuex";

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
        if (ans.correct == undefined) {
          ans.correct = false;
        }
        if (ans.correct != this.answers[i][j]) {
          error = true;
        }
        // this.answers[i][j] = false;
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
    check() {
      this.error = false;
      this.inputCopy.body.forEach((task, i) => {
        if (this.checkError(task, i)) {
          this.$set(this.results, i, false);
          this.error = true;
        } else {
          this.$set(this.results, i, true);
        }
      });
      console.log(this.error);
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
    ...mapGetters(["socket"])
  },
  components: {
    Description
  },
  props: ["input", "underline", "index"],
  mixins: [Methods],
  beforeMount() {
    this.setInputCopy();
    this.setAnswersArr();
    console.log(this.input);
  }
};
</script>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"

.selection-box
  &__box--active--underline
    background: $main_color !important
    color: $main_color--text !important
    padding: 10px
.selection-box__checkbox .v-input--selection-controls__input
  margin: 0 auto !important
</style>
