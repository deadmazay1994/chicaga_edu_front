<template>
  <div
    class="chip chip"
    :class="[
      'chip--' + state,
      { 'chip--empty-answer': !checkText },
      { 'chip--selected': selected },
      { 'chip--part': positionClass },
      positionClass,
      borderSelectedClass
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
    checkText: Boolean,
    position: String,
    borderSelected: Boolean
  },
  computed: {
    positionClass() {
      if (this.position === "start") return "chip--part-first";
      if (this.position === "center") return "chip--part-center";
      if (this.position === "end") return "chip--part-last";
      return "";
    },
    borderSelectedClass() {
      if (this.borderSelected) return "chip--part-selected";
      return "";
    }
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
  box-sizing: border-box
  display: inline-block
  padding: 4px 16px
  font-weight: 500
  font-size: 16px
  line-height: 25px
  text-align: center
  color: #303030
  background-color: #FFFFFF
  border: 1.5px solid #C4C4C4
  border-radius: 22px
  box-shadow: 0px 1.5px 0px 0px #C4C4C4
  cursor: pointer
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
  &--success
    color: #8EDC51
    border-color: #8EDC51
    box-shadow: 0px 1.5px 0px 0px #8EDC51
    background-image: linear-gradient(0deg, rgba(142, 220, 81, 0.1), rgba(142, 220, 81, 0.1))
  &--error
    color: #E94A45
    border-color: #E94A45
    box-shadow: 0px 1.5px 0px 0px #E94A45
    background-image: linear-gradient(0deg, rgba(233, 74, 69, 0.1), rgba(233, 74, 69, 0.1))
  &--empty
    background-color: #E6E6E6
    border-color: #E6E6E6
    box-shadow: none
    pointer-events: none
  &--empty-answer
    box-shadow: none
  &--selected
    border-color: #99CBFF
    box-shadow: 0px 0px 6px 0px #99CBFF
  &--part-selected
    font-weight: 700

  &--empty &__text
    opacity: 0

  &__empty
    display: inline-block
    width: 50px
</style>
