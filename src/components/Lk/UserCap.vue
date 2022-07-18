<template>
  <div class="user-cap user-cap--standard" :class="'user-cap--' + tariff">
    <div class="user-cap__avatar">
      <router-link class="user-cap__avatar-link" to="/lk/settings">
        <img
          class="user-cap__avatar-img"
          :src="src"
          width="50"
          height="50"
          alt="Ваше фото"
        />
      </router-link>
    </div>
    <div class="user-cap__data">
      <div class="user-cap__name">
        Соловьёва Ульяна
      </div>
      <div class="user-cap__status">
        student
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-cap",
  components: {},
  data: function() {
    return {};
  },
  props: {
    src: {
      type: String,
      required: true
    },
    tariff: {
      type: String,
      default: "basic"
    }
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.user-cap
  display: flex
  align-items: center
  font-weight: 400
  font-size: 14px
  line-height: 19px
  &__avatar
    position: relative
    flex-shrink: 0
    width: 50px
    height: 50px
  &__avatar:not(:last-child)
    margin-right: 8px
  &--standard &__avatar::before,
  &--standard &__avatar::after
    content: ""
    position: absolute
    bottom: 0px
    width: 25px
    height: 17px
    background-image: url(~@/assets/imgs/icons/wing-2.svg)
    background-position: center
    background-size: contain
  &--standard &__avatar::before
    left: 0
  &--standard &__avatar::after
    right: 0
    transform: scaleX(-1)
  &--premium &__avatar::before
    content: ""
    position: absolute
    top: 0
    right: 0
    width: 16px
    height: 13px
    background-image: url(~@/assets/imgs/icons/crown.svg)
    background-position: center
    background-size: contain
  &__avatar-link
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    font-size: 10px
    text-align: center
    background-color: #ffcace
    background-image: linear-gradient(111deg, #ffcace 0%, #d8eeff 100%)
    outline: 1px solid #ffffff
    outline-offset: -1px
    border-radius: 25px
    overflow: hidden
  &--standard &__avatar-link
    outline-color: #ff0000
  &--premium &__avatar-link
    outline-color: #ffbb7e
  &__avatar-link:focus-visible
    outline-color: currentColor
  &__avatar-img
    width: 100%
    height: 100%
    object-fit: cover
  &__data
    flex-shrink: 0
  &__name
    font-weight: 600
  &--standard &__name
    color: #cc2d23
  &--premium &__name
    color: #ff7a00
  &__status
    color: #a9a9a9
</style>
