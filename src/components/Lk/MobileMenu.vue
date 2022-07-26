<template>
  <div class="mobile-menu">
    <div class="mobile-menu__logo-box">
      <img
        class="mobile-menu__logo"
        src="~@/assets/imgs/logo-online.svg"
        width="149"
        height="26"
        alt="Логотип"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileMenu",
  components: {},
  methods: {}
};
</script>

<style lang="sass" scoped>

.mobile-menu
  position: relative
  display: flex
  align-items: center
  justify-content: space-between
  background-color: #ffffff
  box-shadow: 0 4px 20px rgba(128, 128, 128, 0.1)
  &::before
    content: ""
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 1px
    background-color: #e3e3e3
  &__logo-box
    display: flex
    padding: 12px 10px
  &__logo
    width: 149px
    height: 26px
</style>
