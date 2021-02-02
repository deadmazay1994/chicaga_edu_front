<template>
  <div class="gaps-test vue-component">
    <div class="gap gaps__gap" v-for="(gap, i) in level.tasks" :key="i">
      <div class="gap__title gap__front">{{ i + 1 }}. {{ gap.title }}</div>
      <checkbox-group
        v-model="answers[i]"
        :options="gap.options"
        :one-attempt="true"
        :index="i"
        class="gap__options"
        ref="gap"
      >
      </checkbox-group>
      <div class="gap__front gap__fullform" v-if="answers[i]">
        {{ gap.fullForm }} ({{ gap.options.find(o => o.correct).text }})
      </div>
    </div>
    <div class="gap gaps__gap" v-if="answered">
      <div class="gaps__results">
        Ваш результат:
        <span class="font-weight-bold">{{
          level.tasks.length - errorsCounter
        }}</span>
        {{
          level.tasks.length - errorsCounter == 1 ? "правильный" : "правильных"
        }}
        ответа из
        <span class="font-weight-bold">{{ level.tasks.length }}</span>
        заданий
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxGroup from "./CheckboxGroup";

export default {
  name: "gaps-test",
  data: function() {
    return {
      answers: [],
      answered: false,
      checkedAnswers: [],
      errorsCounter: 0
    };
  },
  methods: {
    addFieldsToOptions() {
      this.level.tasks.forEach((task, i) => {
        task.options.forEach((option, j) => {
          this.$set(this.level.tasks[i].options[j], "index", j);
          this.$set(this.level.tasks[i].options[j], "status", null);
          this.$set(this.level.tasks[i].options[j], "answered", false);
        });
      });
    },
    initUserAnswersDefault() {
      while (this.answers.length != this.level.tasks.length) {
        this.answers.push(null);
      }
    },
    setResult() {
      let trueAnswersIndexex = this.level.tasks.map(task =>
        task.options.findIndex(option => option.correct)
      );
      let userAnswersIndexes = this.answers.map(answer => {
        if (answer) {
          return answer.index;
        }
        return -1;
      });
      if (userAnswersIndexes.length == trueAnswersIndexex.length) {
        this.checkedAnswers = userAnswersIndexes.map(
          (answer, i) => answer == trueAnswersIndexex[i]
        );
        this.errorsCounter = this.checkedAnswers.filter(ans => !ans).length;
        this.$forceUpdate();
        this.answered = true;
      } else {
        this.$store.commit("pushShuckbar", {
          success: false,
          val:
            "Не удалось выполнить проверку задания. Попробуйте перезагрузить страницу или вернуться позже"
        });
      }
    }
  },
  computed: {},
  components: {
    CheckboxGroup
  },
  props: ["level"],
  watch: {
    answers: function() {
      if (this.answers.find(ans => ans === null) !== null) {
        console.log("yes");
        this.setResult();
      }
    }
  },
  mixins: {},
  beforeMount() {
    this.addFieldsToOptions();
    this.initUserAnswersDefault();
  },
  mounted() {
    this.onDo("check");
  }
};
</script>

<style scoped="scoped" lang="sass">
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
    padding: 7px 10px
    font-weight: bold
  &__title
    margin-bottom: 10px
    font-size: 18px
    line-height: 21px
    color: #C53440
  &__fullform
    margin-top: 15px
  &__options
    display: flex
    flex-wrap: wrap
    justify-content: space-between
  &__option
    width: 33%
</style>
