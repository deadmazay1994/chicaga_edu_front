<template>
  <div class="gaps vue-component">
    <description :index="index"> {{ inputCopy.description }} </description>
    <div class="task-wrap" v-for="level in inputCopy.levels" :key="level.id">
      <template v-if="activeLevel == level.id">
        <div class="gaps__title">{{ level.audioTitle }}</div>
        <vuetify-audio :file="level.audio" />
        <div class="gap gaps__gap" v-for="(gap, i) in level.tasks" :key="i">
          <div class="gap__title gap__front">{{ i + 1 }}. {{ gap.title }}</div>
          <div class="gap__options" ref="gap">
            <div
              class="gap__option gap__front option"
              :class="selectClass(option, gap.options)"
              v-for="(option, i) in gap.options"
              :key="i"
            >
              <div class="option__text">
                {{ option.text }}
              </div>
              <checkbox
                class="option__checkbox checkbox"
                :error="checkboxError"
                @click.native="changeOption(option, $event)"
              />
            </div>
          </div>
        </div>
        <div class="gaps__results" v-if="answered">
          Ваш результат
          <span class="font-weight-bold">{{ errorsCounter }}</span> ошибок из
          <span class="font-weight-bold">{{ level.tasks.length }}</span>
          заданий
        </div>
        <div class="d-flex justify-center">
          <v-btn class="main-color main-color--text" @click.native="check"
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
import Checkbox from "./../Checkbox";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "gaps",
  data: function() {
    return {
      error: false,
      answered: false,
      inputCopy: {},
      errorsCounter: 0
    };
  },
  methods: {
    ...mapMutations(["saveTask"]),
    changeOption(option, e) {
      let value = e.target.parentElement.querySelector("input").value;
      option.userAnswer = Boolean(value);
    },
    check() {
      this.answered = true;
      this.errorsCounter = 0;
      this.activeLevelCurrent.tasks.forEach(task => {
        let correct = 0;
        task.options.forEach(option => {
          if (option.userAnswer == option.correct) {
            option.status = true;
            correct = 1;
          } else {
            option.status = false;
          }
          option.answered = true;
        });
        this.errorsCounter += !correct;
      });
    },
    selectClass(option, neighbors) {
      let existCorrectNeigbor = false;
      neighbors.forEach(n => {
        if (!existCorrectNeigbor && n.status) {
          existCorrectNeigbor = true;
        }
      });
      return {
        "option--correct": option.status && option.answered,
        "option--uncorrect":
          !option.status && option.answered && !existCorrectNeigbor
      };
    }
  },
  computed: {
    ...mapGetters(["socket", "activeLevel"]),
    checkboxError() {
      if (this.answered) {
        return this.error ? "uncorrect" : "correct";
      }
      return "";
    },
    activeLevelCurrent() {
      let r = [];
      this.inputCopy.levels.forEach(level => {
        if (level.id == this.activeLevel) {
          r = level;
        }
      });
      return r;
    }
  },
  components: {
    Description,
    VuetifyAudio,
    Checkbox
  },
  props: ["input", "index"],
  beforeMount() {
    this.activeLevelCurrent.tasks.forEach((task, i) => {
      task.options.forEach((option, j) => {
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
    margin-bottom: 20px
  &__results
    margin-bottom: 10px
.gap
  background: #FFFFFF
  border: 1px solid #F0F0F0
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
.option
  background: transparent
  background-position: -2px
  background-image: url("/imgs/tasksBgs/change.png")
  background-size: 100% 100%
  background-repeat: no-repeat
  position: relative
  &__text
    font-weight: bold
    font-size: 20px
    line-height: 26px
    display: flex
    align-items: center
    justify-content: center
    color: #555555
    width: 150px
    min-height: 80px
    text-align: center
    padding: 10px
  &__checkbox
    position: absolute
    bottom: -7px
    left: calc(50% - 12px)
  &--correct
    background-image: url("/imgs/tasksBgs/change--success.png")
  &--uncorrect
    background-image: url("/imgs/tasksBgs/change--error.png")
</style>
