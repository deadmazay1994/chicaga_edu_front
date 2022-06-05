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
  display: flex
  align-items: center
  justify-content: center
  width: 28px
  height: 28px
  font-weight: 600
  font-size: 20px
  line-height: 24px
  background-color: #DCDCDC
  border-radius: 5px
  cursor: pointer

  &--success
    background-color: #D4FFB2

  &--error
    background-color: #FEA795
  
  &--active
    color: #FFFFFF
    background-color: #000000
</style>
