<template>
  <div class="lk vue-component">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "lk",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.lk
  width: 100%
  height: 100%
  padding: 20px
  @media ($media_md)
    padding: 10px
</style>
