<template>
  <div
    class="sidebar-component"
    :class="{ 'sidebar-component--mobile-active': mobilemenuopen }"
  >
    <div class="sidebar-component__background"></div>
    <div class="sidebar-component__content">
      <div class="content__logo">
        <router-link to="/">
          <sidebar-logo />
          <logo />
        </router-link>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import SidebarLogo from "@/components/Icons/SidebarLogo.vue";
import Logo from "@/components/Icons/Logo.vue";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SidebarComponent",
  components: {
    SidebarLogo,
    Logo
  },
  data() {
    return {
      mobileDetected: false
    };
  },
  props: ["mobilemenuopen"],
  computed: {
    ...mapGetters(["draver"])
  },
  methods: {
    ...mapMutations(["setDraverState"]),
    toggleDraverByWindowSize() {
      if (window.innerWidth >= 1200) {
        this.mobileDetected = false;
        this.setDraverState(true);
      } else {
        this.mobileDetected = true;
        this.setDraverState(false);
      }
    }
  },
  created() {
    document.onresize = () => {
      this.toggleDraverByWindowSize();
    };
  },
  beforeMount() {
    this.toggleDraverByWindowSize();
  }
};
</script>

<style lang="sass" scoped>
.sidebar-component
  position: fixed
  top: 0
  left: 0
  background-image: linear-gradient(rgba(196, 196, 196, 0.113), rgba(196, 196, 196, 0.113)), url("~@/assets/imgs/sidebar-bg.png")
  background-size: auto, cover
  height: 100%
  width: 87px
  transition: all .25s ease-in-out

  &__background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-image: linear-gradient(rgba(196, 196, 196, 0.113), rgba(196, 196, 196, 0.113)), url("~@/assets/imgs/sidebar-bg.png")
    background-size: auto, cover
    -webkit-filter: blur(2.5px)
    -moz-filter: blur(2.5px)
    -o-filter: blur(2.5px)
    -ms-filter: blur(2.5px)
    filter: blur(2.5px)
    z-index: 1

  &__content
    position: relative
    z-index: 2
    display: flex
    align-items: center
    flex-direction: column

  .logo
    display: none

@media (max-width: 800px)
  .sidebar-component
    position: fixed
    transform: translateX(-120%)
    top: 80px
    z-index: 9998

    &--mobile-active
      transform: translateX(0)
</style>
