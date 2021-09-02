<!-- Интерфейс для выбора группы упражнений -->
<template>
  <div class="task__date active">
    <button
      class="date__item"
      :class="activeGroupName === index + 1 ? 'active' : ''"
      v-for="(item, index) in groupsNames"
      v-bind:key="index"
      @click="moveGroup(index)"
    >
      {{ index + 1 }}
    </button>
  </div>
  <!--  <div class="choose-group vue-component" v-click-outside="hide">-->
  <!--    <v-icon-->
  <!--      size="40"-->
  <!--      class="choose-group__nav choose-group__nav&#45;&#45;left"-->
  <!--      @click="prev"-->
  <!--      v-show="prevActive"-->
  <!--      >mdi-arrow-down</v-icon-->
  <!--    >-->
  <!--    <div class="choose-group__name text-h4 text-center main-color-text">-->
  <!--      {{ activeGroupName }}-->
  <!--    </div>-->
  <!--    <v-icon-->
  <!--      size="40"-->
  <!--      class="choose-group__nav choose-group__nav&#45;&#45;right"-->
  <!--      @click="next"-->
  <!--      v-show="nextActive"-->
  <!--      >mdi-arrow-down</v-icon-->
  <!--    >-->
  <!--  </div>-->
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "choose-group",
  data: function() {
    return {
      show: false
    };
  },
  methods: {
    ...mapMutations([
      "collectGroupsNamesLesson",
      "collectGroupsNamesHomework",
      "setActiveGroupLesson",
      "setActiveGroupHomework"
    ]),
    toggleShow() {
      this.show = !this.show;
    },
    hide() {
      this.show = false;
    },
    prev() {
      this.moveGroup(-1);
    },
    next() {
      this.moveGroup(1);
    },
    moveGroup(step) {
      this.ctxNav(
        step,
        () => this.setActiveGroupLesson(step),
        () => this.setActiveGroupHomework(step)
      );
    },
    ctxNav(step, lesson, homework) {
      this.ctx(
        () => {
          if (
            0 <= this.activeGroupIndexLesson &&
            this.activeGroupIndexLesson < this.groupsLesson.length
          ) {
            lesson();
          }
        },
        () => {
          if (
            0 <= this.activeGroupIndexHomework &&
            this.activeGroupIndexHomework < this.groupsHomework.length
          ) {
            homework();
          }
        }
      );
    },
    collectGropNames() {
      this.ctx(this.collectGroupsNamesLesson, this.collectGroupsNamesHomework);
    },
    ctx(lessonCallback, homeworkCallback) {
      if (this.lessonType == "lesson") {
        lessonCallback();
      } else if (this.lessonType == "homework") {
        homeworkCallback();
      }
    }
  },
  computed: {
    ...mapGetters([
      "groupsLesson",
      "groupsHomework",
      "activeGroupIndexLesson",
      "activeGroupIndexHomework"
    ]),
    groupsNames() {
      let res = [];
      if (this.lessonType == "lesson") {
        res = this.groupsLesson;
      } else if (this.lessonType == "homework") {
        res = this.groupsHomework;
      }
      return res;
    },
    activeGroupName() {
      let res = "";
      this.ctx(
        () =>
          (res =
            this.groupsLesson[this.activeGroupIndexLesson] ||
            this.activeGroupIndexLesson + 1),
        () =>
          (res =
            this.groupsHomework[this.activeGroupIndexHomework] ||
            this.activeGroupIndexHomework + 1)
      );
      return res;
    },
    nextActive() {
      let res = false;
      this.ctxNav(
        1,
        () => (res = true),
        () => (res = true)
      );
      return res;
    },
    prevActive() {
      let res = false;
      this.ctxNav(
        -1,
        () => (res = true),
        () => (res = true)
      );
      return res;
    }
  },
  components: {},
  props: ["lessonType"],
  mixins: {},
  created() {
    this.collectGropNames();
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.choose-group
  position: relative
  width: 100%

  &__nav
    position: absolute
    cursor: pointer
    color: $main_color

    &--left
      left: 0
      top: 10px
      transform: rotate(90deg)

    &--right
      right: 0
      top: 10px
      transform: rotate(-90deg)
</style>
