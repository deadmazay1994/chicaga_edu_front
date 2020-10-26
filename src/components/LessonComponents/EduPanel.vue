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
      <v-tab>Чат</v-tab>
      <v-tab>Материалы урока</v-tab>
      <v-tab>Домашнее задание</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item class="edu-panel__tasks">
        <teacher-panel v-if="user.role == 'teacher'" />
        <tasks class="edu-panel__tasks-component" />
      </v-tab-item>
      <v-tab-item>
        <text-chat />
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
          class="edu-panel__tasks-component mt-7"
          :isHomework="true"
          :noAddAtempt="true"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import TextChat from "@/components/LessonComponents/Chat/Chat";
import { mapGetters } from "vuex";
import Tasks from "@/components/LessonComponents/Tasks/Tasks";
import TeacherPanel from "@/components/LessonComponents/TeacherPanel";
import Attachs from "@/components/LessonComponents/Tasks/Attachs";

export default {
  name: "edu-panel",
  data: function() {
    return {
      tab: null
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
    TextChat,
    Tasks,
    TeacherPanel,
    Attachs
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style lang="sass" scoped>
@import "@/components/Sass/Varibles.sass"

.edu-panel
  overflow: auto
  display: flex
  flex-direction: column
  &__tasks
    padding-bottom: 15px
    min-height: 100%
    position: absolute
    width: 100%
  &__tasks-component
    height: 100%
    position: absolute
    width: 100%
    display: flex
    flex-direction: column
    justify-content: space-between
    padding-top: 20px
  & .v-tabs-items
    flex: 1
</style>

<style>
/* scoped мешает прменить стиль */
.edu-panel .v-window__container {
  min-height: 100% !important;
}
</style>
