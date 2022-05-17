<template>
  <div class="progress" ref="progress" @click="rewind($event)">
    <progress-item
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
      // let x = e.pageX;
      // let y = e.pageY;
      let rect = this.$refs.progress.getBoundingClientRect();
      console.log(
        e.target.getBoundingClientRect(),
        `test: x -- ${e.clientX - rect.left} \n y -- ${e.clientY - rect.top}`
      );
    }
  }
};
</script>

<style lang="sass" scoped>
.progress
  display: flex
  width: 100%
</style>
