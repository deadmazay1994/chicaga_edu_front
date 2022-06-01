<template>
  <div class="g-button g-button--with-arrow vue-component">
    <button class="g-button__btn">
      <span class="g-button__text">
        Добавить в корзину
      </span>
    </button>
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
.g-button
  display: inline-block
  border-radius: 10px
  &__btn
    flex-grow: 1
    width: 100%
    height: 100%
    margin: 0
    padding: 15px 32px
    font-weight: 700
    font-size: 14px
    line-height: 16px
    color: #ffffff
    background-color: #ff0000
    border: none
    border-radius: inherit
  &--with-arrow &__btn
    padding-right: 24px
    padding-left: 24px
  &__text
    display: inline-block
  &--with-arrow &__text
    padding-right: 44px
    background-image: url(~@/assets/imgs/icons/arrow-long.svg)
    background-position: right center
    background-size: 34px 11px
    background-repeat: no-repeat
</style>
