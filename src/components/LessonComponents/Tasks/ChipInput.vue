<template>
  <div class="chip-input">
    <span class="chip-input__text">{{ newSentence }}</span>
    <div
      class="chip-input__element"
      ref="input"
      v-if="inSquareSentence !== ''"
      @click="clickElement"
    >
      <chip :width="25" :text="text" :state="state" :selected="selected" />
    </div>
  </div>
</template>

<script>
import Chip from "./Chip.vue";
import { EventBus } from "../../../main";

export default {
  name: "ChipInput",
  components: {
    Chip
  },
  data() {
    return {
      newSentence: "",
      inSquareSentence: ""
    };
  },
  props: {
    state: {
      type: String
    },
    text: String,
    sentence: { required: true },
    index: { required: false },
    selected: Boolean
  },
  methods: {
    select() {
      EventBus.$emit("clicked");
    },
    clickElement() {
      this.$emit("clickElement");
    }
  },
  beforeMount() {
    if (this.sentence) {
      this.newSentence = this.sentence.replace(/\[(.*?)\]/g, "");
      this.inSquareSentence = this.sentence.match(/[^[\]]+(?=])/g)[0];
    }
  }
};
</script>

<style lang="sass" scoped>
.chip-input
  display: flex
  align-items: flex-end

  .chip-input__element
    margin-left: 10px
</style>
