<template>
  <div class="settings-menu vue-component">
    <div class="settings-menu__inner" v-if="!submenuIsOpen">
      <div class="settings-menu__list">
        <span class="settings-menu__item">Скорость воспроизведения</span>
        <span
          class="settings-menu__item settings-menu__item--pointed"
          @click="submenuIsOpen = true"
          >Обычная
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
      submenuIsOpen: false,
      videoSpeedArray: [
        { title: 0.25, speed: 0.25, active: false },
        { title: 0.5, speed: 0.5, active: false },
        { title: 0.75, speed: 0.75, active: false },
        { title: "Обычная", speed: 1, active: true },
        { title: 1.25, speed: 1.25, active: false },
        { title: 1.5, speed: 1.5, active: false },
        { title: 1.75, speed: 1.75, active: false },
        { title: 2, speed: 2, active: false }
      ]
    };
  },
  props: [],
  computed: {},
  methods: {
    clickSubMenuRow(speed, i) {
      this.videoSpeedArray.map(row => (row.active = false));
      this.videoSpeedArray[i].active = true;
      this.$emit("changeSpeed", speed);
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
