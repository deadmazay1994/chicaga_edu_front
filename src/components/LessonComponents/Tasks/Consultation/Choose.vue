<template>
  <div class="choose vue-component">
    <description :index="index"> {{ input.description }} </description>
  </div>
</template>

<script>
import Description from "./../TasksDescription";

import Methods from "@/mixins/tasks";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "choose",
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["saveTask"])
  },
  computed: {
    ...mapGetters(["socket"])
  },
  components: {
    Description
  },
  props: ["input", "index"],
  mixins: [Methods],
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
