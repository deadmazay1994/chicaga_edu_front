<template>
  <div class="tasks vue-component">
    <div class="relative">
      <task-manager
        class="tasks__wrap"
        :input="tasks"
        :saved="savedTasks"
        :savedHomework="savedHomework"
        :type="isHomework ? 'homework' : 'lesson'"
        ref="taskManager"
      />
      <paint v-if="loaded" class="tasks__paint" />
    </div>
    <div v-if="user.role != 'teacher'" class="tasks__fixed ma-5">
      <div class="d-flex justify-center">
        <v-btn
          v-if="this.attemptNum == 0 || !this.noAddAtempt"
          @click="check"
          class="tasks__check-btn"
          large
          color="white--text"
          >ПОДТВЕРДИТЬ</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import TaskManager from "Tasks/Manager/";
import Paint from "./Paint";

import { mapGetters, mapActions } from "vuex";

import Api from "@/mixins/api";

export default {
  name: "tasks",
  data() {
    return {
      attemptNum: 0,
      loaded: false
    };
  },
  methods: {
    ...mapActions([
      "setSavedTasks",
      "setClearTasks",
      "saveProgressLesson",
      "saveProgressHomework",
      "setProgressForTeacher"
    ]),
    check() {
      if (this.attemptNum == 0 || !this.noAddAtempt) {
        this.$refs.taskManager.check();
        this.$emit("saveTasks");
        this.attemptNum++;
        if (this.isHomework) {
          this.saveProgressHomework({
            lessonId: this.$route.params.id,
            courseId: this.$route.params.courseId
          });
        } else {
          this.saveProgressLesson({
            lessonId: this.$route.params.id,
            courseId: this.$route.params.courseId
          });
        }
      }
    },
    async setProgressTeacher() {
      if (this.user.role == "teacher" && "userid" in this.$route.params) {
        await this.setProgressForTeacher({
          courseId: this.$route.params.courseId,
          lessonId: this.$route.params.id,
          userId: this.$route.params.userid
        });
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapGetters([
      "savedTasks",
      "lessonTasks",
      "homework",
      "savedHomework",
      "user"
    ]),
    tasks() {
      // Устанавливаем дз это или нет
      if (this.isHomework) {
        console.log(this.homework);
        return this.homework;
      } else {
        return this.lessonTasks;
      }
    }
  },
  components: {
    TaskManager,
    Paint
  },
  props: ["isHomework", "noAddAtempt"],
  mixins: [Api],
  async beforeMount() {
    // Если это учитель, то мы устанавливаем прогресс для него
    let tasksForTeacher = await this.setProgressTeacher();
    // Если нет, то получаем прогресс ученика
    if (!tasksForTeacher) {
      // Получаем прогресс
      try {
        await this.setSavedTasks({
          lessonId: this.$route.params.id,
          courseId: this.$route.params.courseId
        });
        // Если прогресс пустой получаем сам урок
        if (!this.savedTasks.length || !this.savedHomework) {
          await this.$store.dispatch("setLesson", this.$route.params.id);
        }
      } catch (e) {
        e;
      }
    }
    this.loaded = true;
  }
};
</script>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"

.tasks
  max-height: 100%
  overflow: auto
  &__wrap
    z-index: 1
    opacity: 0.99
    position: relative
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
