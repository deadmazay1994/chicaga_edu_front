<template>
  <div class="mobile-menu">
    <div class="menu-btn" @click.prevent="openBurgerMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <logo class="mobile-menu__logo" />
  </div>
</template>

<script>
import Logo from "@/components/Icons/Logo";

export default {
  name: "MobileMenu",
  components: {
    Logo
  },
  methods: {
    openBurgerMenu() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"
 
.mobile-menu
  display: none
  background: #fff
  padding: 15px
  box-shadow: 0 4px 20px hsl(0deg 0% 50% / 20%)
  position: fixed
  top: 0
  left: 0
  width: 100%
  z-index: 9999
  @media ($media_lg2)
    display: flex
    align-items: center
    justify-content: space-between
  @media ($media_sm)
    padding-top: 10px
    padding-bottom: 10px
  &__logo
    @media ($media_sm)
      width: 150px
      height: 36px

.menu-btn
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  width: 36px
  height: 36px
  margin-right: 15px

  span
    display: block
    width: 22px
    height: 3px
    margin-bottom: 3.5px
    position: relative
    background: #323232
    border-radius: 3px
    z-index: 1
</style>
