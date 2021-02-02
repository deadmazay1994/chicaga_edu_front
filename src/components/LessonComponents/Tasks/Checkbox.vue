<template>
  <div class="checkbox vue-component">
    <div
      class="checkbox__btn"
      :click="checked"
      @click="change"
      :class="checkboxClass"
    ></div>
  </div>
</template>

<script>
export default {
  name: "checkbox",
  data: function() {
    return {
      valueData: false
    };
  },
  methods: {
    change() {
      if (!this.disabled) {
        this.valueData = !this.valueData;
        this.$emit("change", this.valueData);
      }
    }
  },
  computed: {
    checkboxClass() {
      return {
        "checkbox__btn--success": this.checked && this.status === true,
        "checkbox__btn--error": this.checked && this.status === false,
        "checkbox__btn--active":
          this.checked &&
          (this.status === null ||
            this.status === undefined ||
            this.status === "")
      };
    }
  },
  components: {},
  model: {
    prop: "checked",
    event: "change"
  },
  props: ["status", "disabled", "checked"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.checkbox
  &__btn
    width: 20px
    cursor: pointer
    height: 20px
    border-radius: 100%
    background: #fff
    border: 2px #bebebe solid
    &:before
      content: ""
      display: block
      width: 10px
      height: 10px
      top: calc(50% - 5px)
      left: calc(50% - 5px)
      position: absolute
      border-radius: 100%
    &--active
      position: relative
      &:before
        background: #BEBEBE
    &--success
      border: 2px solid #B7E59B
      &:before
        background: #B7E59B
    &--error
      border: 2px solid #FF8181
      &:before
        background: #FF8181
</style>
