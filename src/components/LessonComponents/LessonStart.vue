<template>
  <div class="lesson-start vue-component" v-if="display">
    <div class="lesson-start__content">
      <div class="lesson-start__text-big">
        Урок начётся 10.08.2020
      </div>
      <v-btn x-large class="lesson-start__btn main-color main-color--text"
        >Начать урок</v-btn
      >
      <v-btn x-large class="lesson-start__btn main-color main-color--text"
        >Присоедениться к уроку</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "lesson-start",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["display"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.lesson-start
  z-index: 1000
  width: 100vw
  height: calc(100vh - 60px)
  background: #000d
  position: absolute
  top: 0
  left: 0
  display: flex
  align-items: center
  justify-content: center
  color: #fff
  &__content
    display: flex
    flex-direction: column
    align-items: center
    flex-wrap: wrap
  &__text-big
    font-size: 4rem
  &__btn
    display: block
    margin: 20px
</style>
