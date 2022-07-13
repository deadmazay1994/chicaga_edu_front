<template>
  <button class="demo-btn-w vue-component" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "demo-btn-w",
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
.demo-btn-w
  padding: 16px 32px
  font-weight: 700
  text-transform: uppercase
  color: #cc2d23
  background-color: #ffffff
  outline: 2px solid transparent
  outline-offset: -2px
  border-radius: 10px
  box-shadow: 0 3px 0 #dcdcdc
  transition-property: outline-color, box-shadow
  transition-duration: 0.2s
  transition-timing-function: ease-in-out
  &:focus-visible,
  &:hover
    // color: #ffffff
    // background-color: #ff0000
    outline-color: #cc2d23
  &:active
    transition-duration: 0.1s
    outline-color: transparent
    box-shadow: inset 0 3px 0 #dcdcdc
</style>
