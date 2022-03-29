<template>
  <div class="auth-page">
    <auth-page-symbols />
    <div class="auth-intro">
      <div class="auth-intro__logotype">
        <auth-intro-logo />
      </div>
      <p class="auth-intro__desc">Курсы английского языка в Санкт-Петербурге</p>
    </div>
    <div class="auth-body">
      <slot />
    </div>
  </div>
</template>

<style lang="sass">
.auth-page
  height: 100%
  width: 100%
  display: flex
  @media screen and (max-width: 1000px)
    &
      flex-direction: column

  .auth-intro
    width: 42%
    height: 100%
    background: url(~@/assets/imgs/auth-bg.jpg)
    background-size: 100% 100%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    @media screen and (max-width: 1000px)
      &
        width: 100%
        height: 50px

    .auth-intro__logotype
      margin-bottom: 40px
      @media screen and (max-width: 1000px)
        &
          margin-bottom: 0
      svg
        width: 322px
        @media screen and (max-width: 1000px)
          &
            width: 140px

    .auth-intro__desc
      font-style: normal
      font-weight: 300
      font-size: 20px
      line-height: 24px
      display: flex
      align-items: center
      text-align: center
      letter-spacing: .15em
      max-width: 311px
      color: #fff
      @media screen and (max-width:1000px)
        &
          display: none

  .auth-body
    height: 100%
    width: 58%
    background-image: url(~@/assets/imgs/bg/1.svg), url(~@/assets/imgs/bg/2.svg)
    background-position: 0 100%, 100% 0
    background-repeat: no-repeat
    background-size: 343px auto
    display: flex
    justify-content: center
    flex-direction: column
    @media screen and (max-width:1366px)
      &
        padding-top: 0
        align-items: center
    @media screen and (max-width:1000px)
      &
        width: 100%
        background-size: 150px auto

    .auth-form
      max-width: 435px
      width: 100%
      @media screen and (max-width: 450px)
        &
          padding: 30px
      @media screen and (max-height: 450px)
        &
          padding: .5rem 0

      .auth-form__title
        font-style: normal
        font-weight: 700
        font-size: 42px
        line-height: 1.19em
        display: flex
        align-items: center
        color: red
        margin-bottom: 5vh
        @media screen and (max-width: 1000px)
          &
            font-size: 24px
            margin-bottom: 60px

      .auth-form__header
        display: flex
        align-items: flex-end
        margin-bottom: 5vh
        justify-content: space-between
        width: 100%
        h2
          margin-bottom: 0

        .auth-form__step
          font-family: Inter
          font-style: normal
          font-weight: 700
          font-size: 22px
          line-height: 27px
          color: red
          span
            font-size: 16px
            font-weight: 300

      .auth-form__body
        display: flex
        flex-direction: column
        align-items: flex-start
        width: 100%
        position: relative
        padding-bottom: 30px
        @media screen and (max-height: 450px)
          &
            padding-bottom: 0

        .auth-input
          display: flex
          align-items: center
          padding-bottom: 20px
          border-bottom: 1.5px solid #fab5b4
          width: 100%
          margin-bottom: 30px
          &::focus-within
            border-color: red
          &:last-child
            margin-bottom: 0
          @media screen and (max-width: 1000px)
            &
              margin-bottom: 2vh
              padding-bottom: 2vh
          svg
            width: 22px
            height: 22px
            fill: red
            margin-right: 15px
          input
            border: none
            font-style: normal
            font-weight: 500
            font-size: 16px
            line-height: 19px
            color: #fab5b4
            &:focus
              color: red
            &:-ms-input-placeholder
              color: #fab5b4
            &::placeholder
              color: #fab5b4

        .reset-password-link
          align-self: flex-end
          margin-top: 5px
        .red-msg
          margin-bottom: 30px
        .auth-msg
          text-align: center
          position: absolute
          bottom: -17px
          align-self: center
          .red-text
            bottom: -40px
            color: #fab5b4

      .auth-form__footer
        display: flex
        flex-direction: column
        align-items: center
        margin-top: 5vh
        @media screen and (max-width:1000px)
          &
            margin-top: 2vh

        .auth-form__submit
          margin-bottom: 3vh

        .auth-button
          background: red
          box-shadow: inset 3px 3px 15px 3px hsla(0, 0%, 100%, .5)
          border-radius: 1.8em
          padding: .9em
          max-width: 315px
          width: 100%
          text-align: center
          font-style: normal
          font-weight: 700
          font-size: 22px
          line-height: 1.18em
          color: #fff
          @media screen and (max-width:1000px)
            &
              font-size: 16px
              max-width: 200px
          &:disabled
            opacity: .3

        .auth-form__link-bar
          text-align: center

          .arrow-link
            font-style: normal
            font-weight: 700
            font-size: 14px
            line-height: 17px
            display: flex !important
            align-items: center
            color: red
          &:before
            content: ""
            width: 17px
            height: 17px
            background: url(~@/assets/imgs/icons/left-arrow.svg)
            background-size: 100% 100%
            display: none
            margin-right: 10px

          .auth-form__link
            &:first-child
              margin-right: 15px
              display: inline-block

      .auth-label
        margin-bottom: 2vh
        font-weight: 700
      .text-button
        font-weight: 500
      .auth-label,
      .text-button
        font-style: normal
        font-size: 14px
        line-height: 17px
        color: red
      .auth-checkbox
        display: flex
        -webkit-user-select: none
        -moz-user-select: none
        -ms-user-select: none
        user-select: none
        align-items: center
        p
          font-family: Roboto
          font-style: normal
          font-weight: 400
          font-size: 14px
          line-height: 16px
          color: #fab5b4
        a
          -webkit-text-decoration-line: underline
          text-decoration-line: underline
          color: red
        input
          display: none
          &:checked~.auth-checkbox__decor
            background: url(~@/assets/imgs/icons/checkmark.svg)
            border: none
        .auth-checkbox__decor
          min-width: 22px
          height: 22px
          background-size: 100% 100%
          border: 1px solid #fab5b4
          border-radius: 100%
          margin-right: 11px

      .auth-msg
        font-style: normal
        font-weight: 500
        font-size: 14px
        line-height: 17px
        color: gray

    .register-form
      .auth-form
        .auth-label
          margin-bottom: 2vh
        .auth-input
          @media screen and (max-width: 1000px)
            &
              margin-bottom: 2vh
              padding-bottom: 2vh
</style>

<style>
@import "../assets/styles/style.min.css";
</style>

<script>
import AuthPageSymbols from "@/components/Icons/AuthPageSymbols";
import AuthIntroLogo from "@/components/Icons/AuthIntroLogo";
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["pushShuckbar"])
  },
  components: {
    AuthPageSymbols,
    AuthIntroLogo
  }
};
</script>
