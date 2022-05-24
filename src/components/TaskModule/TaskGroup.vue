<template>
  <div class="task-group">
    <template v-for="(task, index) in tasks">
      <template>
        <div class="task-group__title" :key="index + 'i'">
          {{ task.description }}
        </div>
        <component
          :key="index + 'j'"
          :is="returnComponent(task.type)"
          :taskObject="task"
          ref="taskComponent"
        ></component>
        <button class="check-btn" @click="checkTask(index)" :key="index + 'k'">
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

import manager from "./manager";

export default {
  name: "TaskGroup",
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["setPointByType"]),
    returnComponent(type) {
      return manager(type);
    },
    checkTask(index) {
      let response = this.$refs.taskComponent[index].check();
      this.setPointByType(response);
    }
  },
  computed: {},
  components: {
    ChipSkipped,
    TaskImages,
    FillGaps,
    SelectionBox
  },
  props: {
    tasks: Array,
    index: Number,
    activeGroup: Number
  },
  mixins: {},
  beforeMount() {}
};
</script>
<style lang="sass" scoped>
.task-group
  margin-top: 16px
  border-top: 2px solid #E6E6E6
  padding-top: 22px

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
