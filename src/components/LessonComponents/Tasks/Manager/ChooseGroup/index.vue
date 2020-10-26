<!-- Интерфейс для выбора группы упражнений -->
<template>
  <div class="choose-group vue-component" v-click-outside="hide">
    <v-icon
      size="40"
      class="choose-group__nav choose-group__nav--left"
      @click="prev"
      v-show="prevActive"
      >mdi-arrow-down</v-icon
    >
    <div class="choose-group__name text-h4 text-center main-color-text">
      {{ activeGroupName }}
    </div>
    <v-icon
      size="40"
      class="choose-group__nav choose-group__nav--right"
      @click="next"
      v-show="nextActive"
      >mdi-arrow-down</v-icon
    >
  </div>
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
        () => this.setActiveGroupLesson(this.activeGroupIndexLesson + step),
        () => this.setActiveGroupLesson(this.activeGroupIndexHomework + step)
      );
    },
    ctxNav(step, lesson, homework) {
      this.ctx(
        () => {
          if (
            0 <= this.activeGroupIndexLesson + step &&
            this.activeGroupIndexLesson + step < this.groupsLesson.length
          ) {
            lesson();
          }
        },
        () => {
          if (
            0 <= this.activeGroupIndexHomework + step &&
            this.activeGroupIndexHomework + step < this.groupsHomework.length
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
      left: 15px
      top: 0
      transform: rotate(90deg)
    &--right
      right: 15px
      top: 0
      transform: rotate(-90deg)
</style>
