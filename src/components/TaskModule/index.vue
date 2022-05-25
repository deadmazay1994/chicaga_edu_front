<template>
  <div class="task-module vue-component">
    <div class="tasks-module__header">
      <navigation-button
        v-for="(group, index) in tasks"
        :key="index"
        :class="{ 'task-navigation-button--active': activeGroup === index }"
        @moveToGroup="moveToGroup(index)"
        >{{ index }}</navigation-button
      >
    </div>
    <template v-for="(task, index) in tasks">
      <task-group
        :key="index"
        v-if="index === activeGroup"
        :tasks="task.tasks"
        :unique_id="unique_id"
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
      activeGroup: 0
    };
  },
  methods: {
    moveToGroup(index) {
      this.activeGroup = index;
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
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.tasks-module
  &__header
    display: flex
    flex-wrap: wrap
    gap: 16px
</style>
