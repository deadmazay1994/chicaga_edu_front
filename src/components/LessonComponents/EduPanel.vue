<template>
  <div class="edu-panel vue-component">
    <div class="edu-panel__inner">
      <tabs-component>
        <tab-component name="Задания" :selected="true">
          <tasks
            :tasks="lessonTasks"
            :unique_id="$route.params.id"
          />
        </tab-component>
        <tab-component name="Онлайн доска"
          ><lesson-plot>Coming soon</lesson-plot></tab-component
        >
        <tab-component name="Материалы урока"
          ><lesson-plot
            >There are no additional materials for this lesson</lesson-plot
          ></tab-component
        >
        <tab-component name="Домашняя работа"
          ><lesson-plot
            >There is no homework for this lesson</lesson-plot
          ></tab-component
        >
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
      lessonTasks: undefined
    };
  },
  methods: {
    ...mapActions(["setUserPoints"]),
    async getLesson() {
      let r = await api.methods.getFullLesson(this.$route.params.id);
      return r;
    },
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
    async setLessonTasks() {
      let response = await api.methods.getLesson(this.$route.params.id);
      this.lessonTasks = response.lesson;
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
    this.getLesson().then(res => {
      this.timeData = res.time;
    });
    this.setLessonTasks();
  }
};
</script>

<style lang="sass" scoped>
.edu-panel
  &__inner
    width: 100%
    height: 100%
</style>
