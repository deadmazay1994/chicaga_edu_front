<template>
  <div class="checkbox vue-component">
    <input :value="state" type="checkbox" style="display: none" />
    <div class="checkbox__btn" @click="toggle" :class="checkboxClass"></div>
  </div>
</template>

<script>
export default {
  name: "checkbox",
  data: function() {
    return {
      state: false,
      error: null
    };
  },
  methods: {
    toggle() {
      this.state = !this.state;
    }
  },
  computed: {
    checkboxClass() {
      return {
        "checkbox__btn--active": this.state && this.error !== null,
        "checkbox__btn--error": this.state && this.error !== true,
        "checkbox__btn--success": this.state && this.error !== false
      };
    }
  },
  components: {},
  props: [],
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
    &--active
      background: #D3AD72
    &--success
      background: #B7E59B
      border: 2px solid #C3CBCD
    &--error
      background: #FF8181
</style>
