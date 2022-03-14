<template>
  <v-card class="question vue-component pa-5">
    <div class="question__title text-h4">{{ question.question }}</div>
    <div
      class="question__answer mt-3"
      v-html="question.answer"
      :class="{ 'question__answer--active': answerActive }"
    ></div>
    <v-icon
      class="question__toggler"
      :class="{ 'question__toggler--active': answerActive }"
      size="40"
      @click="toggle"
      >mdi-arrow-down-bold</v-icon
    >
  </v-card>
</template>

<script>
export default {
  name: "question",
  data: function() {
    return {
      answerActive: false
    };
  },
  methods: {
    toggle() {
      this.answerActive = !this.answerActive;
    }
  },
  computed: {},
  components: {},
  props: ["question"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.question
  margin-bottom: 10px
  height: 100%
  position: relative
  &__title
    max-width: 90%
  &__answer
    display: none
    &--active
      display: block
  &__toggler
    position: absolute
    top: 10px
    right: 10px
    cursor: pointer
    color: $main_color
    &--active
      transform: rotate(180deg)
</style>
