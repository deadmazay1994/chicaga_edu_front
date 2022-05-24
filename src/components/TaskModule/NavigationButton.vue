<template>
  <div
    class="task-navigation-button vue-component"
    @click="$emit('moveToGroup')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "task-navigation-button",
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
.task-navigation-button
  width: 28px
  height: 28px
  border-radius: 5px
  font-size: 12px
  font-weight: 800
  cursor: pointer

  display: flex
  align-items: center
  justify-content: center

  background: linear-gradient(0deg, #DCDCDC, #DCDCDC), #A9A9A9

  &--active
    background: linear-gradient(0deg, #000000, #000000), #A9A9A9
    color: #FFFFFF

  &--success
    background: linear-gradient(0deg, #D4FFB2, #D4FFB2), #A9A9A9

  &-error
    background: linear-gradient(0deg, #FEA795, #FEA795), #A9A9A9
</style>
