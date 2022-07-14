<template>
  <div class="demo-modal vue-component">
    <default-modal-vue
      :title="'Мини-курс для путешествий'"
      :showModal="showModal"
      @close="$emit('close')"
    >
      <div class="demo-modal__content">
        <img
          src="@/assets/imgs/modal-image.png"
          alt="Изображение мини-курса путешествий"
        />
        <div class="demo-modal__content-right">
          <span class="demo-modal__text"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque et odio sed est pellentesque gravida sit amet at
            orci.</span
          >
          <div class="demo-modal__teacher-info">
            <div class="demo-modal__teacher-text">
              <div class="demo-modal__teacher-title">Предподаватель</div>
              <div class="demo-modal__teacher-name">Валерия</div>
            </div>
            <div class="demo-modal__avatar-wrapper">
              <img
                class="demo-modal__teacher-image"
                src="@/assets/imgs/teacher-avatar.png"
                alt="Изображение учителя"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="demo-modal__price-wrapper">
        <div class="demo-modal__price-title">Стоимость мини курса:</div>
        <div class="demo-modal__price-block">
          <div class="demo-modal__old-price">2700</div>
          <div class="demo-modal__new-price">1200 ₽</div>
        </div>
      </div>
    </default-modal-vue>
  </div>
</template>

<script>
import DefaultModalVue from "../../../Modals/DefaultModal.vue";

export default {
  name: "demo-modal",
  components: {
    DefaultModalVue
  },
  data: function() {
    return {};
  },
  props: {
    showModal: Boolean
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.demo-modal
  &__content
    display: flex
    justify-content: space-between
  &__content-right
    padding-left: 8px
    padding-right: 30px
    display: flex
    flex-direction: column
    justify-content: space-between
  &__teacher-info
    display: flex
    align-items: center
    justify-content: flex-end
  &__teacher-text
    display: flex
    flex-direction: column
    padding-right: 16px
  &__teacher-title
    font-family: Manrope
    font-size: 16px
    font-weight: 200
    line-height: 24px
    letter-spacing: 0em
    text-align: right
  &__teacher-name
    font-family: Manrope
    font-size: 18px
    font-weight: 700
    line-height: 27px
    letter-spacing: 0em
    text-align: right
  &__avatar-wrapper
    width: 70px
    height: 70px
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
  &__teacher-image
    object-fit: contain
  &__price-wrapper
    display: flex
    align-items: center
    justify-content: space-between
    padding-left: 30px
    padding-right: 30px
    padding-top: 24px
    padding-bottom: .5rem
  &__price-block
    display: flex
    flex-direction: column
    align-items: flex-end
  &__price-title
    font-weight: 700
    font-size: 18px
    line-height: 27px
  &__old-price
    position: relative
    display: inline
    font-weight: 600
    font-size: 20px
    line-height: 20px
    color: #C4C4C4
    &:after
      content: ""
      width: 100%
      height: 1px
      background-color: #C4C4C4
      position: absolute
      top: 12px
      left: 0
  &__new-price
    display: inline
    font-weight: 200
    font-size: 36px
    line-height: 36px
    text-align: right
    background: linear-gradient(0deg, #DC3337 0%, #BE1C21 100%), linear-gradient(0deg, #6D9AF8 10.09%, #487EF3 85.32%)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
  &__text
    padding-top: 18px
    font-weight: 400
    font-size: 18px
    line-height: 29.8px
</style>
