<template>
  <div class="content-block vue-component">
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "content-component",
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
.content-block
  position: relative
  display: flex
  flex-direction: column
  flex-grow: 1
  width: 100%
  height: 100%
  background-color: rgba(255, 255, 255, 0.8)
  border-radius: 30px
  box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  overflow: hidden
</style>
