<template>
  <div class="edu-panel lessons__task vue-component" style="margin-left: 0">
    <teacher-panel></teacher-panel>
    <div class="task__header">
      <div class="task__header__item">
        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#smile1"></use>
          </svg>
          <span>{{ animatedSmileData }}</span>
        </div>

        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#star"></use>
          </svg>
          <span>{{ animatedStarData }}</span>
        </div>

        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#brains"></use>
          </svg>
          <span>{{ animatedBrainData }}</span>
        </div>

        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#bulb"></use>
          </svg>
          <span>{{ animatedLampData }}</span>
        </div>
      </div>
      <div class="task__header__item">
        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#coin"></use>
          </svg>
          <span>{{ animatedCoinsData }}</span>
        </div>

        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#clock"></use>
          </svg>
          <span>{{ timeData }}</span>
        </div>
      </div>
    </div>
    <div class="task__content" style="height: 100%">
      <div class="task__menu">
        <v-tabs active-class="active" hide-slider v-model="tab">
          <v-tab class="task__menu__item">
            <template v-slot:default>
              {{ taskTabTitle }}
            </template>
          </v-tab>
          <v-tab class="task__menu__item">White board</v-tab>
          <v-tab class="task__menu__item">Материалы урока</v-tab>
          <v-tab class="task__menu__item">Домашнее задание</v-tab>
        </v-tabs>
      </div>
      <v-tabs-items v-model="tab" ref="tabsItem">
        <v-tab-item class="edu-panel__tasks">
          <tasks class="edu-panel__tasks-component" />
        </v-tab-item>
        <v-tab-item>
          <whiteboard
            class="edu-panel__whiteboard"
            server="https://edu.chicaga.ru:5000/"
            :socketProp="socket"
            :username="user.name"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Tasks from "@/components/LessonComponents/Tasks/Tasks";
import Attachs from "@/components/LessonComponents/Tasks/Attachs";
import TeacherPanel from "@/components/LessonComponents/TeacherPanel";
import Whiteboard from "./WhiteBoard/WhiteBoard";

import api from "@/mixins/api";
import gsap from "gsap";
// import moment from "moment";

export default {
  name: "edu-panel",
  data: function() {
    return {
      tab: null,
      smileData: 0,
      tweenedSmileData: 0,
      starData: 0,
      tweenedStarData: 0,
      brainData: 0,
      tweenedBrainData: 0,
      lampData: 0,
      tweenedLampData: 0,
      coinsData: 0,
      tweenedCoinsData: 0,
      timeData: null
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
        console.log("points item:", item);
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
    }
  },
  computed: {
    ...mapGetters(["user", "materials", "socket", "getUserPoints"]),
    taskTabTitle() {
      if (this.user.role == "teacher") {
        return "Задания и ученики";
      } else {
        return "Задания";
      }
    },
    animatedSmileData() {
      return this.tweenedSmileData.toFixed(0);
    },
    animatedStarData() {
      return this.tweenedStarData.toFixed(0);
    },
    animatedBrainData() {
      return this.tweenedBrainData.toFixed(0);
    },
    animatedLampData() {
      return this.tweenedLampData.toFixed(0);
    },
    animatedCoinsData() {
      return this.tweenedCoinsData.toFixed(0);
    }
  },
  components: {
    Tasks,
    Attachs,
    Whiteboard,
    TeacherPanel
  },
  props: [],
  mixins: {},
  beforeMount() {},
  watch: {
    smileData(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedSmileData: newValue });
    },
    starData(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedSmileData: newValue });
    },
    brainData(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedSmileData: newValue });
    },
    lampData(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedSmileData: newValue });
    },
    coinsData(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedSmileData: newValue });
    }
  },
  mounted() {
    this.setUserPoints().then(() => {
      this.setUserPointsToData();
    });
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
  font-family: sf-ui, sans-serif;
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
.task__menu__item:first-child {
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
</style>
