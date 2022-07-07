<template>
  <div
    class="course-card course-card--beginner vue-component"
    :class="{ 'course-card--wide': isWide , 'course-card--open': isOpen }"
  >
    <div class="course-card__inner">
      <div class="course-card__header">
        <div class="course-card__title">
          <span class="course-card__title-text">
            {{ course.name }}
          </span>
        </div>
        <div v-if="isOpen" class="course-card__status">
          <svg class="course-card__status-icon" width="16" height="24">
            <use xlink:href="#lock-open"></use>
          </svg>
          <span class="sr-only">
            Открыт
          </span>
        </div>
        <div v-else class="course-card__status">
          <svg class="course-card__status-icon" width="16" height="24">
            <use xlink:href="#lock-lock"></use>
          </svg>
          <span class="sr-only">
            Закрыт
          </span>
        </div>
      </div>
      <div class="course-card__body">
        <div class="course-card__desc">
          {{ description }}
        </div>
      </div>
      <div class="course-card__footer">
        <div class="course-card__feature">
          <div class="course-card__feature-item">
            <svg class="course-card__feature-icon" width="24" height="24">
              <use xlink:href="#calendar"></use>
            </svg>
            <span class="course-card__feature-text">
              обучение {{ duration }}
            </span>
          </div>
          <span class="course-card__feature-item">
            <svg class="course-card__feature-icon" width="24" height="24">
              <use xlink:href="#school"></use>
            </svg>
            <span class="course-card__feature-text">
              {{ amount }}
            </span>
          </span>
        </div>
        <div class="course-card__btn-box">
          <router-link
            :to="'/lk/my-courses/course-lessons/' + course.id"
            class="course-card__btn"
            href="#"
          >
            <span v-if="!isOpen" class="course-card__btn-text">
              Подробнее о курсе
            </span>
            <span v-else class="course-card__btn-text">
              К урокам курса
            </span>
            <svg class="course-card__btn-icon" width="24" height="24">
              <use xlink:href="#arrow-down"></use>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/mixins/api";
import "@/mixins/methods";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "course-card",
  data: function() {
    return {
      maxDescriptionSize: 20,
      description: [],
      duration: "4 месяца",
      amount: "32 урока"
    };
  },
  methods: {
    ...mapActions(["setCurrentCourse"]),
    setDescription() {
      this.description = this.course.description
        .split(" ")
        .slice(0, this.maxDescriptionSize)
        .join(" ");
      if (this.course.description.split(" ").length > this.maxDescriptionSize) {
        this.description += " ...";
      }
    }
  },
  computed: {
    ...mapGetters(["currentCourse"])
  },
  components: {},
  props: {
    course: Object,
    isOpen: Boolean,
    isWide: Boolean
  },
  mixins: [api],
  async beforeMount() {
    this.setDescription();
    console.log("course", this.course);
  }
};
</script>

<style scoped="scoped" lang="sass">
.course-card
  background-color: #ffffff
  border-radius: 12px
  box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  overflow: hidden
  &--beginner
    background-image: linear-gradient(360deg, #ffffff 71%, #fffcea 100%)
  &--elementary
    background-image: linear-gradient(360deg, rgba(255, 255, 255, 0.2) 71%, rgba(181, 214, 55, 0.1) 100%)
  &--pre-intermediate
    background-image: linear-gradient(360deg, rgba(255, 255, 255, 0.2) 71%, rgba(238, 97, 204, 0.1) 100%)
  &--intermediate
    background-image: linear-gradient(360deg, rgba(255, 255, 255, 0.2) 71%, rgba(110, 208, 93, 0.1) 100%)
  &--upper-intermediate
    background-image: linear-gradient(360deg, rgba(255, 255, 255, 0.2) 71%, rgba(93, 208, 153, 0.1) 100%)
  &--advanced
    background-image: linear-gradient(360deg, rgba(255, 255, 255, 0.2) 71%, rgba(255, 83, 83, 0.1) 100%)
  &__inner
    display: flex
    flex-direction: column
    height: 100%
  &__header
    display: flex
    align-items: center
    min-height: 96px
    padding: 24px 24px 24px 88px
    background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.5003 3.02267C21.7266 3.55904 19.1645 4.62506 16.7314 5.63739C15.3477 6.21313 14.0057 6.77149 12.8742 7.20518C12.7351 7.25849 12.5851 7.3111 12.4303 7.36535L12.4303 7.36535C11.3757 7.73497 10.1037 8.18085 10.6179 9.44381C10.8694 10.0619 12.1768 10.5455 13.1702 10.913C13.3991 10.9976 13.6113 11.0761 13.7901 11.1487C14.0664 11.2608 14.4527 11.4213 14.9162 11.6138C17.7878 12.8067 23.6178 15.2285 24.5433 14.9826C25.2266 14.8011 26.3897 14.3106 27.3143 13.9207L27.3144 13.9207L27.3144 13.9207C27.6005 13.8 27.8638 13.689 28.0829 13.5998L35.1117 10.8042C35.2314 10.7579 35.3587 10.7114 35.4898 10.6636C36.5433 10.2793 37.8396 9.80633 37.4185 8.5861C37.1764 7.88451 36.0076 7.47363 35.0172 7.12546C34.7478 7.03079 34.4917 6.94076 34.271 6.85078C33.9915 6.73682 33.5995 6.57288 33.1292 6.37615L33.1291 6.37611C30.2503 5.17206 24.4352 2.73997 23.5003 3.02267ZM5.24788 12.6191L10.0028 12.5929C9.76794 12.3986 9.5405 12.2327 9.32198 12.0734C8.90671 11.7705 8.52367 11.4912 8.18339 11.0848C7.66634 10.4672 7.52148 9.98638 7.41826 9.64377C7.29109 9.22167 7.22711 9.00932 6.60819 9.00932L6.53854 9.00931C4.12727 9.00898 1.5 9.00861 1.5 12.6076V36.0588C1.5 39.6777 4.22041 39.6465 7.49943 39.609H7.49955C7.83815 39.6051 8.18271 39.6012 8.53084 39.6012H19.1222C18.8463 40.8153 18.0559 41.9085 17.4197 42.7885C16.436 44.1491 15.8208 45 18.0453 45H29.9767C32.4549 45 31.2393 43.5676 30.5669 42.7753L30.5528 42.7587C29.8439 41.9232 29.1552 40.9342 28.8608 39.6012H39.6449C39.9512 39.6012 40.254 39.6039 40.5519 39.6065C43.8258 39.6355 46.5 39.6592 46.5 36.0588V12.6076C46.5 10.3093 45.2336 9.00932 42.8091 9.00932C42.4942 9.00932 42.2301 9.0062 42.0077 9.00357C41.2654 8.99478 40.9875 8.9915 40.8361 9.12823C40.7455 9.21002 40.7001 9.34191 40.6276 9.5527C40.576 9.70264 40.5107 9.8925 40.4057 10.1326C39.97 11.1283 39.3936 11.5508 38.7505 12.0222C38.5121 12.197 38.2644 12.3785 38.0114 12.5984L42.7519 12.6625L42.754 32.3483L5.24808 32.3303L5.24788 12.6191ZM29.9892 19.1466C25.9266 21.5368 22.1066 21.6992 18.0211 19.1418C17.9181 19.0773 17.8182 19.0152 17.7214 18.955C15.6698 17.6786 15 17.2619 15 13.501C15.9426 13.8014 17.2886 14.5762 18.6895 15.3826C20.6844 16.531 22.7908 17.7435 24.003 17.742C25.2101 17.7404 27.3401 16.5177 29.3472 15.3655C30.7406 14.5656 32.0749 13.7997 33 13.5C33 17.3075 32.2563 17.8127 29.9892 19.1466Z' fill='%23FD907E'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24 3.02618V14.9606C24.2446 15.0029 24.4304 15.0126 24.5433 14.9826C25.2266 14.8011 26.3897 14.3107 27.3142 13.9208L27.3143 13.9207L27.3144 13.9207L27.3144 13.9207C27.6005 13.8001 27.8638 13.689 28.0829 13.5998L35.1117 10.8042C35.2314 10.7579 35.3587 10.7115 35.4898 10.6637C36.5433 10.2793 37.8396 9.80635 37.4185 8.58611C37.1764 7.88453 36.0076 7.47364 35.0172 7.12548C34.7478 7.03081 34.4917 6.94077 34.271 6.85079C33.9916 6.73689 33.5999 6.57304 33.1298 6.37643L33.1292 6.37616L33.1291 6.37613L33.1291 6.37612C30.579 5.30959 25.7252 3.27951 24 3.02618ZM24 20.9997V17.742C24.001 17.742 24.002 17.742 24.003 17.742C25.2101 17.7405 27.3401 16.5177 29.3472 15.3656L29.3472 15.3655L29.3472 15.3655C30.7406 14.5657 32.0749 13.7998 33 13.5C33 17.3075 32.2563 17.8127 29.9892 19.1466C27.9532 20.3445 25.9781 20.9828 24 20.9997ZM24 45H29.9767C32.4549 45 31.2393 43.5676 30.5669 42.7753L30.5528 42.7587C29.8439 41.9232 29.1552 40.9342 28.8608 39.6012H39.6449C39.9512 39.6012 40.254 39.6039 40.5519 39.6065C43.8258 39.6355 46.5 39.6592 46.5 36.0588V12.6076C46.5 10.3093 45.2336 9.00934 42.8091 9.00934C42.4943 9.00934 42.2302 9.00621 42.0078 9.00358L42.0077 9.00358C41.2654 8.9948 40.9875 8.99151 40.8361 9.12824C40.7455 9.21004 40.7001 9.34193 40.6276 9.55272C40.576 9.70265 40.5107 9.89251 40.4057 10.1326C39.97 11.1283 39.3936 11.5508 38.7505 12.0222L38.7505 12.0222C38.512 12.197 38.2644 12.3785 38.0114 12.5985L42.7519 12.6625L42.754 32.3483L24 32.3393V45Z' fill='%23E84145'/%3E%3C/svg%3E%0A")
    background-repeat: no-repeat
    background-size: 48px 48px
    background-position: left 24px center
    border-bottom: 1px solid #dcdcdc
  &__title
    flex-grow: 1
    font-weight: 700
    font-size: 24px
    line-height: 1.3
    color: #202020
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
  &__status
    display: flex
    padding-left: 0.5em
  &__body
    flex-grow: 1
    padding: 8px 24px
    color: #323232
  &__desc
    min-height: calc( 22px * 4 )
    line-height: 22px
    -webkit-line-clamp: 4
    display: -webkit-box
    -webkit-box-orient: vertical
    overflow: hidden
  &--wide &__desc
    min-height: calc( 22px * 2 )
    -webkit-line-clamp: 2
  &__footer
    padding: 6px 24px 20px
  &--wide &__footer
    display: flex
    align-items: center
    justify-content: space-between
    padding-top: 10px
  &__feature
    display: flex
    flex-wrap: wrap
    margin-bottom: 20px
    font-weight: 300
  &--wide &__feature
    margin-right: 20px
    margin-bottom: 0
  &__feature-item
    display: flex
    padding-top: 4px
    padding-bottom: 4px
  &__feature-item:not(:last-child)
    margin-right: 32px
  &__feature-icon
    flex-shrink: 0
    width: 24px
    height: 24px
    margin-right: 4px
  &__btn-box
    display: flex
    flex-direction: column
    align-items: center
  &--wide &__btn-box
    flex-shrink: 0
  &__btn
    display: flex
    align-items: center
    padding: 14px 30px
    font-weight: 700
    font-size: 16px
    line-height: 1.5
    text-align: center
    color: #e84145
    fill: #e84145
    background-color: transparent
    border: 1.5px solid #e84145
    border-radius: 16px
    transition-property: color, fill, background-color, box-shadow
    transition-duration: 0.2s
    outline: none
  &__btn:focus-visible,
  &__btn:hover
    color: #ffffff
    fill: #ffffff
    background-color: #ff0000
  &__btn:active
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25)
  &__btn-text
    margin-right: 20px
  &__btn-icon
    width: 14px
    height: 8px
    transform: rotate(-90deg)
</style>
