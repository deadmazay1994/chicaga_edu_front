<template>
  <div class="tasks vue-component">
    <div class="relative" style="height: 100%">
      <task-manager
        class="tasks__wrap"
        v-if="loaded"
        :input="tasks"
        :saved="savedTasks"
        :savedHomework="savedHomework"
        :type="isHomework ? 'homework' : 'lesson'"
        ref="taskManager"
      />
      <v-skeleton-loader
        v-else
        class="pa-7"
        type="heading, article, image, article@2, image"
      />
    </div>
    <portal to="manager__bottom">
      <div v-if="showCheckBtn" class="tasks__fixed mb-2">
        <div class="d-flex justify-center is-red-btns">
          <button
            v-if="
              (this.attemptNum == 0 || !this.noAddAtempt) &&
              user.role != 'teacher'
            "
            @click="check"
            class="red-btn"
            large
          >
            ПРОВЕРИТЬ
          </button>
          <button
            v-if="isHomework || user.role == 'teacher'"
            @click="showAnswers"
            class="red-btn"
            large
          >
            ПОКАЗАТЬ ОТВЕТЫ
          </button>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
import TaskManager from "Tasks/Manager/";

import { mapGetters, mapActions } from "vuex";

import Api from "@/mixins/api";

export default {
  name: "tasks",
  data() {
    return {
      attemptNum: 0,
      loaded: false,
    };
  },
  methods: {
    ...mapActions([
      "setSavedTasks",
      "setClearTasks",
      "saveProgressLesson",
      "saveProgressHomework",
      "setProgressForTeacher",
    ]),
    check() {
      // Проверяем можно ли проходить тест еще раз
      if (this.attemptNum == 0 || !this.noAddAtempt) {
        this.$emit("check");
        this.$emit("saveTasks");
        this.attemptNum++;
        if (this.isHomework) {
          this.saveProgressHomework({
            lessonId: this.$route.params.id,
            courseId: this.$route.params.courseId,
          });
        } else {
          this.saveProgressLesson({
            lessonId: this.$route.params.id,
            courseId: this.$route.params.courseId,
          });
        }
      }
    },
    async setProgressTeacher() {
      if (this.user.role == "teacher" && "userid" in this.$route.params) {
        await this.setProgressForTeacher({
          courseId: this.$route.params.courseId,
          lessonId: this.$route.params.id,
          userId: this.$route.params.userid,
        });
        return true;
      } else {
        return false;
      }
    },
    showAnswers() {
      this.$refs.taskManager.showAnswers();
    },
  },
  computed: {
    ...mapGetters([
      "savedTasks",
      "lessonTasks",
      "homework",
      "savedHomework",
      "user",
      "activeGroupIndexHomework",
      "activeGroupIndexLesson",
      "groupsHomework",
      "groupsLesson",
    ]),
    tasks() {
      // Устанавливаем дз это или нет
      if (this.isHomework) {
        return this.homework;
      } else {
        return this.lessonTasks;
      }
    },
    showCheckBtn() {
      let res = false;
      if (
        (this.isHomework &&
          this.groupsHomework.length - 1 == this.activeGroupIndexHomework) ||
        (!this.isHomework &&
          this.groupsLesson.length - 1 == this.activeGroupIndexLesson) ||
        document.location.href.includes("consultation")
      ) {
        res = true;
      }
      return res;
    },
  },
  components: {
    TaskManager,
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
          courseId: this.$route.params.courseId,
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
  },
};
</script>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"

.tasks
  max-height: 100%
  &__wrap
    z-index: 1
    opacity: 0.99
    position: relative
    display: flex
    flex-direction: column
    justify-content: space-between
  &__fixed
    margin: 0
  &__task
    margin-bottom: 30px
  &__check-btn
    background-color: $main_color !important
    margin: 0 10px
</style>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"
.tasks
  position: relative
  &__wrap
    // margin-top: 30px
    height: 100%
  &__paint
    position: absolute
    width: 100%
    height: 100%
    z-index: 10
    top: 0
    left: 0
    // pointer-events: none
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
