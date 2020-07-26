<template>
  <div class="selection-box vue-component">
    <description>{{ input.description }}</description>
    <table>
      <!-- <div>
        <div v-for="(task, i) in input.body.tasks" :key="i">{{ task.text }}</div>
      </div>
      <div>
        <div class="d-flex" v-for="(task, i) in input.body.tasks" :key="i">
          <div v-for="(ans, i) in task.answers" :key="i + 'a'">
            <v-checkbox></v-checkbox>
          </div>
        </div>
      </div>-->
      <tr v-if="!underline">
        <td class="table-title"></td>
        <td
          class="table-title"
          v-for="(state, i) in input.body.statements"
          :key="i + 'b'"
        >
          {{ state }}
        </td>
      </tr>
      <tr v-for="(task, i) in input.body.tasks" :key="i">
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
          ></v-checkbox>
          <div
            :class="{ ...activeAnswerClass(i, j), ...statusClass(i) }"
            v-if="underline"
            class="pa-3"
            @click="toggleAnswer(i, j)"
          >
            {{ ans.text }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Description from "./TasksDescription";

export default {
  name: "selection-box",
  data: function() {
    return {
      answers: [],
      results: []
    };
  },
  methods: {
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
      this.input.body.tasks.forEach(task => {
        let answersRow = [];
        task.answers.forEach(() => answersRow.push(false));
        this.answers.push(answersRow);
      });
    },
    checkErrorUnderline(task, i) {
      let error = false;
      task.answers.forEach((ans, j) => {
        if (ans.correct != this.answers[i][j]) {
          error = true;
        }
        this.answers[i][j] = false;
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
      this.input.body.tasks.forEach((task, i) => {
        if (this.checkError(task, i)) {
          this.$set(this.results, i, false);
        } else {
          this.$set(this.results, i, true);
        }
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
  computed: {},
  components: {
    Description
  },
  props: ["input", "underline"],
  mixins: {},
  beforeMount() {
    this.setAnswersArr();
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
