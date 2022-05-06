<template>
  <div class="mobile-menu">
    <div class="menu-btn" @click.prevent="openBurgerMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <logo />
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

  @media (max-width: 900px)
    display: flex
    align-items: center
    justify-content: space-between

.menu-btn
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

  span
    display: block
    width: 16px
    height: 2px
    margin-bottom: 3px
    position: relative
    background: #000
    border-radius: 3px
    z-index: 1
</style>
