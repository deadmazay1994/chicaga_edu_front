<template>
  <button class="player-button vue-component" :style="{ background: color }">
    <svg class="player-button__play-svg" v-if="paused">
      <use xlink:href="#play"></use>
    </svg>
    <svg class="player-button__pause-svg" v-else>
      <use xlink:href="#pause"></use>
    </svg>
  </button>
</template>

<script>
export default {
  name: "player-button",
  data: function () {
    return {};
  },
  props: {
    paused: Boolean,
    color: String,
  }
};
</script>

<style scoped='scoped' lang='sass'>
.player-button
  width: 50px
  height: 50px
  border-radius: 50%
  border: none
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  &__play-svg
    width: 18px
    height: 22px
    display: flex
    align-items: center
    justify-content: center
    margin-right: -3px
  &__pause-svg
    width: 20px
    height: 20px
    display: flex
    align-items: center
    justify-content: center
</style>
