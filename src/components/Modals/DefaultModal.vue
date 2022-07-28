<template>
  <div class="default-modal">
    <div class="default-modal__head">
      <button class="default-modal__close" type="button" @click="closeModal()">
        <svg class="default-modal__close-icon" width="15" height="15">
          <use xlink:href="#close-red"></use>
        </svg>
        <div class="sr-only">
          Закрыть
        </div>
      </button>
      <div class="default-modal__title">
        {{ title }}
      </div>
    </div>
    <div class="default-modal__body">
      <slot></slot>
    </div>
    <div class="default-modal__footer">
      <button class="default-modal__cancel" @click="closeModal()">
        Отмена
      </button>
      <button class="default-modal__pay" @click="pay()">
        Оплатить
      </button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";

export default {
  name: "store-modal",
  components: {},
  data: function() {
    return {};
  },
  props: {
    title: String
  },
  computed: {},
  methods: {
    closeModal() {
      eventBus.$emit("closeModal");
    }
  },
  mounted() {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.default-modal
  max-width: 520px
  margin: auto
  color: #252525
  background-color: #ffffff
  border-radius: 15px
  overflow: hidden
  @media ($media_md)
    max-width: 420px
  &__head
    padding: 25px 30px
    border-bottom: 1px solid #f0f1f1
    @media ($media_md)
      padding: 15px
  &__close
    float: right
    position: relative
    top: -8px
    right: -8px
    display: flex
    justify-content: center
    align-items: center
    width: 30px
    height: 30px
    margin-left: 10px
    border-radius: 3px
    @media ($media_md)
      top: 0
      right: 0
      width: 26px
      height: 26px
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
  &__title
    font-weight: 800
    font-size: 24px
    line-height: 1.3
    @media ($media_md)
      font-size: 20px
  &__body
    display: flex
    flex-direction: column
    justify-content: space-between
    flex-grow: 1
  &__footer
    display: flex
    align-items: center
    justify-content: flex-end
    padding: 30px
    font-weight: 600
    font-size: 20px
    line-height: 1
    background-color: #f4f4f4
    @media ($media_md)
      padding: 15px
      font-size: 16px
  &__cancel
    margin-right: 20px
    color: #a6adae
  &__pay
    padding: 16px 24px
    color: #ffffff
    background-image: linear-gradient(0deg, #be1c21 0%, #dc3337 100%)
    border-radius: 16px
    @media ($media_md)
      padding-top: 14px
      padding-bottom: 14px
.fade-enter-active, .fade-leave-active
  transition: opacity 0.2s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
