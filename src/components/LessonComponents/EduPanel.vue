<template>
  <div class="edu-panel vue-component">
    <v-tabs
      color="orange accent-2"
      dark
      v-model="tab"
      fixed-tabs
      style="flex: 0"
    >
      <v-tab>{{ taskTabTitle }}</v-tab>
      <v-tab>White board</v-tab>
      <v-tab>Материалы урока</v-tab>
      <v-tab>Домашнее задание</v-tab>
    </v-tabs>
    <v-tabs-items style="position: relative" v-model="tab" ref="tabsItem">
      <v-tab-item class="edu-panel__tasks">
        <tasks class="edu-panel__tasks-component" />
      </v-tab-item>
      <v-tab-item>
        <whiteboard
          v-if="loaded"
          class="edu-panel__whiteboard"
          server="https://edu.chicaga.ru:5000/"
          :socketProp="socket"
          :username="user.name"
          :whiteboardId="$route.params.courseId + $route.params.id"
          :width="whiteboardWidth"
          :height="whiteboardHeight"
        />
      </v-tab-item>
      <v-tab-item>
        <attachs
          v-for="(material, index) in materials"
          :key="index"
          :input="material"
          class="mx-5"
        />
      </v-tab-item>
      <v-tab-item class="edu-panel__tasks">
        <tasks
          class="edu-panel__tasks-component"
          :isHomework="true"
          :noAddAtempt="true"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tasks from "@/components/LessonComponents/Tasks/Tasks";
import Attachs from "@/components/LessonComponents/Tasks/Attachs";
import Whiteboard from "./WhiteBoard/WhiteBoard";

export default {
  name: "edu-panel",
  data: function() {
    return {
      tab: null,
      loaded: false
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["user", "materials", "socket"]),
    taskTabTitle() {
      if (this.user.role == "teacher") {
        return "Задания и ученики";
      } else {
        return "ЗАДАНИЯ";
      }
    },
    whiteboardWidth() {
      return this.$refs.tabsItem.$el.clientWidth;
    },
    whiteboardHeight() {
      return this.$refs.tabsItem.$el.clientHeight;
    }
  },
  components: {
    Tasks,
    Attachs,
    Whiteboard
  },
  props: [],
  mixins: {},
  beforeMount() {},
  mounted() {
    this.loaded = true;
  }
};
</script>

<style lang="sass" scoped>
@import "@/components/Sass/Varibles.sass"

.edu-panel
  overflow: auto
  display: flex
  flex-direction: column
  &__tasks-component
    height: calc(90vh - 63px)
    display: flex
    flex-direction: column
    justify-content: space-between
    overflow: hidden
  & .v-tabs-items
    flex: 1
  &__whiteboard
    width: 100%
    height: 100%
    position: absolute
    left: 0
    top: 0
</style>

<style>
/* scoped мешает прменить стиль */
.edu-panel .v-window__container {
  min-height: 100% !important;
}
</style>
