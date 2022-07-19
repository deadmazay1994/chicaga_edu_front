<template>
  <div class="demo-note vue-component">
    <div class="demo-note__inner">
      <div class="demo-note__text">
        <button
          class="demo-note__close"
          type="button"
          @click="$emit('closeNote')"
        >
          <svg class="demo-note__close-icon" width="15" height="15">
            <use xlink:href="#close-red"></use>
          </svg>
          <div class="sr-only">
            Закрыть
          </div>
        </button>
        <p>
          Сейчас на&nbsp;платформе курсы для уровней от&nbsp;Beginner
          до&nbsp;Intermediate.
        </p>
        <p>
          Курсы для уровней
          <b>Intermediate Plus, Upper-Intermediate и&nbsp;Advanced</b>
          в&nbsp;процессе подготовки.
        </p>
        <p>
          Их&nbsp;можно пройти у&nbsp;нас в&nbsp;другом формате:
        </p>
        <ol>
          <li>
            Онлайн: в&nbsp;мини-группе от&nbsp;2 до&nbsp;6 человек или
            индивидуально
          </li>
          <li>
            В&nbsp;8 наших школах в&nbsp;Петербурге: в&nbsp;группе или
            индивидуально
          </li>
        </ol>
        <p>
          Нажмите на&nbsp;кнопку «ЗАКАЗАТЬ ЗВОНОК».
        </p>
        <p>
          Мы&nbsp;позвоним и&nbsp;расскажем об&nbsp;этих вариантах.
        </p>
      </div>
      <div class="demo-note__footer">
        <demo-btn-w class="demo-note__btn" @click.native="noticeIsOpen = true">
          Заказать звонок
        </demo-btn-w>
      </div>
    </div>
    <demo-notice
      v-if="noticeIsOpen"
      class="demo-note__notice demo-note__notice--open"
      @closeNotice="noticeIsOpen = false"
    />
  </div>
</template>

<script>
import DemoBtnW from "./DemoBtnW.vue";
import DemoNotice from "./DemoNotice.vue";
export default {
  name: "demo-note",
  components: {
    DemoBtnW,
    DemoNotice
  },
  data: function() {
    return {
      noticeIsOpen: false
    };
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.demo-note
  position: relative
  display: flex
  font-size: 14px
  &__inner
    position: relative
    margin-bottom: 20px
    padding: 20px
    background-color: #f8f8f8
    border-radius: 10px
    filter: drop-shadow(0px 4px 20px rgba(128, 128, 128, 0.2))
  &__inner::before
    content: ""
    position: absolute
    top: calc( 100% - 1px )
    right: calc( 50% - ( 70px / 2 ) )
    width: 70px
    height: 18px
    background-image: url("data:image/svg+xml,%3Csvg width='70' height='18' viewBox='0 0 70 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.000198443 0.499802C8.88587e-05 0.776022 0.223979 1 0.500198 1H9.46397C11.7065 1 13.8761 1.79664 15.5858 3.24783L30.0292 15.5073C33.7616 18.6754 39.239 18.6754 42.9715 15.5073L58.0284 2.727C59.3419 1.61206 61.0088 1 62.7318 1H69.5C69.7761 1 70 0.776142 70 0.5C70 0.223858 69.7761 0 69.5 0L0.500201 0C0.224136 0 0.000307966 0.223736 0.000198443 0.499802Z' fill='%23F8F8F8'/%3E%3C/svg%3E%0A")
    background-size: contain
    background-position: center
  &__text > *:not(:last-child)
    margin-bottom: 0.3em
  &__text ol
    padding-left: 20px
  &__text
    line-height: 1.3
  &__footer
    padding-top: 16px
  &__btn
    display: block
    margin-right: auto
    margin-left: auto
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
  &__notice
    position: absolute
    top: 0
    right: 58%
    width: 435px
    opacity: 0
    z-index: -1
    transition-property: opacity, z-index
    transition-duration: 0.2s, 0s
    transition-delay: 0s, 0.2s
    pointer-events: none
  &__notice--open
    opacity: 1
    z-index: 1
    transition-delay: 0s
    pointer-events: auto
</style>
