<template>
  <div class="tab-component" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tab-component",
  components: {},
  data: function() {
    return {
      isActive: false
    };
  },
  props: {
    name: { required: true },
    selected: Boolean
  },
  computed: {},
  methods: {},
  mounted() {
    this.isActive = this.selected;
  }
};
</script>

<style scoped="scoped" lang="sass">
.tab-component
  display: flex
  flex-direction: column
  height: 100%
</style>
