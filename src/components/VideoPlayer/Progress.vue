<template>
  <div class="progress" ref="progress" @click="rewind($event)">
    <progress-item
      class="progress__item"
      v-for="(timestamp, index) in timestamps"
      ref="progressItem"
      :key="index"
      :index="index"
      :duration="duration"
      :timestamp="timestamp"
      :timestamps="timestamps"
      :currentTime="currentTime"
    />
  </div>
</template>

<script>
import ProgressItem from "./ProgressItem.vue";

export default {
  name: "Progress",
  components: { ProgressItem },
  data() {
    return {};
  },
  props: {
    currentTime: Number,
    duration: Number,
    timestamps: {
      type: Array,
      default: function() {
        return { type: "default" };
      }
    }
  },
  methods: {
    rewind(e) {
      let rect = this.$refs.progress.getBoundingClientRect();
      let elemX = e.clientX - rect.left;
      this.$emit("rewindTo", elemX);
    }
  }
};
</script>

<style lang="sass" scoped>
.progress
  display: flex
  width: 100%
  &__item:not(:last-child)
    margin-right: 2px
</style>
