<template>
  <div class="g-input vue-component">
    <input
      class="g-input__input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :maxlength="maxlength"
      :required="required"
      :style="{ padding: `${padding.y}px ${padding.x}px` }"
      v-model="inputValue"
    />
  </div>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    styleObject() {
      return {
        padding: `${this.padding.y} ${this.padding.x}`
      };
    }
  },
  components: {},
  props: {
    type: String,
    name: String,
    placeholder: String,
    ariaLabel: String,
    maxlength: Number,
    required: {
      type: Boolean,
      default: true
    },
    value: String,
    padding: {
      type: Object,
      default: () => {
        return { y: 5.5, x: 13.5 };
      }
    }
  },
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.g-input
  display: block
  &__input
    width: 100%
    margin: 0
    font-weight: 500
    font-size: 12px
    line-height: 14px
    text-overflow: ellipsis
    color: #0d0d0d
    background-color: #ffffff
    border: 1.5px solid rgba(255, 0, 0, 0.4)
    border-radius: 5px
    transition: border-color 0.3s
    &:focus
      border-color: rgba(255, 0, 0, 0.6)
  &__input::placeholder
    color: rgba(128, 128, 128, 0.6)
</style>
