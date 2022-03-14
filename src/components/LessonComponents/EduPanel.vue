<template>
  <div class="edu-panel lessons__task vue-component" style="margin-left: 0">
    <teacher-panel></teacher-panel>
    <div class="task__header">
      <div class="task__header__item">
        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#smile1"></use>
          </svg>
          <span>10</span>
        </div>

        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#star"></use>
          </svg>
          <span>10</span>
        </div>

        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#brains"></use>
          </svg>
          <span>10</span>
        </div>

        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#bulb"></use>
          </svg>
          <span>0</span>
        </div>
      </div>
      <div class="task__header__item">
        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#coin"></use>
          </svg>
          <span>200</span>
        </div>

        <div class="task__header__inner">
          <svg class="task__header__svg">
            <use xlink:href="#clock"></use>
          </svg>
          <span>15:00</span>
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
            :userRole="user.role"
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
import { mapGetters } from "vuex";
import Tasks from "@/components/LessonComponents/Tasks/Tasks";
import Attachs from "@/components/LessonComponents/Tasks/Attachs";
import TeacherPanel from "@/components/LessonComponents/TeacherPanel";
import Whiteboard from "./WhiteBoard/WhiteBoard";

export default {
  name: "edu-panel",
  data: function() {
    return {
      tab: null
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["user", "materials", "socket"]),
    taskTabTitle() {
      return "Задания";
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
  mounted() {}
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
