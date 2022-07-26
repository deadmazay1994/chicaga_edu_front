<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__part header__part--1">
        <div class="header__title-block">
          <img src="@/assets/imgs/burger.svg" alt="" />
          <slot></slot>
        </div>
      </div>

      <div class="header__part header__part--2">
        <!-- сюда будут добавлены новые элементы -->
      </div>

      <div class="header__part header__part--3">
        <div class="header__controls">
          <div class="header__coin-box">
            <animated-coin-png ref="animatedCoin" />
            <span class="header__coin-text">{{ points.coins }}</span>
          </div>
          <user-cap
            class="header__user-cap"
            :src="user.avatar_link"
            :tariff="'standard'"
          />
          <div class="header__additional-menu" v-click-outside="onClickOutside">
            <button
              class="header__additional-btn"
              type="button"
              @click="showAddMenu = !showAddMenu"
            >
              <svg
                class="header__additional-icon"
                :class="{ 'header__additional-icon--active': showAddMenu }"
                width="20"
                height="20"
              >
                <use xlink:href="#arrow-down"></use>
              </svg>
              <span class="sr-only">
                Вызвать меню профиля
              </span>
            </button>
            <profile-menu
              class="header__profile-menu"
              :class="{ 'header__profile-menu--active': showAddMenu }"
            ></profile-menu>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// import DictAdd from "@/components/Lk/DictAdd";

import { mapGetters, mapMutations } from "vuex";

import AnimatedCoinPng from "@/components/Icons/AnimatedCoinPng";
import UserCap from "@/components/Lk/UserCap.vue";
import ProfileMenu from "@/components/Base/ProfileMenu.vue";

import vClickOutside from "v-click-outside";

export default {
  name: "header-app",
  components: {
    AnimatedCoinPng,
    UserCap,
    ProfileMenu
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data: function() {
    return {
      showAddMenu: false
    };
  },
  methods: {
    ...mapMutations(["toggleDraver", "logout"]),
    showSignIn() {
      this.$store.commit("showSignIn");
    },
    exit() {
      this.logout();
      this.$router.push("/auth/login");
      this.$store.commit("pushShuckbar", {
        val: "Вы вышли из личного кабинета",
        success: true
      });
    },
    onClickOutside() {
      this.showAddMenu = false;
    }
  },
  computed: {
    ...mapGetters(["user", "points"])
  },
  props: [],
  mixins: {},
  beforeMount() {},
  watch: {
    "points.coins": function() {
      this.$refs.animatedCoin.animate();
    }
  }
};
</script>

<!-- <style lang="sass"> -->
<style lang="sass" scoped="scoped">
@import "@/assets/styles/variables.sass"

.header
  position: relative
  padding: 10px 20px 10px 32px
  color: #0d0d0d
  @media ($media_lg2)
    padding: 5px 10px 5px 15px
  &::after
    content: ""
    position: absolute
    right: 0
    bottom: 0
    width: 100%
    height: 2px
    background-color: rgba(128, 128, 128, 0.2)
  &__inner
    display: flex
    align-items: center
    justify-content: space-between
    column-gap: 10px
    width: 100%
    height: 100%
  &__part--1
    @media ($media_xl)
      max-width: 60%
  &__part--2
    @media ($media_xl)
      display: none
  &__title-block
    display: flex
    align-items: center
    word-break: break-all
  &__controls
    display: flex
    align-items: center
    justify-content: flex-end
  &__coin-box
    display: flex
    align-items: center
    margin-right: 24px
    @media ($media_md)
      display: none
  &__coin-box .animated-svg-wrapper
    width: 30px
    height: 30px
    margin-right: 8px
  &__coin-text
    font-size: 14px
  &__progress-box
    order: -1
    flex-grow: 1
    margin-right: 24px
  &__user-cap
    flex-shrink: 0
  &__additional-menu
    margin-left: 22px
    @media ($media_lg2)
      margin-left: 10px
  &__additional-btn
    display: flex
    padding: 10px
    color: #808080
    outline-width: 0
    transition-property: color
    transition-duration: 0.3s
  &__additional-icon
    width: 20px
    height: 20px
    transition: 0.1s all ease-in-out
  &__additional-icon--active
    transform: rotate(180deg)
  &__additional-btn:focus-visible,
  &__additional-btn:hover
    color: #ff0000
  &__additional-btn:active
    color: #ca2e23
    transition-duration: 0.1s
  &__profile-menu
    position: absolute
    top: -24px
    right: 0
    z-index: 1
    transform: translateY(-100%)
    transition-property: transform, top
    transition-duration: 0.3s
    transition-timing-function: ease-in-out
  &__profile-menu--active
    top: 100%
    transform: translateY(0)
</style>
