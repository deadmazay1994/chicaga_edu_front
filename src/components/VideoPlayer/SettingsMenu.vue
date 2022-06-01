<template>
  <div class="settings-menu-wrapper vue-component">
    <div class="settings-menu" v-if="!submenuIsOpen">
      <div class="settings-menu__row">
        <span class="settings-menu__row__item">Скорость воспроизведения</span>
        <span
          class="settings-menu__row__item settings-schevron"
          @click="submenuIsOpen = true"
          >Обычная <SchevronSvgVue class="arrow" :fill="'ffffff'"
        /></span>
      </div>
    </div>
    <div class="settings-menu sub-menu" v-if="submenuIsOpen">
      <div class="sub-menu__title" @click="submenuIsOpen = false">
        <SchevronSvgVue :fill="'ffffff'" :on="true" />
        <span>Скорость воспроизведения</span>
      </div>
      <div
        class="sub-menu__row"
        v-for="(speed, index) in videoSpeedArray"
        :key="index"
        :class="{ 'sub-menu__row--active': speed.active }"
        @click="clickSubMenuRow(speed.speed, index)"
      >
        <span class="sub-menu__row__title">
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
  display: flex
  align-items: center
  flex-direction: column
  background-color: #181818
  color: #FFFFFF
  font-size: 12px
  width: 270px

  &__row
    display: flex
    justify-content: space-between
    width: 100%
    padding: 1rem

    &__item
      display: flex
      align-items: center

  .arrow
    margin-left: .5rem

  .settings-schevron
    cursor: pointer

.sub-menu
  &__title
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    padding: 1rem
  &__row
    display: flex
    align-items: center
    width: 100%
    cursor: pointer
    padding: .35rem .5rem
    &__title
      margin-left: 2rem
    &:hover
      background-color: #3d3d3d
    &--active::before
      content: "✓"
      position: absolute
      left: 10px

svg
  path
    fill: #ffffff
</style>
