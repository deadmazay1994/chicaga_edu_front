<template>
  <div class="checkbox vue-component">
    <input :value="state" type="checkbox" style="display: none" />
    {{ error }}
    <div class="checkbox__btn" @click="toggle" :class="checkboxClass"></div>
  </div>
</template>

<script>
export default {
  name: "checkbox",
  data: function() {
    return {
      state: false
    };
  },
  methods: {
    toggle() {
      this.state = !this.state;
    },
    getState() {
      return this.state;
    }
  },
  computed: {
    checkboxClass() {
      return {
        "checkbox__btn--active":
          this.state &&
          (this.error === null ||
            this.error === undefined ||
            this.error === ""),
        "checkbox__btn--success": this.state && this.error == "correct",
        "checkbox__btn--error": this.state && this.error == "uncorrect"
      };
    }
  },
  components: {},
  props: ["error"],
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
