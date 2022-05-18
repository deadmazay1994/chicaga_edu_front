<template>
  <div class="progress" ref="progress" @click="rewind($event)">
    <progress-item
      v-for="(timestamp, index) in timestamps"
      ref="progressItem"
      :key="index"
      :index="index"
      :fullTime="fullTime"
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
    fullTime: Number,
    timestamps: {
      type: Array
    }
  },
  methods: {
    rewind(e) {
      let rect = this.$refs.progress.getBoundingClientRect();
      let elemX = e.clientX - rect.left;
      this.$emit("rewindTo", elemX);
    }
  },
  mounted() {
    this.timestamps.push({ title: "Заключение", time: this.fullTime });
  }
};
</script>

<style lang="sass" scoped>
.progress
  display: flex
  width: 100%
</style>
