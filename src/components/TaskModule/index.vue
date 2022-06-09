<template>
  <div class="task-module vue-component">
    <div class="tasks-module__header">
      <navigation-button
        v-for="(group, index) in navigationList"
        :key="index"
        :class="[
          { 'task-navigation-button--active': activeGroup === index },
          { 'task-navigation-button--success': group.success },
          { 'task-navigation-button--error': group.success === false }
        ]"
        @moveToGroup="moveToGroup(index)"
        >{{ group.number }}</navigation-button
      >
    </div>
    <template v-for="(task, index) in tasks">
      <task-group
        :key="index"
        v-if="index === activeGroup"
        :taskIndex="index"
        :tasks="task.tasks"
        :unique_id="unique_id"
        @setTaskNumberState="setTaskNumberState"
      />
    </template>
  </div>
</template>

<script>
import NavigationButton from "./NavigationButton";
import TaskGroup from "./TaskGroup";

export default {
  name: "task-module",
  data: function() {
    return {
      activeGroup: 0,
      navigationList: undefined
    };
  },
  methods: {
    moveToGroup(index) {
      this.activeGroup = index;
    },
    setNavigationList() {
      this.navigationList = this.tasks.map((task, index) => ({
        task: task,
        success: undefined,
        number: index + 1
      }));
    },
    setTaskNumberState(index) {
      this.navigationList[index].success = true;
    }
  },
  computed: {},
  components: {
    NavigationButton,
    TaskGroup
  },
  props: {
    tasks: {
      required: true,
      type: Array
    },
    unique_id: String
  },
  mixins: {},
  mounted() {
    this.setNavigationList();
  }
};
</script>

<style scoped="scoped" lang="sass">
.tasks-module
  &__header
    display: flex
    flex-wrap: wrap
    gap: 16px
</style>
