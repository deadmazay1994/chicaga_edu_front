<template>
  <button class="demo-btn vue-component" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "demo-btn",
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
.demo-btn
  padding: 14px 28px
  font-weight: 700
  font-size: 16px
  color: #cc2d23
  background-color: transparent
  border: 1.5px solid #cc2d23
  border-radius: 16px
  outline-width: 0
  transition-property: color, background-color, border-color, box-shadow
  transition-duration: 0.3s, 0.3s, 0.3s, 0.1s
  transition-timing-function: ease-out
  &:focus-visible,
  &:hover
    color: #ffffff
    background-color: #ff0000
    border-color: #ff0000
  &:active
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25)
</style>
