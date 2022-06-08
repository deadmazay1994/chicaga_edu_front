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
        <div class="header__controls">
          <div class="header__coin-box">
            <animated-coin-png ref="animatedCoin" />
            <span class="header__coin-text">{{ points.coins }}</span>
          </div>
          <div class="header__progress-box">
            <progress-bar bar-class="bg-info" :numbers="33" :value="4" />
          </div>
          <div class="header__avatar">
            <router-link class="header__avatar-link" to="/lk/settings">
              <img class="header__avatar-img" :src="user.avatar_link" alt="Ваше фото" />
            </router-link>
          </div>
          <div class="header__additional-menu">
            <div class="header__profile-menu">
              <button class="header__profile-btn">Личные данные</button>
              <button>Выйти</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// import DictAdd from "@/components/Lk/DictAdd";
import ProgressBar from "@/components/Lk/ProgressBar";

import { mapGetters, mapMutations } from "vuex";

import AnimatedCoinPng from "@/components/Icons/AnimatedCoinPng";

export default {
  name: "header-app",
  components: {
    AnimatedCoinPng,
    ProgressBar
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
  padding: 10px 20px
  &__inner
    display: flex
    align-items: center
    justify-content: space-between
    height: 100%
  &__part
    width: 50%
  &__part--2
    padding-left: 20px
  &__title-block
    display: flex
    align-items: center
    word-break: break-all
  &__controls
    display: flex
    align-items: center
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
    width: 56px
    height: 56px
    border-radius: 50%
    border: 1px solid #F4F4F4
    overflow: hidden
  &__avatar-link
    display: block
    width: 100%
    height: 100%
  &__avatar-img
    width: 100%
    height: 100%
    object-fit: cover
  &__additional-menu
    position: relative
    padding: 10px
  &__profile-menu
    position: absolute
    bottom: -110px
    right: 0
    width: 200px
    padding: 15px
    font-weight: 500
    font-size: 12px
    line-height: 1
    background-color: #ffffff
    border-radius: 15px
    box-shadow: 0 4px 15px hsla(0, 0%, 50%, .2)
    opacity: 0
    transition: opacity 0.3s
    z-index: -1
  &__profile-menu button
    display: block
    width: 100%
    font: inherit
    color: #000
    text-align: left
  &__profile-menu.active
    opacity: 1
    z-index: 2
  &__profile-btn
    padding-bottom: 15px
    margin-bottom: 15px
    border-bottom: 1.5px solid hsla(0, 0%, 50%, .1)
</style>
