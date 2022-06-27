<template>
  <div
    class="volume-area"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <sound-svg-vue :muted="muteVolume" @click="$emit('clickToggleVolume')" />
    <div class="volume-input-block">
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

<style scoped="scoped" lang="sass"></style>
