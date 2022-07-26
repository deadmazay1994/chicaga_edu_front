<template>
  <div class="mobile-menu">
    <div class="mobile-menu__inner">
      <div class="mobile-menu__logo-box">
        <img
          class="mobile-menu__logo"
          src="~@/assets/imgs/logo-online.svg"
          width="149"
          height="26"
          alt="Логотип"
        />
      </div>
      <div class="mobile-menu__btns-box">
        <button
          class="mobile-menu__btn"
          type="button"
          @click="showAddMenu = !showAddMenu"
        >
          <svg class="mobile-menu__icon" width="24" height="24">
            <use xlink:href="#settings-icon-2"></use>
          </svg>
          <span class="sr-only">
            Настройки
          </span>
        </button>
      </div>
    </div>
    <profile-menu
      class="mobile-menu__profile-menu"
      :class="{ 'mobile-menu__profile-menu--active': showAddMenu }"
    ></profile-menu>
  </div>
</template>

<script>
import ProfileMenu from "../Base/ProfileMenu.vue";

export default {
  name: "MobileMenu",
  components: { ProfileMenu },
  data: function() {
    return {
      showAddMenu: false
    };
  },
  methods: {
    onClickOutside() {
      this.showAddMenu = false;
    }
  }
};
</script>

<style lang="sass" scoped>

.mobile-menu
  &__inner
    position: relative
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    height: 100%
    padding-right: 10px
    padding-left: 10px
    background-color: #ffffff
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.1)
  &__inner::before
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
  &__btn
    width: 50px
    height: 50px
  &__icon
    color: #292d32
  &__profile-menu
    position: absolute
    top: -24px
    right: 10px
    z-index: -1
    width: 256px
    transform: translateY(-100%)
    transition-property: transform, top
    transition-duration: 0.3s
    transition-timing-function: ease-in-out
  &__profile-menu--active
    top: 100%
    transform: translateY(0)
</style>
