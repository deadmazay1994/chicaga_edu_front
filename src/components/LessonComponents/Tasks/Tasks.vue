<template>
  <div class="tasks vue-component">
    <task-manager
      class="tasks__wrap"
      :input="clearTasks"
      :saved="savedTasks"
      ref="taskManager"
    />
    <div class="ma-5">
      <v-btn
        @click="check"
        class="tasks__check-btn"
        block
        large
        color="white--text"
        >Проверить</v-btn
      >
    </div>
  </div>
</template>

<script>
import TaskManager from "./TaskManager";

import { mapGetters, mapActions } from "vuex";

import Api from "@/mixins/api";

export default {
  name: "tasks",
  data() {
    return {
      ...mapActions(["setSavedTasks", "setClearTasks"])
    };
  },
  methods: {
    check() {
      this.$refs.taskManager.check();
      this.$emit("saveTasks");
    }
  },
  computed: {
    ...mapGetters(["clearTasks", "savedTasks"])
  },
  components: {
    TaskManager
  },
  mixins: [Api],
  async beforeMount() {
    this.setSavedTasks();
    // Если прогресс пустой
    if (!this.savedTasks.length) {
      this.setClearTasks(this.$route.params.id);
    }
  }
};
</script>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"

.tasks
  max-height: 100%
  overflow: auto
  &__wrap
    // background: #e6e3dd
    padding: 15px 30px
  &__task
    margin-bottom: 30px
    // &::after
    //   margin-top: 10px
    //   display: block
    //   content: ""
    //   width: 111%
    //   background: $main_color
    //   height: 2px
    //   margin-left: -5.5%
  &__check-btn
    background-color: $main_color !important
</style>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"

.table-item
  padding: 10px
  background: #dedede
  margin-top: 2px
  cursor: pointer
  &--correct
    background: $success_color
    color: $success_color--text
  &--uncorrect
    background: $error_color
    color: $error_color--text
.table-title
  background: $main_color
  color: $main_color--text
  padding: 10px
</style>
