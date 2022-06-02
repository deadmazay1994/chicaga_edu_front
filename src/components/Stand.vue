<template>
  <div class="stand vue-component">
    <div class="stand-inner">
      <tester></tester>
    </div>
  </div>
</template>

<script>
import tester from "@/components/Lk/Store/StoreComponent.vue";

export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    tester
  },
  props: [],
  mixins: {}
};
</script>

<style scoped="scoped" lang="sass">

.stand-inner
  width: 100%
  position: relative

</style>
