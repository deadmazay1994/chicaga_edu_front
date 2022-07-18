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
          <div class="header__avatar">
            <router-link class="header__avatar-link" to="/lk/settings">
              <img
                :src="user.avatar_link"
                alt="Ваше фото"
                class="header__avatar-img"
              />
            </router-link>
          </div>
          <div class="header__additional-menu">
            <button class="header__additional-btn" type="button">
              <svg class="header__additional-icon" width="20" height="20">
                <use xlink:href="#arrow-down"></use>
              </svg>
              <span class="sr-only">
                Вызвать меню профиля
              </span>
            </button>
            <div class="header__profile-menu header__profile-menu--active">
              <button class="header__profile-btn">
                <svg class="header__profile-icon" width="24" height="24">
                  <use xlink:href="#messages"></use>
                </svg>
                <span class="header__profile-text">
                  Связаться с куратором
                </span>
                <svg class="header__profile-icon" width="24" height="24">
                  <use xlink:href="#arrow-right"></use>
                </svg>
              </button>
              <button class="header__profile-btn">
                <svg class="header__profile-icon" width="24" height="24">
                  <use xlink:href="#user-square"></use>
                </svg>
                <span class="header__profile-text">
                  Связаться с преподавателем
                </span>
                <svg class="header__profile-icon" width="24" height="24">
                  <use xlink:href="#arrow-right"></use>
                </svg>
              </button>
              <button class="header__profile-btn">
                <svg class="header__profile-icon" width="24" height="24">
                  <use xlink:href="#settings"></use>
                </svg>
                <span class="header__profile-text">
                  Настройки
                </span>
              </button>
              <button class="header__profile-btn">
                <svg class="header__profile-icon" width="24" height="24">
                  <use xlink:href="#logout"></use>
                </svg>
                <span class="header__profile-text">
                  Выход
                </span>
              </button>
            </div>
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

export default {
  name: "header-app",
  components: {
    AnimatedCoinPng
  },
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["toggleDraver"]),
    showSignIn() {
      this.$store.commit("showSignIn");
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
.header
  position: relative
  padding: 10px 32px
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
    height: 100%
  &__part
    width: calc( (100% / 3) - 10px )
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
  &__coin-box .animated-svg-wrapper
    width: 30px
    height: 30px
    margin-right: 8px
  &__coin-text
    color: #0D0D0D
    font-size: 14px
  &__progress-box
    order: -1
    flex-grow: 1
    margin-right: 24px
  &__avatar
    flex-shrink: 0
    width: 80px
    height: 50px
    border-radius: 100px
    border: 1px solid #F4F4F4
    overflow: hidden
  &__avatar-link
    display: block
    width: 100%
    height: 100%
  &__avatar-img
    img
      width: 100%
      height: 100%
      object-fit: cover
  &__additional-btn
    display: flex
    margin-left: 10px
    padding: 10px
    color: #808080
    outline-width: 0
    transition-property: color
    transition-duration: 0.3s
  &__additional-icon
    width: 20px
    height: 20px
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
    display: flex
    flex-direction: column
    padding: 12px 26px
    font-weight: 400
    font-size: 12px
    line-height: 16px
    background-color: #ffffff
    border-bottom-right-radius: 30px
    border-bottom-left-radius: 30px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    transform: translateY(-100%)
    z-index: 1
    transition-property: transform, top
    transition-duration: 0.3s
    transition-timing-function: ease-in-out
  &__profile-menu--active
    top: 100%
    transform: translateY(0)
  &__profile-btn
    display: flex
    align-items: center
    padding: 12px 6px
    color: #23262f
    text-align: left
    border-radius: 10px
    outline-width: 0
    transition-property: color, fill, stroke
    transition-duration: 0.3s
  &__profile-btn:focus-visible,
  &__profile-btn:hover
    color: #ff0000
  &__profile-btn:active
    color: #ca2e23
    transition-duration: 0.1s
  &__profile-icon
    flex-shrink: 0
    width: 24px
    height: 24px
  &__profile-icon:first-child
    margin-right: 8px
  &__profile-icon:last-child
    margin-left: 8px
  &__profile-text
    flex-grow: 1
</style>
