<template>
  <div>
    <div>
      <chip class="chip--part chip--part-first" text="com"> </chip>
      <chip
        class="chip--part chip--part-center chip--part-selected chip--success"
        text="pu"
      >
      </chip>
      <chip class="chip--part chip--part-last chip--error" text="ter"> </chip>
    </div>
  </div>
</template>

<script>
import Chip from "@/components/LessonComponents/Tasks/Chip";

export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  components: {
    Chip
  },
  props: [],
  mixins: {}
};
</script>

<style scoped="scoped" lang="sass"></style>
