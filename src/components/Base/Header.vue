<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__part header__part--1">
        <div class="header__title-block">
          <img src="@/assets/imgs/burger.svg" alt="" />
          <!-- <breadcrumbs /> -->
          <breadcrumbs-component />
          <!-- <h2 class="header__title">Уроки с преподователем</h2> -->
        </div>
      </div>

      <div class="header__part header__part--2">
        <div class="header__controls">
          <div class="header__coin-box">
            <animated-coin-png ref="animatedCoin" />
            <span class="header__coin-text">{{ points.coins }}</span>
          </div>

          <!-- <div class="header__additional-menu header__additional-menu--right">
            <svg
              class="header__svg header__svg--clickable"
              id="choose-theme"
              viewBox="0 0 25 25"
            >
              <path
                class="choose-theme__path"
                d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25Z"
                fill="#808080"
                fill-opacity="0.6"
              />
              <path
                class="choose-theme__path"
                d="M18.4234 6.55522L15.8434 9.13521L12.3031 5.59487L5.85728 12.0406L9.39761 15.581L6.55522 18.4233L5.58398 19.3946L11.1125 24.9231C11.5682 24.9735 12.0311 25.0002 12.5002 25.0002C19.4038 25.0002 25.0002 19.4038 25.0002 12.5002C25.0002 12.0311 24.9735 11.5682 24.9231 11.1125L19.3946 5.58398L18.4234 6.55522Z"
                fill="#808080"
              />
              <path
                d="M12.4991 8.85557L13.3349 5.74736L12.4991 2.73438C9.99985 2.73438 7.50059 3.68779 5.59375 5.59468L7.18833 8.52769L9.92686 9.92773C10.5857 9.2688 11.4947 8.8602 12.4991 8.85557Z"
                fill="#2BD765"
              />
              <path
                d="M9.90996 15.0889L7.25723 16.7995L5.59375 19.4051C7.50059 21.312 9.99985 22.2654 12.4991 22.2654L13.1281 19.0973L12.4991 16.1787C11.4859 16.174 10.5702 15.7579 9.90996 15.0889Z"
                fill="#6CB1F8"
              />
              <path
                d="M8.85513 12.517C8.85513 12.5112 8.85552 12.5055 8.85557 12.4998L6.0978 11.9512L2.73438 12.4998C2.73438 14.999 3.68779 17.4982 5.59468 19.4051L9.91094 15.0888C9.2583 14.4275 8.85513 13.5195 8.85513 12.517Z"
                fill="#A6D4FD"
              />
              <path
                d="M9.92773 9.92778L5.59468 5.59473C3.68779 7.50156 2.73438 10.0008 2.73438 12.5H8.85557C8.8602 11.4957 9.2688 10.5867 9.92773 9.92778Z"
                fill="#27BF5A"
              />
              <path
                d="M16.1796 12.4998C16.1796 12.5055 16.18 12.5112 16.18 12.517C16.18 13.5283 15.7701 14.4438 15.1074 15.1065L16.99 17.7416L19.406 19.4051C21.3129 17.4982 22.2663 14.999 22.2663 12.4998L19.2878 11.9512L16.1796 12.4998Z"
                fill="#FB6B56"
              />
              <path
                d="M15.1067 15.1064C14.444 15.7691 13.5285 16.1791 12.5172 16.1791C12.5115 16.1791 12.5058 16.1787 12.5 16.1786V22.2653C14.9993 22.2653 17.4985 21.3119 19.4053 19.405L15.1067 15.1064Z"
                fill="#F42520"
              />
              <path
                d="M12.5172 8.85513C13.5197 8.85513 14.4278 9.2583 15.0891 9.91089L17.6097 8.20596L19.4053 5.59463C17.4985 3.68779 14.9993 2.73438 12.5 2.73438V8.85557C12.5058 8.85552 12.5115 8.85513 12.5172 8.85513Z"
                fill="#FFCE00"
              />
              <path
                d="M16.1797 12.5H22.2664C22.2664 10.0008 21.313 7.50156 19.4061 5.59473L15.0898 9.91099C15.7589 10.5712 16.175 11.4869 16.1797 12.5Z"
                fill="#FFA300"
              />
            </svg>

            <div class="profile__menu profile__menu--3">
              <p class="profile__menu-btn">Выберите цвет интерфейса:</p>

              <div class="color-inner">
                <div class="color color--purple"></div>
                <p class="color-name">Светлый пурпурно-серый/ Оксид красный</p>
              </div>

              <div class="color-inner">
                <div class="color color--orange"></div>
                <p class="color-name">Светло-золотистый/ Оранжевый Крайола</p>
              </div>

              <div class="color-inner">
                <div class="color color--purple2"></div>
                <p class="color-name">Сиена жженая/ Глубокий фиолетово-черный</p>
              </div>

              <div class="color-inner">
                <div class="color color--purple3"></div>
                <p class="color-name">Фиалковый/ Глубокий фиолетовый</p>
              </div>

              <div class="color-inner">
                <div class="color color--blue"></div>
                <p class="color-name">Небесный/ Глубокий синий</p>
              </div>
            </div>
          </div>

          <div class="header__additional-menu header__additional-menu--right">
            <svg
              class="header__svg header__svg--clickable"
              id="notification"
              viewBox="0 0 23 25"
            >
              <path
                class="notifications__path"
                d="M11.5 25C12.9986 25 14.2891 24.0948 14.8554 22.8027H8.14453C8.71079 24.0948 10.0014 25 11.5 25Z"
                fill="#808080"
              />
              <path
                class="notifications__path"
                d="M19.0684 12.1026V10.498C19.0684 7.08877 16.8023 4.19917 13.6973 3.25537V2.19727C13.6973 0.985693 12.7116 0 11.5001 0C10.2885 0 9.30279 0.985693 9.30279 2.19727V3.25537C6.19781 4.19917 3.9317 7.08872 3.9317 10.498V12.1026C3.9317 15.0974 2.79019 17.937 0.717489 20.0985C0.514364 20.3104 0.457284 20.6229 0.57242 20.8928C0.687557 21.1627 0.952694 21.3379 1.24615 21.3379H21.754C22.0474 21.3379 22.3125 21.1627 22.4276 20.8928C22.5428 20.6229 22.4857 20.3104 22.2826 20.0985C20.2099 17.937 19.0684 15.0973 19.0684 12.1026ZM12.2325 2.96523C11.9914 2.94199 11.7471 2.92969 11.5001 2.92969C11.253 2.92969 11.0087 2.94199 10.7676 2.96523V2.19727C10.7676 1.79341 11.0962 1.46484 11.5001 1.46484C11.9039 1.46484 12.2325 1.79341 12.2325 2.19727V2.96523Z"
                fill="#808080"
              />
            </svg>

            <div class="profile__menu profile__menu--2">
              <p class="profile__menu-p">У вас нет новых уведомлений</p>
            </div>
          </div> -->
          <div class="header__progress-box">
            <progress-bar bar-class="bg-info" :numbers="33" :value="3" />
          </div>
          <div class="header__avatar">
            <router-link to="/lk/settings">
              <img
                class="avatar__img"
                :src="user.avatar_link"
                alt="Ваше фото"
              />
            </router-link>
          </div>

          <div class="header__additional-menu">
            <!-- <svg
              class="header__svg header__arrow-down header__svg--clickable"
              id="shop__additional-menu"
            >
              <use xlink:href="#arrow-down"></use>
            </svg> -->

            <div class="profile__menu profile__menu--1">
              <button class="profile__menu-btn">Личные данные</button>
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
import BreadcrumbsComponent from "@/components/Base/BreadcrumbsComponent";

export default {
  name: "header-app",
  components: {
    AnimatedCoinPng,
    BreadcrumbsComponent,
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

<style lang="sass">
.header
  position: relative
  padding: 10px 20px
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
  &__part
    flex: 0 0 50%
  &__part--1
    padding-right: 20px
  &__title-block
    display: flex
    align-items: center
    flex: 1
  &__title
    color: hsla(0, 0%, 50%, .6)
    font-size: 14px
  &__burger
    width: 23px
    height: 23px
    margin-right: 20px
    display: none
    cursor: pointer
    @media (max-width:1000px)
      display: block
  &__burger--lessons
    @media (max-width:1300px)
      display: block
  &__burger .burger__path
    fill: gray
    @media (max-width:600px)
      fill: #fff
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
    .coin
      width: 30px
      height: 30px
  &__coin-text
    color: #0D0D0D
    font-size: 14px
  &__progress-box
    order: -1
    flex-grow: 1
    margin-right: 24px
  &__avatar
    width: 56px
    height: 56px
    border-radius: 50%
    border: 1px solid #F4F4F4
    overflow: hidden
  &__additional-menu
    position: relative
    @media (max-width:600px)
      display: none
  &__additional-menu--right
    @media (max-width:600px)
      display: block
  &__svg
    width: 25px
    height: 25px
  &__svg--clickable
    cursor: pointer
  &__svg .choose-theme__path
    @media (max-width:600px)
      fill: #fff
      fill-opacity: 1
  &__svg .notifications__path
    @media (max-width:600px)
      fill: #fff
  &__arrow-down
    fill: gray

.breadcrumb
  list-style: none
  padding-left: 0 !important
  width: 100%

  li.breadcrumb-item
    display: inline-block
    font-weight: 600
    font-size: 14px
    line-height: 16.71px

    & + li.breadcrumb-item
      margin-left: .25rem

      span
        margin-left: .25rem

      &::before
        content: "/"
        color: #FF0000

    span
      color: rgba(128, 128, 128, 1)

    a
      color: rgba(128, 128, 128, 0.6)

    .router-link-exact-active
      color: rgba(128, 128, 128, 1)
</style>
