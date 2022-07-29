<template>
  <div class="test-result vue-component">
    <test-interlayer>
      <template v-slot:default>
        <div class="result-main">
          <div class="result-main__head">
            <div class="result-main__title">
              Поздравляем,
              <span class="result-main__title-newline">вы завершили тест!</span>
            </div>
            <div class="result-main__answers-box">
              <div class="result-main__answers-head">
                Вы верно ответили на
                <span class="result-main__answers">
                  5 из 12 вопросов
                </span>
              </div>
              <div class="result-main__answers-text">
                для уровней Beginner — Elementary
              </div>
            </div>
            <div class="result-main__sticker-box">
              <img
                class="result-main__sticker"
                src="~@/assets/imgs/well-done-my-boy.png"
                width="166"
                height="163"
                alt="Молодец, май бой"
              />
            </div>
          </div>
          <div class="result-main__meaning-box">
            <div class="result-main__meaning-text">
              Это означает, что ваш грамматический уровень соответствует:
            </div>
            <div class="result-main__level">
              Beginner
            </div>
            <div class="result-main__desc">
              Вы понимаете основной смысл разговора, можете задавать простые
              вопросы и описывать себя, свой досуг
            </div>
          </div>
          <div class="result-main__attention">
            Рекомендуем выбрать уровень урока выше, чем ваш грамматический
            уровень владения английским
          </div>
          <div class="result-main__return-box">
            <div class="result-main__return-text">
              Вернитесь на главную и выберите подходящий для вас бесплатный
              вводный урок
            </div>
            <c-btn class="result-main__return-btn">Вернуться на главную</c-btn>
          </div>
        </div>
      </template>
      <template v-slot:aside>
        <div class="result-aside">
          <div class="result-aside__inner">
            <div class="result-aside__title">
              <span class="result-aside__title-accent">Получите</span> ваши
              подарки прямо сейчас в&nbsp;<span
                class="result-aside__title-accent"
                >Telegram</span
              >
            </div>
            <div class="result-aside__presents-box">
              <div class="result-aside__present-box">
                <img
                  class="result-aside__present-img"
                  src="~@/assets/imgs/stickers.png"
                  width="110"
                  height="72"
                  alt="Набор стикеров от Chicaga"
                />
              </div>
              <span class="result-aside__present-plus">
                +
              </span>
              <div class="result-aside__present-box">
                <img
                  class="result-aside__present-img"
                  src="~@/assets/imgs/presents.png"
                  width="100"
                  height="72"
                  alt="Коробки с подарками"
                />
              </div>
            </div>
            <c-btn class="result-aside__btn">Получить подарки в Telegram</c-btn>
          </div>
        </div>
      </template>
    </test-interlayer>
  </div>
</template>

<script>
import TestInterlayer from "./TestInterlayer.vue";

export default {
  name: "test-result",
  components: { TestInterlayer },
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.test-result
  width: 100%
  height: 100%
  line-height: 1.5
  color: #303030

.result-main
  padding: 16px 16px 16px 64px
  &__head
    position: relative
    min-height: 175px
    margin-bottom: 24px
  &__title
    margin-bottom: 24px
    padding-right: 200px
    font-weight: 700
    font-size: 32px
    text-transform: uppercase
  &__title-newline
    display: block
  &__answers-box
    padding-right: 200px
  &__answers-head
    font-weight: 600
    font-size: 24px
  &__answers
    color: #cc2d23
  &__answers-text
    font-weight: 700
  &__sticker-box
    position: absolute
    top: 0
    right: 0
    width: 166px
    height: 163px
  &__sticker
    width: 100%
    height: 100%
    object-fit: contain
  &__meaning-text
    margin-bottom: 8px
    font-weight: 300
    line-height: 1.3
  &__level
    padding: 12px 24px
    font-weight: 700
    font-size: 24px
    text-align: center
    text-transform: uppercase
    background-image: linear-gradient(270deg, #fedf9a 0%, #faeac6 96%)
    border-radius: 15px
  &__desc
    font-size: 14px
    color: #c59323
  &__attention
    position: relative
    display: flex
    align-items: center
    min-height: 50px
    padding-left: 66px
    font-weight: 500
    font-size: 20px
    line-height: 1.3
    color: #e84145
  &__attention::before
    content: ""
    position: absolute
    top: 50%
    left: 0
    width: 50px
    height: 50px
    background-image: url("data:image/svg+xml,%3Csvg width='4' height='28' viewBox='0 0 4 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28V24.4222H4V28H0ZM0 21V0H4V21H0Z' fill='%23E84145'/%3E%3C/svg%3E%0A")
    background-position: center
    background-size: 4px 28px
    border: 3px solid currentColor
    border-radius: 25px
    transform: translateY(-50%)
  &__return-box
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 42px
  &__return-text
    text-align: center
    margin-bottom: 14px
  &__return-btn
    padding: 12px 32px
    text-transform: uppercase
    border-radius: 16px

.result-aside
  display: flex
  align-items: center
  min-height: 100%
  padding: 18px
  &__inner
    display: flex
    flex-direction: column
    align-items: center
    margin: auto
  &__title
    margin-bottom: 40px
    font-weight: 700
    font-size: 24px
    text-align: center
    text-transform: uppercase
  &__title-accent
    color: #c59323
  &__presents-box
    display: flex
    align-items: center
    margin-bottom: 40px
  &__present-box
    display: flex
    flex-direction: column
    align-items: center
    flex-basis: 100px
    padding: 8px 5px
  &__present-plus
    padding-right: 16px
    padding-left: 16px
    font-weight: 700
  &__btn
    max-width: none
    padding: 18px 48px
    font-weight: 700
    text-transform: uppercase
    border-radius: 16px
</style>
