<template>
  <span class="chip-input" @click="clickElement">
    <chip
      :text="text"
      :state="state"
      :selected="selected"
      :checkText="Boolean(text)"
    />
  </span>
</template>

<script>
import Chip from "./Index.vue";
export default {
  name: "ChipInput",
  components: {
    Chip
  },
  props: {
    state: {
      type: String
    },
    text: String,
    index: { required: false },
    selected: Boolean
  },
  methods: {
    clickElement() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="sass" scoped>
.chip-input
  display: inline-flex
  align-items: flex-end

  .chip-input__element
    margin-left: 10px
</style>
