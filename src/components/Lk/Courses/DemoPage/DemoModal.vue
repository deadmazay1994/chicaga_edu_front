<template>
  <default-modal-vue
    :title="'Мини-курс для путешествий'"
    :showModal="showModal"
    @close="$emit('close')"
  >
    <div class="demo-modal vue-component">
      <div class="demo-modal__body">
        <div class="demo-modal__img-box">
          <img
            class="demo-modal__img"
            src="@/assets/imgs/modal-image.png"
            width="209"
            height="302"
            alt="Изображение мини-курса путешествий"
          />
        </div>
        <div class="demo-modal__content">
          <div class="demo-modal__text-box">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque et odio sed est pellentesque gravida sit amet at
              orci.
            </p>
          </div>
          <div class="demo-modal__teacher-info">
            <div class="demo-modal__teacher-text">
              <div class="demo-modal__teacher-title">Преподаватель</div>
              <div class="demo-modal__teacher-name">Валерия</div>
            </div>
            <div class="demo-modal__avatar-wrapper">
              <img
                class="demo-modal__teacher-image"
                src="@/assets/imgs/teacher-avatar.png"
                width="70"
                height="70"
                alt="Фотография учителя"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="demo-modal__price-wrapper">
        <div class="demo-modal__price-title">Стоимость мини курса:</div>
        <div class="demo-modal__price-block">
          <div class="demo-modal__price-box demo-modal__price-box--old">
            <span class="demo-modal__old-price">2700</span
            ><span class="demo-modal__old-currency">₽</span>
          </div>
          <div class="demo-modal__price-box demo-modal__price-box--new">
            <span class="demo-modal__new-price">1200</span>
            <span class="demo-modal__new-currency">₽</span>
          </div>
        </div>
      </div>
    </div>
  </default-modal-vue>
</template>

<script>
import DefaultModalVue from "@/components/Modals/DefaultModal.vue";

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
@import "@/assets/styles/variables.sass"

.demo-modal
  position: relative
  overflow: hidden
  &__body
    display: flex
    justify-content: space-between
    padding-right: 30px
    padding-left: 8px
    @media ($media_md)
      padding-right: 15px
      padding-left: 15px
  &__img-box
    flex-shrink: 0
    width: 209px
    height: 302px
    margin-right: 8px
    @media ($media_md)
      position: absolute
      top: 50%
      right: 0
      z-index: 0
      width: 100%
      height: 100%
      margin-right: 0
      opacity: 0.05
      transform: translateY(-50%)
  &__img
    width: 100%
    height: 100%
    object-fit: contain
    @media ($media_md)
      object-fit: cover
  &__content
    position: relative
    display: flex
    flex-direction: column
    justify-content: space-between
  &__text-box
    padding-top: 18px
    padding-bottom: 18px
    font-weight: 400
    font-size: 18px
    line-height: 1.6
    @media ($media_md)
      padding-top: 12px
      padding-bottom: 12px
      font-size: 16px
  &__teacher-info
    display: flex
    align-items: center
    justify-content: flex-end
    padding-top: 10px
    padding-bottom: 20px
    line-height: 1.5
    text-align: right
    @media ($media_md)
      padding-bottom: 10px
  &__teacher-text
    display: flex
    flex-direction: column
    padding-right: 16px
  &__teacher-title
    font-weight: 200
    font-size: 16px
    @media ($media_md)
      font-size: 14px
  &__teacher-name
    font-weight: 700
    font-size: 18px
    @media ($media_md)
      font-size: 16px
  &__avatar-wrapper
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    width: 70px
    height: 70px
    border-radius: 50%
  &__teacher-image
    width: 100%
    height: 100%
    object-fit: cover
  &__price-wrapper
    position: relative
    display: flex
    align-items: center
    justify-content: space-between
    padding: 10px 30px 8px
    @media ($media_md)
      padding-right: 15px
      padding-left: 15px
  &__price-title
    margin-right: 10px
    font-weight: 700
    font-size: 18px
    @media ($media_md)
      font-size: 16px
  &__price-block
    display: flex
    flex-direction: column
    align-items: flex-end
    line-height: 1
  &__price-box--old
    font-size: 20px
    color: #c4c4c4
    @media ($media_md)
      font-size: 16px
  &__price-box--new
    font-weight: 200
    font-size: 40px
    background-color: #be1c21
    background-image: linear-gradient(0deg, #dc3337 0%, #be1c21 100%)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
    background-clip: text
    text-fill-color: transparent
    @media ($media_md)
      font-size: 36px
  &__old-price
    position: relative
    display: inline-block
    font-weight: 600
  &__old-price::after
    content: ""
    position: absolute
    top: 0.3em
    left: 0
    width: 100%
    height: 1px
    background-color: #c4c4c4
  &__old-currency
    font-weight: 400
    font-size: 0.6em
  &__new-currency
    margin-left: 0.2em
    font-size: 0.5em
</style>
