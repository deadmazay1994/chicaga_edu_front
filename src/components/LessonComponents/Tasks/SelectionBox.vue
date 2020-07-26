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
      <tr>
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
          :class="statusClass(i)"
          v-for="(ans, j) in task.answers"
          :key="j + 'a'"
        >
          <v-checkbox
            v-model="answers[i][j]"
            class="pa-0 selection-box__checkbox"
            :color="checkboxColor(i)"
          ></v-checkbox>
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
    setAnswersArr() {
      this.input.body.tasks.forEach(task => {
        let answersRow = [];
        task.answers.forEach(() => answersRow.push(false));
        this.answers.push(answersRow);
      });
    },
    check() {
      this.input.body.tasks.forEach((task, i) => {
        let error = false;
        task.answers.forEach((ans, j) => {
          if (ans != this.answers[i][j]) {
            error = true;
          }
        });
        if (error) {
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
  props: ["input"],
  mixins: {},
  beforeMount() {
    this.setAnswersArr();
  }
};
</script>

<style lang="sass">

.selection-box__checkbox .v-input--selection-controls__input
  margin: 0 auto !important
</style>
