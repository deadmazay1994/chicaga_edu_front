<template>
  <div class="minicourse-card vue-component">
    <div class="minicourse-card__main">
      <div class="minicourse-card__title">
        Мини-курс для путешествий
      </div>
      <div class="minicourse-card__text-box">
        <svg class="minicourse-card__icon" width="60" height="60">
          <use xlink:href="#creative-lab"></use>
        </svg>
        <span class="minicourse-card__text">
          за&nbsp;3 урока научитесь (кратко о&nbsp;результате после мини-курса)
        </span>
      </div>
      <div class="minicourse-card__more">
        <button
          class="minicourse-card__more-text"
          type="button"
          @click="showModal()"
        >
          Подробнее
        </button>
      </div>
    </div>
    <div class="minicourse-card__footer">
      <div class="minicourse-card__price-box minicourse-card__price-box--old">
        <span class="minicourse-card__price-old">
          2700
        </span>
        <span class="minicourse-card__currency">
          ₽
        </span>
      </div>
      <div class="minicourse-card__price-box">
        <span class="minicourse-card__price">1200</span
        ><span class="minicourse-card__currency">₽</span>
      </div>
      <button class="minicourse-card__btn" @click="showModal()">
        Купить
      </button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";

export default {
  name: "minicourse-card",
  components: {},
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {
    showModal() {
      eventBus.$emit("showModal", { name: "demo-modal" });
    }
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.minicourse-card
  display: flex
  justify-content: space-between
  padding: 24px
  background-color: #ffffff
  border-radius: 12px
  box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  font-weight: 300
  font-size: 16px
  line-height: 1.3
  @media ($media_sm)
    flex-direction: column
  @media ($media_sm2)
    padding: 15px
  &__main
    @media ($media_sm)
      margin-bottom: 10px
  &__title
    margin-bottom: 24px
    font-weight: 800
    font-size: 24px
    @media ($media_md)
      font-size: 20px
      margin-bottom: 12px
  &__text-box
    display: flex
    align-items: center
    margin-bottom: 24px
    @media ($media_md)
      margin-bottom: 12px
  &__icon
    flex-shrink: 0
    margin-right: 16px
  &__text
    max-width: 250px
    line-height: 1.5
  &__more
    padding-left: 76px
    @media ($media_sm)
      padding-left: 0
  &__more-text
    display: block
    line-height: 1.5
    color: #007eff
    border-bottom: 1px dashed #007eff
  &__footer
    display: flex
    flex-direction: column
    justify-content: flex-end
    align-items: flex-end
    flex-shrink: 0
    padding-left: 24px
    @media ($media_sm)
      flex-direction: row
      flex-wrap: wrap
      padding-left: 0
  &__price-box
    margin-bottom: 16px
    font-size: 36px
    color: #202020
    @media ($media_sm)
      margin-bottom: 0
      line-height: 1
  &__price-box--old
    margin-bottom: 8px
    font-size: 24px
    color: #c4c4c4
    @media ($media_sm)
      margin-bottom: 0
      margin-right: 10px
  &__price-old
    display: inline-block
    font-weight: 600
    text-decoration-line: line-through
  &__price
    font-weight: 400
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.15)
  &__currency
    font-size: 0.5em
  &__btn
    padding: 8px 22px
    font-weight: 700
    font-size: 16px
    color: #e84145
    border: 1.5px solid #e84145
    border-radius: 16px
    transition-property: color, background-color, border-color
    transition-duration: 0.2s
    transition-timing-function: ease-out
    @media ($media_sm)
      flex-basis: 100%
      margin-top: 10px
  &__btn:focus-visible,
  &__btn:hover
    color: #ffffff
    background-color: #ff0000
    border-color: #ff0000
  &__btn:active
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25)
</style>
