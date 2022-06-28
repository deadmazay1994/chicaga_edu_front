<template>
  <div
    class="volume-area"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <sound-svg-vue class="volume-area__sound-svg" :muted="muteVolume" @click="$emit('clickToggleVolume')" />
    <div class="volume-area__input-box">
      <transition name="emersion">
        <input
          type="range"
          step="0.05"
          min="0"
          max="1"
          v-show="volumeBoolean"
          v-model="inputValue"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import SoundSvgVue from "../../Icons/SoundSvg.vue";

export default {
  name: "volume-area",
  components: {
    SoundSvgVue
  },
  data: function() {
    return {};
  },
  props: {
    volumeBoolean: Boolean,
    value: Number,
    muteVolume: Boolean
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.volume-area
  display: flex
  &__sound-svg
    cursor: pointer
  &__input-box
    display: flex
    align-items: center
    margin-left: 5px
    overflow: hidden

    .emersion-enter
      transform: translateX(-129px)
    .emersion-enter-active,
    .emersion-leave-active
      transition: all 0.2s ease-in-out
    .emersion-enter-from,
    .emersion-leave-to
      transform: translateX(-129px)
</style>
