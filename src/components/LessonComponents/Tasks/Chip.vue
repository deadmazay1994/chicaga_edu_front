<template>
  <div
    class="chip"
    :class="[
      'chip--' + state,
      { 'chip--empty-answer': !checkText },
      { 'chip--selected': selected }
    ]"
    @click="click"
  >
    <span class="chip__text" v-if="checkText">
      {{ text }}
    </span>
    <span class="chip__empty" v-else ref="empty"> </span>
  </div>
</template>

<script>
export default {
  name: "Chip",
  props: {
    state: {
      type: String,
      default: "default"
    },
    text: {
      type: String
    },
    width: {
      type: Number,
      default: 100
    },
    selected: Boolean,
    checkText: Boolean
  },
  methods: {
    click() {
      this.$emit("click");
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
  cursor: pointer
  box-sizing: border-box

  .chip__text
    font-family: Manrope, sans-serif
    font-size: 16px
    font-weight: 500
    line-height: 20px
    background: linear-gradient(0deg, #303030, #303030), linear-gradient(0deg, #484A65, #484A65), linear-gradient(0deg, #000000, #000000), linear-gradient(0deg, #FFFFFF, #FFFFFF)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent

  .chip__empty
    display: inline-block
    width: 50px

  &--default
    border-color: #C4C4C4
    background-color: #FFFFFF
    box-shadow: 0px 1.5px 0px 0px #C4C4C4
  &--part
    line-height: 24px
    .chip__text
      font-size: 20px
      line-height: 20px
      background: transparent
      -webkit-text-fill-color: inherit
  &--part:not(:last-child)
    margin-right: 2px
  &--part-first
    padding-right: 2px
    border-top-right-radius: 0
    border-bottom-right-radius: 0
  &--part-center
    padding-right: 2px
    padding-left: 2px
    border-radius: 0
  &--part-last
    padding-left: 2px
    border-bottom-left-radius: 0
    border-top-left-radius: 0
  &--part-selected
    border-color: #404040
    box-shadow: 0px 1.5px 0px #404040
    .chip__text
      font-weight: 800
  &--success
    color: #8EDC51
    border-color: #8EDC51
    box-shadow: 0px 1.5px 0px 0px #8EDC51
    background: linear-gradient(0deg, rgba(142, 220, 81, 0.1), rgba(142, 220, 81, 0.1)), #FFFFFF
  &--error
    color: #E94A45
    border-color: #E94A45
    box-shadow: 0px 1.5px 0px 0px #E94A45
    background: linear-gradient(0deg, rgba(233, 74, 69, 0.1), rgba(233, 74, 69, 0.1)), #FFFFFF
  &--empty
    border-color: #E6E6E6
    background: #E6E6E6
    box-shadow: none
    .chip__text
      opacity: 0
  &--empty-answer
    box-shadow: none
  &--selected
    border-color: #99CBFF
    box-shadow: 0px 0px 6px 0px #99CBFF
</style>
