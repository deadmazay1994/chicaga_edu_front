<template>
  <div class="question vue-component" @click="toggle()">
    <div class="question__head">
      <div class="question__title">{{ question.question }}</div>
      <svg
        class="question__chevron"
        :class="{ 'question__chevron--active': answerActive }"
      >
        <use xlink:href="#arrow-down"></use>
      </svg>
    </div>
    <div class="question__body">
      <transition name="fade">
        <div
          class="question__answer"
          v-show="answerActive"
          v-html="question.answer"
        ></div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "question",
  components: {},
  data: function() {
    return {
      answerActive: false
    };
  },
  props: ["question"],
  computed: {},
  methods: {
    toggle() {
      this.answerActive = !this.answerActive;
    }
  }
};
</script>

<style scoped="scoped" lang="sass">
.question
  display: flex
  flex-direction: column
  padding-top: 24px
  padding-right: 37px
  padding-bottom: 24px
  padding-left: 60px
  border-radius: 16px
  box-shadow: 0px 4px 10px rgba(128, 128, 128, 0.2)
  cursor: pointer

  &__head
    display: flex
    align-items: center
    justify-content: space-between

  &__body
    padding-top: 8px
    position: relative

  &__title
    font-weight: 600
    font-size: 20px

  &__chevron
    cursor: pointer
    width: 16px
    height: 10px
    transform: rotate(-90deg)
    transition: .2s ease-in-out

  &__chevron--active
      transform: rotate(0deg)
</style>

<!-- элементы v-html находятся за пределами области видимости компонента (scoped) -->
<style lang="sass">
.question a
  color: #007EFF
</style>
