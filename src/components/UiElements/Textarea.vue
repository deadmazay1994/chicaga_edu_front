<template>
  <div class="g-textarea vue-component">
    <textarea
      class="g-textarea__textarea"
      name="Комментарий"
      aria-label="Поле для ввода вашего комментария"
    ></textarea>
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
.g-textarea
  display: flex
  &__textarea
    width: 100%
    height: 93px
    padding: 5.5px 13.5px
    font-weight: 500
    font-size: 12px
    line-height: 14px
    color: #0d0d0d
    background-color: #ffffff
    border: 1.5px solid rgba(255, 0, 0, 0.4)
    border-radius: 5px
    transition: border-color 0.3s
    resize: none
    &:focus
      border-color: rgba(255, 0, 0, 0.6)
  &__textarea::placeholder
    color: rgba(128, 128, 128, 0.6)
</style>
