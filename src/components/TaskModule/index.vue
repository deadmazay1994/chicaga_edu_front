<template>
  <div class="task-module vue-component">
    <div class="task-module__header">
      <navigation-button
        v-for="(group, index) in tasks"
        :key="index"
        :class="{ 'task-navigation-button--active': activeGroup === index }"
        @moveToGroup="moveToGroup(index)"
        >{{ index + 1 }}</navigation-button
      >
    </div>
    <template v-for="(task, index) in tasks">
      <task-group
        class="task-module__body"
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
.task-module
  display: flex
  flex-direction: column
  height: 100%
  &__header
    display: flex
    flex-wrap: wrap
    gap: 16px
    padding-bottom: 22px
    border-bottom: 2px solid #E6E6E6
  &__body
    flex-grow: 1
    margin-bottom: -16px
    padding-top: 16px
    padding-bottom: 16px
    overflow-y: auto
  &__body::-webkit-scrollbar
    width: 16px
  &__body::-webkit-scrollbar-track
    margin-top: 10px
    margin-bottom: 10px
  &__body::-webkit-scrollbar-thumb
    border: 6px solid transparent
    background-clip: padding-box
</style>
