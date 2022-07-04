<template>
  <div class="settings-menu vue-component">
    <div class="settings-menu__inner" v-if="!submenuIsOpen">
      <div class="settings-menu__list">
        <span class="settings-menu__item">Скорость воспроизведения</span>
        <span
          class="settings-menu__item settings-menu__item--pointed"
          @click="submenuIsOpen = true"
          >{{ courrentSpeedName }}
          <SchevronSvgVue class="settings-menu__item-arrow" :fill="'ffffff'"
        /></span>
      </div>
    </div>
    <div class="settings-menu__inner" v-if="submenuIsOpen">
      <div class="settings-menu__title" @click="submenuIsOpen = false">
        <SchevronSvgVue :fill="'ffffff'" :on="true" />
        <span>Скорость воспроизведения</span>
      </div>
      <div
        class="settings-menu__sublist"
        v-for="(speed, index) in videoSpeedArray"
        :key="index"
        :class="{ 'settings-menu__sublist--active': speed.active }"
        @click="clickSubMenuRow(speed.speed, index)"
      >
        <span class="settings-menu__sublist-title">
          {{ speed.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import SchevronSvgVue from "../Icons/SchevronSvg.vue";

export default {
  name: "settings-menu",
  components: {
    SchevronSvgVue
  },
  data: function() {
    return {
      submenuIsOpen: false
    };
  },
  props: {
    videoSpeedArray: Array
  },
  computed: {
    courrentSpeedName() {
      return this.videoSpeedArray.find(element => element.active === true)
        .title;
    }
  },
  methods: {
    clickSubMenuRow(speed, i) {
      this.$emit("changeSpeed", speed, i);
    }
  }
};
</script>

<style scoped="scoped" lang="sass">
.settings-menu
  svg path
    fill: #ffffff
  &__inner
    display: flex
    flex-direction: column
    align-items: center
    width: 270px
    font-size: 12px
    color: #ffffff
    background-color: #181818
  &__list
    display: flex
    justify-content: space-between
    width: 100%
    padding: 1em
  &__item
    display: flex
    align-items: center
  &__item--pointed
    cursor: pointer
  &__item-arrow
    margin-left: 0.5em
  &__title
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    padding: 1em
  &__sublist
    display: flex
    align-items: center
    width: 100%
    cursor: pointer
    padding: 0.35em 0.5em
  &__sublist:hover
    background-color: #3d3d3d
  &__sublist--active::before
    content: "✓"
    position: absolute
    left: 10px
  &__sublist-title
    margin-left: 2rem
</style>
