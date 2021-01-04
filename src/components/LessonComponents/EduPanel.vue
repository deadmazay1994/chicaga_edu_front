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
    <v-tabs-items v-model="tab" ref="tabsItem">
      <v-tab-item class="edu-panel__tasks">
        <tasks class="edu-panel__tasks-component" />
      </v-tab-item>
      <v-tab-item>
        <paint
          v-if="paintWidth"
          :width="paintWidth"
          :height="paintHeight"
          class="tasks__paint"
          ref="paint"
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

import Paint from "Tasks/Paint/index";

export default {
  name: "edu-panel",
  data: function() {
    return {
      tab: null,
      paintWidth: false,
      paintHeight: false
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["user", "materials"]),
    taskTabTitle() {
      if (this.user.role == "teacher") {
        return "Задания и ученики";
      } else {
        return "ЗАДАНИЯ";
      }
    }
  },
  components: {
    Tasks,
    Attachs,
    Paint
  },
  props: [],
  mixins: {},
  beforeMount() {},
  mounted() {
    this.paintWidth = this.$refs.tabsItem.$el.offsetWidth;
    this.paintHeight = this.$refs.tabsItem.$el.offsetHeight;
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
</style>

<style>
/* scoped мешает прменить стиль */
.edu-panel .v-window__container {
  min-height: 100% !important;
}
</style>
