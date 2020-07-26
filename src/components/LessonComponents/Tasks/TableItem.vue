<template>
  <div class="table-item vue-component"><slot></slot></div>
</template>

<script>
export default {
  name: "table-item",
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

.table-item
  padding: 10px
  background: #dedede
  margin-top: 2px
  cursor: pointer
  &--correct
    background: $success_color
    color: $success_color--text
  &--uncorrect
    background: $error_color
    color: $error_color--text
</style>
