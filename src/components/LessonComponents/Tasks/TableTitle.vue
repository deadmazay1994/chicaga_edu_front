<template>
  <div class="table-title vue-component"><slot></slot></div>
</template>

<script>
export default {
  name: "table-title",
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
@import "@/components/Sass/Varibles.sass"

.table-title
  background: $main_color
  color: $main_color--text
  padding: 10px
</style>
