<template>
  <div class="program-card vue-component" :class="'program-card--' + kind">
    <div class="program-card__inner">
      <div class="program-card__top">
        <div class="program-card__img-box">
          <img
            v-if="kind == 'teacher'"
            class="program-card__img"
            width="48"
            height="48"
            src="@/assets/imgs/lessons/teacher.jpg"
            alt="Учитель"
          />
          <svg v-else class="program-card__img" width="48" height="48">
            <use v-if="kind == 'test'" xlink:href="#sq-school-check"></use>
            <use
              v-else-if="kind == 'practical'"
              xlink:href="#sq-school-green"
            ></use>
            <use v-else xlink:href="#sq-school-red"></use>
          </svg>
        </div>
        <div class="program-card__title-box">
          <span class="program-card__title">
            {{ courseProgramm.title }}
          </span>
        </div>
        <div class="program-card__rating-box">
          <div class="program-card__rating-inner">
            <svg class="program-card__star" width="16" height="16">
              <use xlink:href="#star"></use>
            </svg>
            <span class="program-card__rating">
              {{ courseProgramm.rating }}
            </span>
          </div>
        </div>
        <div class="program-card__lock-box">
          <svg class="program-card__lock" width="24" height="24">
            <use xlink:href="#lock-lock"></use>
          </svg>
        </div>
      </div>
      <div class="program-card__bottom">
        <div class="program-card__bottom-item">
          <div class="program-card__data">
            <svg class="program-card__bottom-img" width="18" height="18">
              <use xlink:href="#clock"></use>
            </svg>
            <span class="program-card__time">
              25:32 мин
            </span>
          </div>
          <div class="program-card__desc">
            продолжительность
          </div>
        </div>
        <div class="program-card__bottom-item">
          <div class="program-card__data">
            <svg
              class="program-card__bottom-img"
              width="18"
              height="18"
              fill="none"
            >
              <use xlink:href="#calendar"></use>
            </svg>
            <span class="program-card__date">
              01.09.2022 г.
            </span>
          </div>
          <div class="program-card__desc">
            доступ к уроку
          </div>
        </div>
        <div class="program-card__btn-box">
          <button class="program-card__btn" disabled>
            <svg class="program-card__btn-img" width="14" height="14">
              <use xlink:href="#arrow-down"></use>
            </svg>
            <span class="sr-only">
              Об уроке
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: {
    kind: {
      type: String,
      default: "lesson"
    },
    courseProgramm: Object
  },
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.program-card
  font-weight: 600
  font-size: 14px
  line-height: 1.3
  &__inner
    color: #202020
    background-color: #ffffff
    border-radius: 12px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  &--practical &__inner
    background-image: linear-gradient(360deg, rgba(255, 255, 255, 0.2) 42%, rgba(181, 214, 55, 0.2) 100%)
  &--test &__inner
    background-image: linear-gradient(180deg, #ece9e6 0%, #ffffff 57%)
  &__top
    display: flex
    padding: 24px
    border-bottom: 1px solid #dcdcdc
  &__img-box
    display: flex
    flex-shrink: 0
    width: 48px
    height: 48px
    margin-right: 16px
    border-radius: 8px
    overflow: hidden
  &__img
    width: 100%
    height: 100%
    fill: none
  &__title-box
    flex-grow: 1
    margin-right: 10px
    font-weight: 700
    font-size: 16px
    line-height: 1.5
  &__rating-box
    margin-right: 10px
  &__rating-inner
    display: flex
    align-items: center
    padding: 3px 5px
    border-radius: 8px
    background-color: rgba(255, 186, 173, 0.1)
  &__star
    margin-right: 1px
  &__lock-box
    padding-left: 20px
  &__bottom
    display: flex
    align-items: center
    padding: 16px 24px
  &__bottom-item:not(:last-child)
    margin-right: 24px
  &__data
    display: flex
    align-items: center
    margin-bottom: 4px
  &__bottom-img
    margin-right: 4px
  &__desc
    font-weight: 300
    font-size: 12px
  &__btn-box
    flex-grow: 1
    display: flex
    justify-content: flex-end
  &__btn
    display: flex
    align-items: center
    justify-content: center
    min-width: 32px
    min-height: 38px
    padding: 6px
    border: 1px solid #a9a9a9
    border-radius: 8px
  &__btn-img
    fill: #a9a9a9
    transform: rotate(-90deg)
</style>
