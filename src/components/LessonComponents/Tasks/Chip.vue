<template>
  <div
    class="chip"
    :class="['chip--' + state, { empty: !checkText }, { selected: selected }]"
    @click="clickElem"
  >
    <span class="text" v-if="checkText">
      {{ text }}
    </span>
    <span
      class="empty"
      v-else
      ref="empty"
      :style="{ width: randomWidth + 'px' }"
    >
      {{ emptyString }}
    </span>
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
    selected: Boolean
  },
  computed: {
    checkText() {
      return !!this.text;
    },
    randomWidth() {
      let random = Math.floor(Math.random() * (25 - 5)) + 10;
      return this.width + random;
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
  cursor: pointer
  box-sizing: border-box

  .text
    font-family: "sf-ui", sans-serif
    font-size: 16px
    font-weight: 500
    line-height: 20px
    background: linear-gradient(0deg, #303030, #303030), linear-gradient(0deg, #484A65, #484A65), linear-gradient(0deg, #000000, #000000), linear-gradient(0deg, #FFFFFF, #FFFFFF)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent

  .empty
    display: inline-block

  &--default
    border-color: #C4C4C4
    background-color: #FFFFFF
    box-shadow: 0px 1.5px 0px 0px #C4C4C4
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
    box-shadow: 0px 1.5px 0px 0px #E6E6E6
    .text
      opacity: 0

  &.empty
    box-shadow: none

  &.selected
    border-color: #99CBFF
    box-shadow: 0px 0px 6px 0px #99CBFF
</style>
