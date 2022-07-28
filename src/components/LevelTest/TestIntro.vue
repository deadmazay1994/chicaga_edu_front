<template>
  <div class="test-intro vue-component">
    <div class="test-intro__inner">
      <div class="test-intro__content">
        <div class="test-intro__title">
          <span class="test-intro__title-main">
            Онлайн-тест
          </span>
          на&nbsp;уровень знания английского языка
        </div>
        <div class="test-intro__feature-title">
          Особенность теста:
        </div>
        <ul class="test-intro__feature-list">
          <li>
            Комплексная методика определения уровня английского языка.
          </li>
          <li>
            Вопросы генерируются исходя из ваших ответов.
          </li>
          <li>
            Более 25 вариантов вопросов.
          </li>
          <li>
            Это позволяет определить уровень владения английским с точностью до
            95%.
          </li>
        </ul>
        <div class="test-intro__present-title">
          Пройдите тест и получите подарки
        </div>
        <div class="test-intro__presents-box">
          <div class="test-intro__present-box">
            <img
              class="test-intro__present-img"
              src="~@/assets/imgs/stickers.png"
              width="115"
              height="80"
              alt="Набор стикеров от Chicaga"
            />
            <span class="test-intro__present-text">
              9 стикеров для Telegram
            </span>
          </div>
          <span class="test-intro__present-plus">
            +
          </span>
          <div class="test-intro__present-box">
            <img
              class="test-intro__present-img"
              src="~@/assets/imgs/presents.png"
              width="115"
              height="80"
              alt="Коробки с подарками"
            />
            <span class="test-intro__present-text">
              Бонусный подарок
            </span>
          </div>
        </div>
        <c-btn class="test-intro__btn">Начать Онлайн-ТЕСТ</c-btn>
      </div>
      <div class="test-intro__img-box">
        <img
          class="test-intro__img"
          src="~@/assets/imgs/toucan-hello-big.png"
          width="494"
          height="569"
          alt="Тукан говорит вам: 'Hello'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CBtn from "../UiElements/C-btn.vue";
export default {
  name: "test-intro",
  components: { CBtn },
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.test-intro
  display: flex
  align-items: center
  min-height: 90%
  padding: 32px
  font-weight: 400
  font-size: 16px
  line-height: 1.5
  color: #303030
  &__inner
    display: flex
    justify-content: space-between
    align-items: flex-end
    flex-basis: 100%
  &__content
    flex-basis: 648px
  &__title
    margin-bottom: 16px
    font-weight: 700
    font-size: 36px
    text-transform: uppercase
  &__title-main
    display: block
    font-size: 64px
    color: #ff6440
  &__feature-title
    font-weight: 700
    font-size: 24px
  &__feature-list
    margin-bottom: 16px
    padding-left: 41px
    list-style-type: none
    background-image: url(~@/assets/imgs/icons/star-3.svg)
    background-position: 0 50%
    background-size: 25px 25px
  &__present-title
    font-weight: 600
    font-size: 24px
  &__presents-box
    display: flex
    align-items: center
    margin-bottom: 3px
  &__present-box
    display: flex
    flex-direction: column
    align-items: center
    flex-basis: 150px
    padding: 8px 5px
    font-size: 20px
    text-align: center
  &__present-plus
    padding: 0 24px 0
    font-weight: 600
    font-size: 36px
  &__btn
    max-width: none
    padding: 18px 48px
    font-weight: 700
    font-size: 24px
    text-transform: uppercase
    border-radius: 16px
  &__img-box
    flex-basis: calc( 494px + 36px + 28px )
    width: 494px
    height: 569px
    padding-right: 36px
    padding-left: 28px
  &__img
    width: 100%
    height: 100%
    object-fit: contain
</style>
