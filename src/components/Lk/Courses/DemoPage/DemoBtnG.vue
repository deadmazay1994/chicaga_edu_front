<template>
  <button class="demo-btn-g vue-component" type="button">
    <span class="demo-btn-g__text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "demo-btn-g",
  components: {},
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">

.demo-btn-g
  position: relative
  padding: 18px 28px
  font-weight: 700
  font-size: 16px
  color: #ffffff
  background-color: #ff787c
  border-radius: 16px
  outline-width: 0
  box-shadow: 0 2px 0 #cc2d23
  transition-property: box-shadow
  transition-duration: 0.2s
  transition-timing-function: ease-out
  overflow: hidden
  &::before,
  &::after
    content: ""
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    opacity: 0
    transition-property: opacity, box-shadow
    transition-duration: 0.2s
    transition-timing-function: ease-out
  &::before
    background-image: linear-gradient(180deg, #ff787d 0%, #ff161e 100%)
  &::after
    background-image: linear-gradient(180deg, #ff161e 0%, #ff787d 100%)
  &:focus-visible::before,
  &:hover::before
    opacity: 1
  &:active
    box-shadow: 0 0 0 transparent
  &:active::after
    opacity: 1
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25)
  &__text
    position: relative
    z-index: 3
</style>
