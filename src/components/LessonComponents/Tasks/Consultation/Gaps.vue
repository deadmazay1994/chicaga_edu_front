<template>
  <div class="gaps vue-component">
    <description :index="index"> {{ inputCopy.description }} </description>
    <div class="task-wrap" v-for="level in inputCopy.levels" :key="level.id">
      <template v-if="activeLevelIndex == level.id">
        <div
          class="gaps__slider gaps-slider d-flex justify-space-between align-center mb-5"
        >
          <v-icon
            class="gaps-slider__left gaps-slider__arrow gaps-slider__item"
            @click="switchLevelDo(Math.abs(-activeLevelIndex + 1) % 3)"
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
        <div class="gap gaps__gap" v-for="(gap, i) in level.tasks" :key="i">
          <div class="gap__title gap__front">{{ i + 1 }}. {{ gap.title }}</div>
          <checkbox-group
            v-model="answers[activeLevelIndex][i]"
            :options="gap.options"
            :status="checkedAnswers[activeLevelIndex][i]"
            class="gap__options"
            ref="gap"
          >
          </checkbox-group>
        </div>
        <div class="gap gaps__gap" v-if="answered">
          <div class="gaps__results">
            Ваш результат:
            <span class="font-weight-bold">{{
              level.tasks.length - errorsCounter
            }}</span>
            {{
              level.tasks.length - errorsCounter == 1
                ? "правильный"
                : "правильных"
            }}
            ответов из
            <span class="font-weight-bold">{{ level.tasks.length }}</span>
            заданий
          </div>
        </div>
        <div class="d-flex justify-center">
          <v-btn class="main-color main-color--text" @click.native="Do('check')"
            >ПРОВЕРИТЬ</v-btn
          >
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Description from "./../TasksDescription";
import VuetifyAudio from "vuetify-audio";

import CheckboxGroup from "./CheckboxGroup";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "gaps",
  data: function() {
    return {
      error: false,
      answered: false,
      inputCopy: {},
      errorsCounter: 0,
      answers: [],
      checkedAnswers: []
    };
  },
  methods: {
    ...mapMutations(["saveTask", "setActiveLevelIndex"]),
    setAnswersVectorIfNotSet(vectorIndex) {
      if (this.answers[vectorIndex] === undefined) {
        this.answers.push([]);
        this.checkedAnswers.push([]);
        this.activeLevelCurrent.tasks.forEach(() => {
          this.checkedAnswers[vectorIndex].push(null);
          this.answers[vectorIndex].push(null);
        });
      }
    },
    switchLevelDo(i) {
      this.setAnswersVectorIfNotSet(i);
      this.setActiveLevelIndex(i);
    },
    changeOption(option, e) {
      let value = e.parentElement.querySelector("input").value;
      option.userAnswer = Boolean(value);
    },
    check() {
      this.answered = true;
      let trueAnswersIndexex = this.activeLevelCurrent.tasks.map(task =>
        task.options.findIndex(option => option.correct)
      );
      trueAnswersIndexex;
      let userAnswersIndexes = this.answers[this.activeLevelIndex].map(
        answer => {
          if (answer) {
            return answer.index;
          }
          return -1;
        }
      );
      if (userAnswersIndexes.length == trueAnswersIndexex.length) {
        this.checkedAnswers[this.activeLevelIndex] = userAnswersIndexes.map(
          (answer, i) => answer == trueAnswersIndexex[i]
        );
        this.errorsCounter = this.checkedAnswers[this.activeLevelIndex].filter(
          ans => !ans
        ).length;
        this.$forceUpdate();
      } else {
        this.$store.commit("pushShuckbar", {
          success: false,
          val:
            "Не удалось выполнить проверку задания. Попробуйте перезагрузить страницу или вернуться позже"
        });
      }
      // this.sendTaskToTeacher(this.index);
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
    CheckboxGroup
  },
  props: ["input", "index"],
  beforeMount() {
    this.setAnswersVectorIfNotSet(0);
  },
  mounted() {
    this.onDo("setActiveLevelIndex");
    this.onDo("activate");
    this.onDo("check");
    this.activeLevelCurrent.tasks.forEach((task, i) => {
      task.options.forEach((option, j) => {
        this.$set(this.activeLevelCurrent.tasks[i].options[j], "index", j);
        this.$set(this.activeLevelCurrent.tasks[i].options[j], "status", null);
        this.$set(
          this.activeLevelCurrent.tasks[i].options[j],
          "answered",
          false
        );
      });
    });
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
.gap
  background: #FFFFFF
  border: 1px solid #F0F0F0
  cursor: pointer
  box-sizing: border-box
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25)
  border-radius: 15px
  margin: 15px 0
  padding: 15px 10px
  &__front
    background: #F0F0F0
    border-radius: 10px
  &__title
    margin-bottom: 10px
    font-size: 18px
    line-height: 21px
    font-weight: bold
    color: #C53440
    padding: 7px 10px
  &__options
    display: flex
    flex-wrap: wrap
    justify-content: space-between
  &__option
    width: 33%
</style>
