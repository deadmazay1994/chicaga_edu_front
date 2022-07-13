<template>
  <div class="demo-notice vue-component">
    <div class="demo-notice__inner">
      <div class="demo-notice__text">
        <button class="demo-notice__close" type="button">
          <svg class="demo-notice__close-icon" width="15" height="15">
            <use xlink:href="#close-red"></use>
          </svg>
          <div class="sr-only">
            Закрыть
          </div>
        </button>
        <p class="demo-notice__title">
          Спасибо!
        </p>
        <p class="demo-notice__title">
          Мы позвоним вам с номера
        </p>
        <p class="demo-notice__number">
          +7 (800) 000-00-00
        </p>
        <p>
          (запишите его, чтобы не принять наш звонок за спам)
        </p>
        <p>
          <br />
        </p>
        <p>
          Мы рады связаться с&nbsp;вами:
        </p>
        <p>
          пн – чт: 12:00 – 22:00, сб – вс: 11:30 – 17:00 (по&nbsp;МСК)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo-notice",
  components: {},
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.demo-notice
  &__inner
    padding: 20px
    background-color: #f8f8f8
    border-radius: 10px
    filter: drop-shadow(0px 4px 20px rgba(128, 128, 128, 0.2))
  &__text
    line-height: 1.3
  &__text > *:not(:last-child)
    margin-bottom: 0.3em
  &__text ol
    padding-left: 20px
  &__title
    font-size: 20px
  &__number
    font-size: 20px
    color: #007eff
  &__close
    float: right
    position: relative
    top: -12px
    right: -10px
    display: flex
    justify-content: center
    align-items: center
    width: 35px
    height: 35px
    margin-left: 0.3em
    border-radius: 3px
    outline-width: 0
  &__close-icon
    width: 15px
    height: 15px
    transition-property: transform
    transition-duration: 0.2s
  &__close:focus-visible &__close-icon,
  &__close:hover &__close-icon
    transform: rotate(90deg)
  &__close:active &__close-icon
    transform: scale(0.5)
</style>
