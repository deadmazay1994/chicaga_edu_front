<template>
  <div class="task-module vue-component">
    <div class="task-module__header">
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
      <template>
        <keep-alive :key="index">
          <task-group
            class="task-module__body"
            :key="index"
            v-if="index === activeGroup"
            :taskIndex="index"
            :tasks="task.tasks"
            :unique_id="unique_id"
            @setTaskNumberState="setTaskNumberState"
          />
        </keep-alive>
      </template>
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
    setTaskNumberState(index, bool) {
      this.navigationList[index].success = bool;
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
.task-module
  display: flex
  flex-direction: column
  height: 100%
  &__header
    position: relative
    display: flex
    flex-wrap: wrap
    gap: 16px
    padding: 16px 8px
  &__header::after
    content: ""
    position: absolute
    right: 8px
    bottom: 0
    left: 8px
    height: 2px
    background-color: #E6E6E6
  &__body
    flex-grow: 1
    padding: 16px 8px
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
