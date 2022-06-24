<template>
  <div class="tariff-price" :class="'tariff-price--' + trait">
    <div class="tariff-price__inner">
      <header class="tariff-price__header">
        <div class="tariff-price__title-box">
          <span class="tariff-price__title">
            1 курс
          </span>
        </div>
      </header>
      <div class="tariff-price__body">
        <div class="tariff-price__body-main">
          <div class="tariff-price__month-box">
            <span class="tariff-price__month-price">11 200</span
            ><span class="tariff-price__month-currency">₽</span> за месяц
          </div>
          <div class="tariff-price__course-box">
            1 курс –
            <span v-if="isSale" class="tariff-price__old-price">
              56 000
            </span>
            <span v-if="isSale" class="tariff-price__sale-box">
              <span class="tariff-price__sale">
                -20<span class="tariff-price__sale-percent">%</span>
              </span>
            </span>
            <span class="tariff-price__course-price">
              44 800
            </span>
            <span class="tariff-price__course-currency">
              ₽
            </span>
          </div>
          <div v-if="isSale" class="tariff-price__saving-box">
            Вы экономите: 11 200 р
          </div>
        </div>
        <div class="tariff-price__btn-box">
          <a class="tariff-price__btn" href="#">
            Купить
          </a>
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
  props: {
    trait: {
      type: String,
      default: "basic"
    },
    isSale: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  beforeMount() {}
};
</script>

<style lang="sass" scoped>
.tariff-price
  position: relative
  max-width: 390px
  font-size: 14px
  line-height: 1.3
  box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  border-radius: 12px
  overflow: hidden
  &__inner
    display: flex
    flex-direction: column
    min-height: 213px
    background-color: #ffffff
  &__header
    padding: 24px 66px 16px
    border-bottom: 1px solid #dcdcdc
  &__title-box
    font-weight: 800
    font-size: 32px
    text-align: center
    color: #202020
  &__body
    display: flex
    justify-content: space-between
    flex-grow: 1
    padding: 16px 24px 24px
  &__body-main
    margin-right: 15px
  &__month-box
    margin-bottom: 10px
    font-weight: 300
    font-size: 16px
  &__month-price
    display: inline-block
    font-weight: 600
    font-size: 32px
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.15)
    background-color: #202020
    -webkit-background-clip: text
    background-clip: text
    -webkit-text-fill-color: transparent
    text-fill-color: transparent
  &--standart &__month-price
    background-image: linear-gradient(114deg, #909090 17%, #b8b8b8 25%, #909090 34%, #909090 47%, #bcbcbc 54%, #909090 67%, #909090 84%, #727272 91%), linear-gradient(124deg, rgba(252, 204, 110, 0.8) -32%, rgba(255, 218, 146, 0.8) -22%, rgba(252, 204, 110, 0.8) -16%, rgba(252, 204, 110, 0.8) -10%, rgba(255, 229, 177, 0.8) -2%, rgba(252, 204, 110, 0.8) 12%, rgba(252, 204, 110, 0.8) 29%, rgba(163, 125, 52, 0.8) 35%, rgba(163, 125, 52, 0.8) 43%, rgba(244, 197, 106, 0.8) 61%, rgba(162, 124, 51, 0.8) 75%, rgba(237, 191, 101, 0.8) 116%)
  &--premium &__month-price
    background-image: linear-gradient(124deg, rgba(252, 204, 110, 0.8) -32%, rgba(255, 218, 146, 0.8) -22%, rgba(252, 204, 110, 0.8) -16%, rgba(252, 204, 110, 0.8) -10%, rgba(255, 229, 177, 0.8) -2%, rgba(252, 204, 110, 0.8) 12%, rgba(252, 204, 110, 0.8) 29%, rgba(163, 125, 52, 0.8) 35%, rgba(163, 125, 52, 0.8) 43%, rgba(244, 197, 106, 0.8) 61%, rgba(162, 124, 51, 0.8) 75%, rgba(237, 191, 101, 0.8) 116%)
  &__month-currency
    margin-right: 6px
  &__sale-box
    position: absolute
    top: 0
    left: 0
    width: 100px
    height: 100px
    line-height: 1
    background-image: linear-gradient(135deg, #ffbdad 0%, #ff6a61 50%, rgba(255, 255, 255, 0) 50.1%)
  &__sale
    position: absolute
    top: 0
    right: 0
    display: flex
    align-items: flex-end
    justify-content: center
    width: 100%
    height: 50%
    padding-bottom: 6px
    font-weight: 800
    font-size: 32px
    color: #ffffff
    text-shadow: 0 -1px 1px rgba(255, 106, 97, 0.5), 1px 0 1px rgba(255, 106, 97, 0.5), 0 1px 1px rgba(255, 106, 97, 0.5), -1px 0 1px rgba(255, 106, 97, 0.5)
    transform: rotate(-45deg)
    transform-origin: center bottom
  &__sale-percent
    font-weight: 400
    font-size: 24px
  &__old-price
    margin-right: 3px
    margin-left: 2px
    color: #c4c4c4
    text-decoration: line-through
  &__course-price
    font-size: 16px
    color: #e84145
  &__course-currency
    font-size: 10px
  &__saving-box
    font-weight: 600
  &__btn-box
    align-self: center
    padding-top: 16px
  &__btn
    display: inline-block
    padding: 6px 22px
    font-weight: 700
    font-size: 16px
    line-height: 1.5
    color: #e84145
    background-color: transparent
    border: 1.5px solid #e84145
    border-radius: 16px
    transition-property: color, background-color, border-color
    transition-duration: 0.2s
    outline: none
  &__btn:focus-visible,
  &__btn:hover
    color: #ffffff
    background-color: #ff0000
    border-color: #ff0000
  &__btn:active
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25)
</style>
