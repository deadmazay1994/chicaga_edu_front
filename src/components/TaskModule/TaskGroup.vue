<template>
  <div class="task-group">
    <template v-for="(task, index) in tasks">
      <template>
        <div
          class="task-group__title"
          :key="index + 'i'"
          v-if="task.type != 'lesson_addons_files'"
          v-html="task.description"
        ></div>
        <component
          :key="index + 'j'"
          :is="returnComponent(task.type)"
          :taskObject="task"
          :unique_id="unique_id"
          ref="taskComponent"
          class="task-group__task"
        ></component>
        <div class="task-group__button-wrapper" :key="index + 'k'">
          <button
            class="task-group__check-btn"
            @click="checkTask(index)"
            v-if="
              !addonsTypeList.includes(task.type) &&
                returnComponent(task.type) != 'task-results'
            "
          >
            Проверить
          </button>
          <router-link
            tag="button"
            :to="{ name: 'tariffes' }"
            :key="index + 'l'"
            v-else
            class="task-group__complete-btn"
          >
            ЗАВЕРШИТЬ УРОК
          </router-link>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import ChipSkipped from "./Tasks/ChipSkipped";
import TaskImages from "./Tasks/TaskImages";
import FillGaps from "./Tasks/FillGaps";
import SelectionBox from "./Tasks/SelectionBox";
import TF from "./Tasks/TF";
import Grouping from "./Tasks/Grouping";
import Comparison from "./Tasks/Comparison.vue";
import Syllable from "./Tasks/Syllable";
import Attachs from "./Tasks/Attachs";
import ChooseOne from "./Tasks/ChooseOne";
import TaskResults from "./TaskResults.vue";

import manager from "./manager";

export default {
  name: "TaskGroup",
  data: function() {
    return {
      addonsTypeList: ["lesson_addons_files"],
      taskChecked: [],
      checkRatio: 0.8
    };
  },
  methods: {
    ...mapMutations(["setPointByType"]),
    returnComponent(type) {
      return manager(type);
    },
    async checkTask(index) {
      let response = await this.$refs.taskComponent[index].check();
      let arr = [];

      response.answer.map(item => {
        if (typeof item === "boolean") {
          arr.push(item);
        } else if (typeof item === "object") {
          if ("correct" in item) {
            arr.push(item.correct);
          } else if ("answers" in item) {
            return item.answers.map(bool => arr.push(bool));
          } else if (Array.isArray(item)) {
            item.map(bool => arr.push(bool));
          }
        }
      });
      this.taskChecked.push(arr);
      this.setPointByType(response);
    }
  },
  computed: {},
  components: {
    ChipSkipped,
    TaskImages,
    FillGaps,
    SelectionBox,
    TF,
    Grouping,
    Comparison,
    Attachs,
    ChooseOne,
    Syllable,
    TaskResults
  },
  props: {
    tasks: Array,
    index: Number,
    activeGroup: Number,
    unique_id: String,
    taskIndex: Number
  },
  mixins: {},
  watch: {
    taskChecked() {
      if (this.taskChecked.length != this.tasks.length) return;

      let boolFlag = undefined;
      let booleansArray = [];

      this.taskChecked.map(asnwers =>
        asnwers.map(answer => booleansArray.push(answer))
      );

      let trueAnswersInOneQuestionCount = booleansArray.filter(
        item => item === true
      ).length;

      boolFlag =
        trueAnswersInOneQuestionCount / booleansArray.length > this.checkRatio
          ? true
          : false;

      this.$emit("setTaskNumberState", this.taskIndex, boolFlag);
    }
  },
  beforeMount() {},
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"

.task-group
  font-weight: 400
  font-size: 18px
  line-height: 1.5
  @media ($media_lg2)
    font-size: inherit
  &__task
    margin-bottom: 10px
  &__title
    font-weight: 300
    margin-bottom: 10px

  &__button-wrapper
    display: flex
    align-items: center
    justify-content: center
    padding-top: 40px

  &__check-btn
    display: block
    width: 137px
    height: 32px
    border-radius: 16px
    color: #FFFFFF
    background: linear-gradient(360deg, #FF0000 -20.31%, #FFA3A3 120.31%)

  &__complete-btn
    background: linear-gradient(180deg, #FF6440 0%, #CC2D23 100%), linear-gradient(360deg, #FF0000 -20.31%, #FFA3A3 120.31%)
    padding: 12px 32px
    border-radius: 16px
    font-weight: 700
    color: #FFFFFF
</style>
