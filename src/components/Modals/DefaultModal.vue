<template>
  <transition name="fade">
    <div class="default-modal vue-component" v-if="showModal">
      <div class="default-modal__inner">
        <div class="default-modal__head">
          <div class="default-modal__title">
            {{ title }}
          </div>
          <button
            class="default-modal__close"
            type="button"
            @click="$emit('close')"
          >
            <svg class="default-modal__close-icon" width="15" height="15">
              <use xlink:href="#close-red"></use>
            </svg>
            <div class="sr-only">
              Закрыть
            </div>
          </button>
        </div>
        <div class="default-modal__body">
          <span class="default-modal__body-text">{{ text }}</span>
          <div class="default-modal__price-block">
            <div class="default-modal__price-title">{{ priceTitle }}:</div>
            <div class="default-modal__price">{{ price }} ₽</div>
          </div>
        </div>
        <div class="default-modal__footer">
          <button class="default-modal__cancel" @click="close()">Отмена</button>
          <button class="default-modal__pay" @click="pay()">
            Оплатить
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  name: "store-modal",
  components: {},
  data: function() {
    return {};
  },
  props: {
    showModal: Boolean,
    priceTitle: String,
    title: String,
    text: String,
    price: Number
  },
  computed: {},
  directives: {
    clickOutside: vClickOutside.directive
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped="scoped" lang="sass">
.default-modal
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(85, 85, 85, 0.25)
  z-index: 9998
  display: flex
  align-items: center
  justify-content: center
  &__title
    font-family: Manrope, sans-serif !important
    font-weight: 600
    font-size: 32px
    line-height: 41.6px
  &__head
    height: 134px
    padding: 25px 30px
    overflow: hidden
    border-radius: 15px 15px 0 0
    background: url(~@/assets/imgs/calendarHeader.png) no-repeat
  &__body
    flex: 1
    padding: 16px 30px 16px 30px
    display: flex
    flex-direction: column
    justify-content: space-between
  &__footer
    height: 110px
    background: #F4F4F4
    box-shadow: 0px 4px 16px 0px #0000001A inset
    border-radius: 0 0 15px 15px
    display: flex
    align-items: center
    justify-content: flex-end
    padding: 30px
  &__cancel,
  &__pay
    font-weight: 600
    font-size: 20px
    line-height: 20px
    cursor: pointer
  &__cancel
    color: #A6ADAE
    margin-right: 20px
  &__pay
    background: linear-gradient(0deg, #BE1C21 0%, #DC3337 100%)
    color: #FFFFFF
    padding: 15px 24px
    border-radius: 16px
  &__inner
    position: fixed
    display: flex
    flex-direction: column
    justify-content: space-between
    top: 50%
    left: 50%
    z-index: 9999
    width: 520px
    height: 574px
    margin-top: -287px
    margin-left: -260px
    background: #FFFFFF
    font-family: Manrope, sans-serif
    color: #252525
    border-radius: 15px
  &__price-block
    display: flex
    align-items: center
    justify-content: space-between
  &__price-title
    font-weight: 700
    font-size: 18px
    line-height: 27px
  &__price
    display: inline
    font-weight: 900
    font-size: 36px
    line-height: 54px
    text-align: right
    background: linear-gradient(0deg, #DC3337 0%, #BE1C21 100%), linear-gradient(0deg, #6D9AF8 10.09%, #487EF3 85.32%)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
  &__text
    font-weight: 400
    font-size: 18px
    line-height: 29.8px
  &__close
    float: right
    position: relative
    top: -12px
    right: -10px
    display: flex
    justify-content: center
    align-items: center
    width: 35px
    height: 35px
    margin-left: 0.3em
    border-radius: 3px
    outline-width: 0
  &__close-icon
    width: 15px
    height: 15px
    transition-property: transform
    transition-duration: 0.2s
  &__close:focus-visible &__close-icon,
  &__close:hover &__close-icon
    transform: rotate(90deg)
  &__close:active &__close-icon
    transform: scale(0.5)
.fade-enter-active, .fade-leave-active
  transition: opacity .2s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
