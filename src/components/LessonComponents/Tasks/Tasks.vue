<template>
  <div class="tasks vue-component">
    <template v-for="(task, index) in tasks">
      <task-images
        v-if="task.type == 'images_orders'"
        :task="task"
        :key="index"
        ref="task"
        class="tasks__task"
      />
      <fill-gaps
        v-if="task.type == 'insert_slipped_word'"
        :task="task"
        :key="index"
        ref="task"
        class="tasks__task"
      />
    </template>
    <v-btn @click="check" color="primary">Проверить</v-btn>
  </div>
</template>

<script>
import TaskImages from "./TaskImages";
import FillGaps from "./FillGaps";

export default {
  name: "tasks",
  data() {
    return {
      tasks: [
        {
          type: "images_orders"
        },
        {
          body: [
            {
              sentence: "<A> What [is] your [name]"
            },
            {
              sentence: "<A> What [is] your [name]"
            },
            {
              sentence: "<A> What [is] your name"
            }
          ],
          description: "Fill gaps",
          type: "insert_slipped_word"
        }
      ]
    };
  },
  methods: {
    check() {
      console.log(this.$refs.task);
      this.$refs.task.forEach(task => task.check());
    }
  },
  components: {
    TaskImages,
    FillGaps
  }
};
</script>

<style scoped lang="sass">
@import "@/components/Sass/Varibles.sass"

.tasks
  padding: 5%
  max-height: 100%
  overflow: auto
  &__task
    margin-bottom: 10px
    &::after
      margin-top: 10px
      display: block
      content: ""
      width: 111%
      background: $main_color
      height: 2px
      margin-left: -5.5%
</style>
