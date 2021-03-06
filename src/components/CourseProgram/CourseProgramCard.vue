<template>
  <div
    class="program-card vue-component"
    :class="'program-card--' + returnModificator"
  >
    {{ returnModificator }}
    <div class="program-card__inner">
      <div class="program-card__top">
        <div class="program-card__top-main">
          <div class="program-card__img-box">
            <img
              v-if="kind == 'teacher'"
              class="program-card__img"
              width="48"
              height="48"
              src="@/assets/imgs/lessons/teacher.jpg"
              alt="Учитель"
            />
            <svg v-else class="program-card__img" width="48" height="48">
              <use
                v-if="returnModificator == 'test'"
                xlink:href="#sq-school-check"
              ></use>
              <use
                v-else-if="returnModificator == 'practical'"
                xlink:href="#sq-school-green"
              ></use>
              <use v-else xlink:href="#sq-school-red"></use>
            </svg>
          </div>
          <div class="program-card__title-box">
            <span class="program-card__title" :title="title">
              {{ title }}
            </span>
          </div>
          <!-- <div class="program-card__rating-box">
            <div class="program-card__rating-inner">
              <svg class="program-card__star" width="16" height="16">
                <use xlink:href="#star"></use>
              </svg>
              <span class="program-card__rating">
                {{ rating }}
              </span>
            </div>
          </div> -->
        </div>
        <div class="program-card__lock-box">
          <svg class="program-card__lock" width="24" height="24">
            <use :xlink:href="'#' + returnAccessString"></use>
          </svg>
        </div>
      </div>
      <div class="program-card__bottom">
        <div
          class="program-card__bottom-main program-card__bottom-main--result"
          v-if="kind == 'result'"
        >
          <div class="program-card__bottom-item">
            <div class="program-card__data">
              <svg class="program-card__bottom-img" width="18" height="18">
                <use xlink:href="#grammar"></use>
              </svg>
              <span class="program-card__time"> {{ grammar }}</span>
            </div>
          </div>
          <div class="program-card__bottom-item">
            <div class="program-card__data">
              <svg
                class="program-card__bottom-img"
                width="18"
                height="18"
                fill="none"
              >
                <use xlink:href="#vocabulary"></use>
              </svg>
              <span class="program-card__date"> {{ vocabulary }}</span>
            </div>
          </div>
        </div>
        <div class="program-card__bottom-main" v-else>
          <div class="program-card__bottom-item">
            <div class="program-card__data">
              <svg class="program-card__bottom-img" width="18" height="18">
                <use xlink:href="#clock"></use>
              </svg>
              <span class="program-card__time">
                {{ formattedDuration }} мин
              </span>
            </div>
            <div class="program-card__desc">
              продолжительность
            </div>
          </div>
          <div class="program-card__bottom-item">
            <div class="program-card__data">
              <svg
                class="program-card__bottom-img"
                width="18"
                height="18"
                fill="none"
              >
                <use xlink:href="#calendar"></use>
              </svg>
              <span class="program-card__date"> {{ startTime }} г. </span>
            </div>
            <div class="program-card__desc">
              доступ к уроку
            </div>
          </div>
        </div>
        <div class="program-card__btn-box">
          <router-link
            :to="link"
            v-if="access"
            class="program-card__btn"
            href="#"
            title="Переход к уроку"
          >
            <svg class="program-card__btn-img" width="14" height="14">
              <use xlink:href="#arrow-down"></use>
            </svg>
            <span class="sr-only">
              Переход к уроку
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "",
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    startTime() {
      return moment.unix(this.start_time).format("DD.MM.YYYY");
    },
    formattedDuration() {
      let startTimeMinutes = this.duration;

      const formatTime = function(str) {
        if (str.length == 1) return `0${str}`;
        return str;
      };

      let hours = Math.trunc(startTimeMinutes / 60);
      let minutes = startTimeMinutes % 60;

      return formatTime(String(hours)) + ":" + formatTime(String(minutes));
    },
    access() {
      const now = moment();
      return now >= moment.unix(this.start_time);
    },
    returnAccessString() {
      return this.access ? "lock-open" : "lock-lock";
    },
    returnModificator() {
      // if (this.title.match("Elementary")) return "test";
      if (this.title.match("Test")) return "test";
      else if (this.title.match("Practical")) return "practical";
      return "";
    }
  },
  components: {},
  props: {
    kind: {
      type: String,
      default: "lesson"
    },
    title: String,
    rating: Number,
    duration: Number,
    start_time: Number,
    link: String,
    vocabulary: String,
    grammar: String
  },
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.program-card
  font-weight: 600
  font-size: 14px
  line-height: 1.3
  &__inner
    color: #202020
    background-color: #ffffff
    border-radius: 12px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    overflow: hidden
  &--practical &__inner
    background-image: linear-gradient(360deg, rgba(255, 255, 255, 0.2) 42%, rgba(181, 214, 55, 0.2) 100%)
  &--test &__inner
    background-image: linear-gradient(180deg, #ece9e6 0%, #ffffff 57%)
  &__top
    display: flex
    padding: 24px
    border-bottom: 1px solid #dcdcdc
    @media ($media_sm)
      padding: 16px
  &__top-main
    display: flex
    flex-wrap: wrap
    gap: 8px 16px
  &__img-box
    display: flex
    flex-shrink: 0
    width: 48px
    height: 48px
    border-radius: 8px
    overflow: hidden
  &__img
    width: 100%
    height: 100%
    fill: none
  &__title-box
    flex-shrink: 0
    flex-basis: 166px
    font-weight: 700
    font-size: 16px
    line-height: 1.5
    display: -webkit-box
    -webkit-box-orient: vertical
    text-overflow: ellipsis
    overflow: hidden
    -webkit-line-clamp: 2
  &__rating-box
    display: flex
    align-items: flex-start
    justify-content: flex-end
    flex-grow: 1
    margin-right: 10px
  &__rating-inner
    display: flex
    align-items: center
    padding: 3px 5px
    border-radius: 8px
    background-color: rgba(255, 186, 173, 0.1)
  &__star
    margin-right: 1px
  &__lock-box
    display: flex
    align-items: flex-start
    justify-content: flex-end
    flex-grow: 1
    padding-left: 10px
  &__bottom
    display: flex
    align-items: center
    padding: 16px 24px
    @media ($media_sm)
      padding-right: 16px
      padding-left: 16px
  &__bottom-main
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 12px 24px
  &__bottom-main--result
    flex-direction: column
    align-items: flex-start
  &__bottom-item
    flex-shrink: 0
  &__data
    display: flex
    align-items: center
    margin-bottom: 4px
  &__bottom-img
    margin-right: 4px
  &__desc
    font-weight: 300
    font-size: 12px
  &__btn-box
    flex-grow: 1
    display: flex
    justify-content: flex-end
    padding-left: 10px
  &__btn
    display: flex
    align-items: center
    justify-content: center
    min-width: 32px
    min-height: 38px
    padding: 6px
    color: #ff121a
    border-radius: 8px
    outline: 1px solid #ff121a
    outline-offset: -1px
    transition-property: color, background-color, box-shadow
    transition-duration: 0.3s
  &__btn:focus-visible,
  &__btn:hover
    color: #ffffff
    background-color: #ff121a
  &__btn:active
    outline-color: transparent
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25)
    transition-duration: 0.1s
  &__btn-img
    transform: rotate(-90deg)
</style>
