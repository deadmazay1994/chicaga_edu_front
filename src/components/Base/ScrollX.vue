<template>
  <div class="scroll-x vue-component">
    <div class="scroll-x__slot" :style="'column-gap:' + gap + 'px'">
      <slot></slot>
    </div>
    <div class="scroll-x__btns">
      <button class="scroll-x__btn scroll-x__btn--left" type="button" disabled>
        <svg class="scroll-x__icon" width="12" height="14">
          <use xlink:href="#arrow-double"></use>
        </svg>
        <span class="sr-only">
          Назад
        </span>
      </button>
      <button class="scroll-x__btn scroll-x__btn--right" type="button">
        <svg class="scroll-x__icon" width="12" height="14">
          <use xlink:href="#arrow-double"></use>
        </svg>
        <span class="sr-only">
          Вперёд
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "scroll-x",
  components: {},
  data: function() {
    return {};
  },
  props: {
    gap: {
      type: String,
      default: "6"
    }
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.scroll-x
  display: flex
  flex-direction: column
  width: 100%
  &__slot
    display: flex
    width: 100%
    overflow: auto hidden
    @media ($media_lg2)
      order: 1
  & &__slot::-webkit-scrollbar
    width: 0
    height: 0
  &__btns
    display: flex
    justify-content: flex-end
    column-gap: 16px
    color: #909090
    @media ($media_lg2)
      column-gap: 8px
  &__btn
    display: flex
    align-items: center
    justify-content: center
    width: 26px
    height: 26px
    outline-offset: -1px
    transition-property: color
    transition-duration: 0.3s
  &__btn:focus-visible,
  &__btn:hover
    color: #ff0000
  &__btn:active
    color: #ca2e23
    transition-duration: 0.1s
  &__btn:disabled
    color: #ececec
    cursor: default
  &__icon
    width: 12px
    height: 14px
  &__btn--left &__icon
    transform: rotate(180deg)
</style>
