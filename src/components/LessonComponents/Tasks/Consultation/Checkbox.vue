<template>
  <div
    class="checkbox-consultation vue-component"
    :click="checked"
    @click="Do('change')"
  >
    <div class="option" :class="selectClass()">
      <div class="option__text">
        <slot></slot>
      </div>
      <checkbox
        class="option__checkbox checkbox"
        :disabled="true"
        :status="status"
        v-model="selected"
        ref="checkbox"
      />
    </div>
  </div>
</template>

<script>
import Checkbox from "./../Checkbox";

export default {
  name: "checkbox-consultation",
  data: function() {
    return {
      selected: false
    };
  },
  methods: {
    selectClass() {
      return {
        "option--correct": this.status === true,
        "option--uncorrect": this.status === false
      };
    },
    change() {
      this.selected = !this.selected;
      this.$emit("change", this.selected);
    },
    unset() {
      this.selected = false;
      this.$emit("change", this.selected);
    }
  },
  model: {
    prop: "checked",
    event: "change"
  },
  computed: {},
  components: {
    Checkbox
  },
  props: ["text", "checked", "status"],
  mixins: {},
  beforeMount() {
    let uniqComponent = true;
    this.onDo("change", uniqComponent);
  }
};
</script>

<style scoped="scoped" lang="sass">
.option
  background: transparent
  background-position: -2px
  background-image: url("/imgs/tasksBgs/change.png")
  background-size: 100% 100%
  background-repeat: no-repeat
  position: relative
  &__text
    font-weight: bold
    font-size: 20px
    line-height: 26px
    display: flex
    align-items: center
    justify-content: center
    color: #555555
    min-height: 80px
    text-align: center
    padding: 10px
  &__checkbox
    position: absolute
    bottom: -7px
    left: calc(50% - 12px)
  &--correct
    background-image: url("/imgs/tasksBgs/change--success.png")
  &--uncorrect
    background-image: url("/imgs/tasksBgs/change--error.png")

@media (max-width:580px)
  .option
    border-radius:15px
    background-image: none
    background-color: #f0f0f0
    &--correct
      background-color: #b9e69c
    &--uncorrect
      background-color: #ff8383
    &__text
      text-align: left
      padding-left: 50px
      justify-content: flex-start
      margin-bottom: 4px
    &__checkbox
      bottom: calc(50% - 10px)
      left: 10px
</style>
