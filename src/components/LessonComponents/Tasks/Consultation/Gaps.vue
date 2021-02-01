<template>
  <div class="gaps vue-component">
    <description :index="index"> {{ inputCopy.description }} </description>
    <div class="task-wrap" v-for="level in inputCopy.levels" :key="level.id">
      <template v-if="activeLevelIndex == level.id">
        <div
          class="gaps__slider gaps-slider d-flex justify-space-between align-center mb-5"
        >
          <!-- (activeLevelIndex + 2) % 3 следствие из модульной арифметики -->
          <v-icon
            class="gaps-slider__left gaps-slider__arrow gaps-slider__item"
            @click="Do('switchLevelDo', (activeLevelIndex + 2) % 3)"
            >mdi-arrow-left</v-icon
          >
          <div class="gaps__title gaps-slider__title gaps-slider__item">
            {{ level.audioTitle }}
          </div>
          <v-icon
            class="gaps-slider__right gaps-slider__arrow gaps-slider__item"
            @click="Do('switchLevelDo', [(activeLevelIndex + 1) % 3])"
            >mdi-arrow-right</v-icon
          >
        </div>
        <vuetify-audio class="vuetify-audio" :file="level.audio" />
        <gaps-test :level="level" />
      </template>
    </div>
  </div>
</template>

<script>
import Description from "./../TasksDescription";
import VuetifyAudio from "vuetify-audio";

// import CheckboxGroup from "./CheckboxGroup";
import GapsTest from "./GapsTest";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "gaps",
  data: function() {
    return {
      error: false,
      inputCopy: {},
      answers: [],
      checkedAnswers: []
    };
  },
  methods: {
    ...mapMutations(["saveTask", "setActiveLevelIndex"]),
    switchLevelDo(i) {
      this.setActiveLevelIndex(i);
    },
    changeOption(option, e) {
      let value = e.parentElement.querySelector("input").value;
      option.userAnswer = Boolean(value);
    }
  },
  computed: {
    ...mapGetters(["socket", "activeLevel", "activeLevelIndex"]),
    activeLevelCurrent() {
      let r = [];
      this.inputCopy.levels.forEach(level => {
        if (level.id == this.activeLevelIndex) {
          r = level;
        }
      });
      return r;
    }
  },
  components: {
    Description,
    VuetifyAudio,
    GapsTest
    // CheckboxGroup
  },
  props: ["input", "index"],
  beforeMount() {},
  mounted() {
    this.onDo("setActiveLevelIndex");
    this.onDo("activate");
    this.onDo("switchLevelDo");
  }
};
</script>

<style scoped="scoped" lang="sass">
.gaps
  &__title
    text-align: center
    font-weight: 500
    font-size: 20px
    line-height: 24px
    color: #555555
  &__results
    margin: 10px
    text-align: center
.gaps-slider
  &__arrow
    font-size: 32px
    cursor: pointer
@media (max-width: 960px)
  .gaps__slider
    overflow-x: hidden
</style>
