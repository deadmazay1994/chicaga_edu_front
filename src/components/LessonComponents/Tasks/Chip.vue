<template>
  <div class="chip" :class="'chip--' + state" @click="clickElem">
    <slot name="word"></slot>
  </div>
</template>

<script>
export default {
  name: "Chip",
  props: {
    state: {
      type: String,
      default: "default"
    }
  },
  methods: {
    clickElem() {
      this.$emit("clickElem");
    }
  }
};
</script>

<style lang="sass" scoped>
.chip
  display: inline-block
  padding: 0 12px
  border-radius: 15px
  border: 1.5px solid #C4C4C4
  font-family: sf-ui, sans-serif
  font-size: 16px
  font-weight: 500
  background: linear-gradient(0deg, #303030, #303030), linear-gradient(0deg, #484A65, #484A65), linear-gradient(0deg, #000000, #000000), linear-gradient(0deg, #FFFFFF, #FFFFFF)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  cursor: pointer

  &--default
    border-color: #C4C4C4
    background-color: #FFFFFF
    box-shadow: 0px 1.5px 0px 0px #C4C4C4
  &--success
    color: #8EDC511A
    border-color: #8EDC51
    box-shadow: 0px 1.5px 0px 0px #8EDC51
    background: linear-gradient(0deg, rgba(142, 220, 81, 0.1), rgba(142, 220, 81, 0.1)), #FFFFFF
  &--error
    color: #E94A45
    border-color: #E94A45
    box-shadow: 0px 1.5px 0px 0px #E94A45
    background: linear-gradient(0deg, rgba(233, 74, 69, 0.1), rgba(233, 74, 69, 0.1)), #FFFFFF
</style>
