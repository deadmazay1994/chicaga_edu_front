<template>
  <div class="choose-syllable vue-component">
    <description>{{ input.description }}</description>
    <div class="d-flex">
      <syllable v-for="(sy, i) in input.body" :key="i" :input="sy" ref="sy" />
    </div>
  </div>
</template>

<script>
import Description from "./TasksDescription";
import Syllable from "./Syllable";

export default {
  name: "choose-syllable",
  data: function() {
    return {
      shuffled: []
    };
  },
  methods: {
    check() {
      this.$refs.sy.forEach(sy => sy.check());
    }
  },
  computed: {},
  components: {
    Description,
    Syllable
  },
  props: ["input"],
  mixins: {},
  beforeMount() {
    this.shuffled = this.shuffle(this.input.body);
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
