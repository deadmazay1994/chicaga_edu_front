<template>
  <div class="task-group">
    <template v-for="(task, index) in tasks">
      {{ tasksLength }}
      <template>
        <div
          class="task-group__title"
          :key="index + 'i'"
          v-if="task.type != 'lesson_addons_files'"
        >
          {{ task.description }}
        </div>
        <component
          :key="index + 'j'"
          :is="returnComponent(task.type)"
          :taskObject="task"
          :unique_id="unique_id"
          ref="taskComponent"
          class="task-group__task"
        ></component>
        <button
          class="check-btn"
          @click="checkTask(index)"
          :key="index + 'k'"
          v-if="!addonsTypeList.includes(task.type)"
        >
          Проверить
        </button>
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

import manager from "./manager";

export default {
  name: "TaskGroup",
  data: function() {
    return {
      addonsTypeList: ["lesson_addons_files"],
      taskChecked: []
    };
  },
  methods: {
    ...mapMutations(["setPointByType"]),
    returnComponent(type) {
      return manager(type);
    },
    async checkTask(index) {
      let response = await this.$refs.taskComponent[index].check();
      console.log("response", response.answer); // Индекс задания -> answer array
      console.log("tasks", this.tasks, this.tasks.length);
      // response.answer.map(item => item.answers.map(bool => console.log("test_01", bool)))
      this.taskChecked.push(
        response.answer.map(item => item.answers.map(bool => bool))
      );
      // response.answers.map(answer)
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
    Syllable
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
      // Нужно вычислить кол-во заданий
      // Нужно вычислить кол-во вопросов в задании
      if (this.taskChecked.length != this.tasks.length) return;
      console.log("test_01", this.taskChecked);
      let booleansArray = [];
      this.taskChecked.map(asnwers =>
        asnwers.map(answer => booleansArray.push(answer))
      );
      console.log("__>", booleansArray);
      this.$emit("setTaskNumberState", this.taskIndex);
      // Отправить данные о выполненом задании
    }
  },
  beforeMount() {},
  mounted() {}
};
</script>
<style lang="sass" scoped>
.task-group
  margin-top: 16px
  border-top: 2px solid #E6E6E6
  padding-top: 22px
  &__task
    margin-bottom: 10px
.task-group__title
  font-weight: 300
  margin-bottom: 10px

.check-btn
  display: block
  width: 137px
  height: 32px
  border-radius: 16px
  color: #FFFFFF
  background: linear-gradient(360deg, #FF0000 -20.31%, #FFA3A3 120.31%)
  margin: 0 auto
  margin-top: 40px
</style>
