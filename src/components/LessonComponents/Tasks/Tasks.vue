<template>
  <div class="tasks vue-component">
    <task-images></task-images>
  </div>
</template>

<script>
import TaskImages from "./TaskImages";

export default {
  name: "tasks",
  data() {
    return {};
  },
  components: {
    TaskImages
  }
};
</script>

<style scoped lang="sass">
.tasks
  padding: 20px
  max-height: 100%
  overflow: auto
</style>
