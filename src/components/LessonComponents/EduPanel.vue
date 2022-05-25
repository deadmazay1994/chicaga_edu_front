<template>
  <div class="edu-panel lessons__task vue-component" style="margin-left: 0">
    <teacher-panel></teacher-panel>
    <div class="task__header">
      <div class="task__header__item">
        <div class="task__header__inner">
          <animated-cool-svg ref="animatedCool" style="position: absolute;" />
          <span class="points">{{ points.smile }}</span>
        </div>

        <div class="task__header__inner">
          <animated-star-svg ref="animatedStar" />
          <span class="points">{{ points.star }}</span>
        </div>

        <div class="task__header__inner">
          <animated-brain-svg ref="animatedBrain" />
          <span class="points">{{ points.brain }}</span>
        </div>

        <div class="task__header__inner">
          <animated-lamp-svg ref="animatedLamp" />
          <span class="points">{{ points.lamp }}</span>
        </div>
      </div>
    </div>
    <div class="task__content">
      <div class="task__menu">
        <v-tabs active-class="active" hide-slider v-model="tab">
          <v-tab class="task__menu__item">
            <template v-slot:default>
              {{ taskTabTitle }}
            </template>
          </v-tab>
          <v-tab class="task__menu__item">Сюжет</v-tab>
          <v-tab class="task__menu__item">Материалы урока</v-tab>
          <v-tab class="task__menu__item">Домашнее задание</v-tab>
        </v-tabs>
      </div>
      <v-tabs-items v-model="tab" ref="tabsItem">
        <v-tab-item class="edu-panel__tasks">
          <tasks :tasks="lessonTasks" class="edu-panel__tasks-component" />
        </v-tab-item>
        <v-tab-item>
          <!-- здесь будет новый компонент -->
          <lesson-plot />
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Tasks from "@/components/TaskModule";
import Attachs from "@/components/LessonComponents/Tasks/Attachs";
import TeacherPanel from "@/components/LessonComponents/TeacherPanel";
import LessonPlot from "@/components/LessonComponents/LessonPlot";

import AnimatedCoolSvg from "@/components/Icons/AnimatedCoolSvg";
import AnimatedStarSvg from "@/components/Icons/AnimatedStarSvg";
import AnimatedBrainSvg from "@/components/Icons/AnimatedBrainSvg";
import AnimatedLampSvg from "@/components/Icons/AnimatedLampSvg";

import api from "@/mixins/api";
import gsap from "gsap";

export default {
  name: "edu-panel",
  data: function() {
    return {
      tab: null
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
    // для тестирования анимации
    test() {
      this.$refs.animatedCool.animate();
      this.$refs.animatedStar.animate();
      this.$refs.animatedBrain.animate();
      this.$refs.animatedLamp.animate();
      this.$refs.animatedCoin.animate();
    }
  },
  computed: {
    ...mapGetters(["user", "materials", "socket", "getUserPoints", "points", "lessonTasks"]),
    taskTabTitle() {
      return "Задания";
    },
    brain() {
      return this.points.brain.toFixed(0);
    }
  },
  components: {
    Tasks,
    Attachs,
    TeacherPanel,
    LessonPlot,
    AnimatedCoolSvg,
    AnimatedStarSvg,
    AnimatedBrainSvg,
    AnimatedLampSvg
  },
  props: [],
  mixins: {},
  async beforeMount() {
    await this.$store.dispatch("setLesson", this.$route.params.id);
    console.log(this.lessonTasks)
  },
  watch: {
    points(newValue) {
      gsap.to(this.$data, { duration: 0.5, points: newValue });
      // this.clickCool();
    },
    // smile(newValue) {
    //   gsap.to(this.$data, { duration: 0.5, tweenedSmileData: newValue });
    // },
    // star(newValue) {
    //   gsap.to(this.$data, { duration: 0.5, tweenedSmileData: newValue });
    // },
    // brain(newValue) {
    //   gsap.to(this.$data, { duration: 0.5, tweenedSmileData: newValue });
    // },
    // lamp(newValue) {
    //   gsap.to(this.$data, { duration: 0.5, tweenedSmileData: newValue });
    // },
    // coins(newValue) {
    //   gsap.to(this.$data, { duration: 0.5, tweenedSmileData: newValue });
    // }
    "points.smile": function() {
      this.$refs.animatedCool.animate();
    },
    "points.star": function() {
      this.$refs.animatedStar.animate();
    },
    "points.brain": function() {
      this.$refs.animatedBrain.animate();
    },
    "points.lamp": function() {
      this.$refs.animatedLamp.animate();
    }
  },
  async mounted() {
    await this.setUserPoints();
    this.getLesson().then(res => {
      this.timeData = res.time;
    });
  }
};
</script>

<style>
.theme--light.v-tabs > .v-tabs-bar {
  height: 40px;
}

.v-slide-group__prev,
.v-slide-group__next {
  display: none;
}

.theme--light.v-tabs-items {
  width: 100%;
}

.v-tab {
  display: block;
  line-height: normal;
  min-width: 1px;
  max-width: 100%;
  outline: none;
  padding: 0 0px;
  text-decoration: none;
  text-transform: inherit !important;
  transition: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  font-size: 12px;
  color: #0d0d0d !important;
  border: 0;
  background: none;
  cursor: pointer;
  box-sizing: border-box;
  font-family: Manrope, sans-serif;
  font-weight: 700;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 0;
  white-space: nowrap !important;
}

.v-tab.active {
  border-bottom: 2px solid red !important;
  padding-bottom: 5px !important;
  transform: translateY(2px) !important;
}

.v-slide-group__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.theme--light.v-tabs > .v-tabs-bar {
  background: transparent !important;
}

.v-ripple__container {
  display: none !important;
}

.task__menu {
  padding: 25px 10px 20px 10px !important;
}
.task__menu__item:before {
  content: "";
  position: absolute;
  background: red;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  top: 43%;
  opacity: 0;
  transform: translateY(-72%);
}
.task__content {
  height: 100%;
}
.task__menu__item.active:before {
  opacity: 1 !important;
  transform: translateY(0) !important;
  left: 0 !important;
  top: 3px !important;
  display: none !important;
}

.v-slide-group__wrapper {
  overflow: hidden;
}

.points {
  margin-left: 35px;
}

.task__menu {
  flex-shrink: 0;
}

.lessons-pg .lessons__task .lesson__item .task__content {
  height: 100%;
}
.task-module.vue-component.edu-panel__tasks-component {
  height: 100%;
  margin: 15px 0;
}
.task-module.vue-component.edu-panel__tasks-component .task-group {
  height: calc(100% - 88px);
  overflow: auto;
}

@media (min-width: 1360px) {
  .lessons-pg .lessons__task .lesson__item .task__content .v-window.v-tabs-items {
    height: calc(100% - 85px);
  }
}
</style>
