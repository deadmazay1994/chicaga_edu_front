<template>
  <div class="g-input vue-component">
    <input class="g-input__input" type="text" placeholder="Соловьева Ульяна" aria-label="Поле для ввода вашего имени">
  </div>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
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
    padding: 5.5px 13.5px
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
