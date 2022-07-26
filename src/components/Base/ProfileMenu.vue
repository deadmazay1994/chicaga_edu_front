<template>
  <div class="profile-menu vue-component">
    <!-- <button class="profile-menu__btn">
      <svg class="profile-menu__icon" width="24" height="24">
        <use xlink:href="#messages"></use>
      </svg>
      <span class="profile-menu__text">
        Связаться с куратором
      </span>
      <svg class="profile-menu__icon" width="24" height="24">
        <use xlink:href="#arrow-right"></use>
      </svg>
    </button>
    <button class="profile-menu__btn">
      <svg class="profile-menu__icon" width="24" height="24">
        <use xlink:href="#user-square"></use>
      </svg>
      <span class="profile-menu__text">
        Связаться с преподавателем
      </span>
      <svg class="profile-menu__icon" width="24" height="24">
        <use xlink:href="#arrow-right"></use>
      </svg>
    </button> -->
    <router-link class="profile-menu__btn" tag="button" to="/lk/settings">
      <svg class="profile-menu__icon" width="24" height="24">
        <use xlink:href="#settings"></use>
      </svg>
      <span class="profile-menu__text">
        Настройки
      </span>
    </router-link>
    <button class="profile-menu__btn" @click="exit()">
      <svg class="profile-menu__icon" width="24" height="24">
        <use xlink:href="#logout"></use>
      </svg>
      <span class="profile-menu__text">
        Выход
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ProfileMenu",
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
.profile-menu
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
  &__btn
    display: flex
    align-items: center
    padding: 12px 6px
    color: #23262f
    text-align: left
    border-radius: 10px
    outline-width: 0
    transition-property: color, fill, stroke
    transition-duration: 0.3s
  &__btn:focus-visible,
  &__btn:hover
    color: #ff0000
  &__btn:active
    color: #ca2e23
    transition-duration: 0.1s
  &__icon
    flex-shrink: 0
    width: 24px
    height: 24px
  &__icon:first-child
    margin-right: 8px
  &__icon:last-child
    margin-left: 8px
  &__text
    flex-grow: 1
</style>
