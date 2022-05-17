<template>
  <div class="progress" ref="progress" @click="rewind($event)">
    <progress-item
      :key="index"
      ref="progressItem"
      @rewindTo="rewindTo"
      :currentTime="currentTime"
      :fullTime="fullTime"
      :timestamps="timestamps"
    />
  </div>
</template>

<script>
import ProgressItem from "./ProgressItem.vue";

export default {
  name: "Progress",
  components: { ProgressItem },
  data() {
    return {
      timestamps: [
        {
          title: 1,
          time: 10.526667
        },
        {
          title: 2,
          time: 20
        },
        {
          title: 3,
          time: 30.526667
        }
      ]
    };
  },
  props: ["currentTime", "fullTime"],
  methods: {
    rewind(e) {
      let rect = this.$refs.progress.getBoundingClientRect();
      let elemX = e.clientX - rect.left;
      this.rewindTo(elemX);
    },
    rewindTo(x) {
      this.$emit("rewindTo", x);
    }
  }
};
</script>

<style lang="sass" scoped>
.progress
  display: flex
  width: 100%
</style>
