<template>
  <div class="tasks vue-component">
    <template v-for="(task, index) in tasks">
      <task-images
        v-if="task.type == 'images_orders'"
        :input="task"
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
      <t-f
        v-if="task.type == 'true_false'"
        :input="task"
        :key="index"
        ref="task"
        class="tasks__task"
      />
      <match-imgs
        v-if="task.type == 'match'"
        :input="task"
        :key="index"
        ref="task"
        class="tasks__task"
      />
    </template>
    <v-btn @click="check" class="tasks__check-btn" large color="white--text"
      >Проверить</v-btn
    >
  </div>
</template>

<script>
import TaskImages from "./TaskImages";
import FillGaps from "./FillGaps";
import TF from "./TF";
import MatchImgs from "./MatchImgs";

export default {
  name: "tasks",
  data() {
    return {
      tasks: [
        {
          type: "images_orders",
          groups: [
            {
              img:
                "https://via.placeholder.com/600x500/2196f3/FFFFFF?text=(1)First+in+array",
              answer: 1
            },
            {
              img:
                "https://via.placeholder.com/600x500/82b1ff/FFFFFF?text=(2)Second+in+array",
              answer: 2
            },
            {
              img:
                "https://via.placeholder.com/600x500/4caf50/FFFFFF?text=(3)Three+in+array",
              answer: 3
            },
            {
              img:
                "https://via.placeholder.com/600x500/ff5252/FFFFFF?text=(4)Four+in+array",
              answer: 4
            }
          ]
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
          options: ["is", "my", "is", "my", "is"],
          description: "Fill gaps",
          type: "insert_slipped_word"
        },
        {
          type: "true_false"
        },
        {
          type: "match s"
        }
      ]
    };
  },
  methods: {
    check() {
      this.$refs.task.forEach(task => task.check());
    }
  },
  components: {
    TaskImages,
    FillGaps,
    TF,
    MatchImgs
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
  &__check-btn
    background-color: $main_color !important
</style>
