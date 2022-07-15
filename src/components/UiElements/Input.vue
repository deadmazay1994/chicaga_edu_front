<template>
  <input
    class="g-input vue-component"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :aria-label="ariaLabel"
    :maxlength="maxlength"
    :required="required"
    v-model="inputValue"
  />
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
    value: String
  },
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.g-input
  margin: 0
  padding: 5.5px 13.5px
  font-weight: 500
  font-size: 12px
  line-height: 14px
  text-overflow: ellipsis
  color: #0d0d0d
  background-color: #ffffff
  border: 1.5px solid rgba(255, 0, 0, 0.4)
  border-radius: 5px
  outline-width: 0
  transition: border-color 0.3s
  &:focus
    border-color: rgba(255, 0, 0, 0.6)
  &::placeholder
    color: rgba(128, 128, 128, 0.6)
</style>
