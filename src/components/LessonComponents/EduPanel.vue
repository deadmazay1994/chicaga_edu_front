<template>
  <div class="edu-panel vue-component">
    <div class="edu-panel__inner">
      <tabs-component>
        <tab-component name="Задания" :selected="true">
          <tasks
            v-if="lesson.lesson"
            :tasks="lesson.lesson"
            :unique_id="$route.params.id"
          />
        </tab-component>
        <tab-component name="Материалы урока">
          <tasks
            v-if="lesson.lesson_materials"
            :tasks="lesson.lesson_materials"
            :unique_id="$route.params.id"
          />
          <lesson-plot v-else>
            THERE ARE NO ADDITIONAL MATERIALS FOR THIS LESSON
          </lesson-plot>
        </tab-component>
      </tabs-component>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TabsComponent from "./TabsComponent";
import TabComponent from "./TabsComponent/TabComponent.vue";
import Tasks from "@/components/TaskModule";
import LessonPlot from "@/components/LessonComponents/LessonPlot";

import api from "@/mixins/api";

export default {
  name: "edu-panel",
  data: function() {
    return {
      tab: null,
      lessonTasks: undefined,
      lesson: undefined
    };
  },
  methods: {
    ...mapActions(["setUserPoints"]),
    setUserPointsToData() {
      this.getUserPoints.forEach(item => {
        switch (item.point_type.name) {
          case "Мозги":
            this.brainData = item.points;
            break;
          case "Смайлики":
            this.smileData = item.points;
            break;
          case "Звездочка":
            this.starData = item.points;
            break;
          case "Лампочка":
            this.lampData = item.points;
            break;
        }
      });
    },
    async setLesson() {
      let r = await api.methods.getFullLesson(this.$route.params.id);
      this.lesson = r;
    }
  },
  computed: {
    ...mapGetters(["user", "getUserPoints", "points"]),
    taskTabTitle() {
      return "Задания";
    },
    brain() {
      return this.points.brain.toFixed(0);
    }
  },
  components: {
    TabsComponent,
    TabComponent,
    Tasks,
    LessonPlot
  },
  props: [],
  mixins: {},
  async mounted() {
    await this.setUserPoints();
    await this.setLesson();
    console.log(this.lesson.time);
    this.timeData = this.lesson.time;
  }
};
</script>

<style lang="sass" scoped>
.edu-panel
  &__inner
    width: 100%
    height: 100%
</style>
