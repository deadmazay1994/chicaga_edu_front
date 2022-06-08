<template>
  <div class="tabs-component">
    <div class="tabs-component__header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="tabs-component__button"
        :class="{ 'tabs-component__button--active': tab.isActive }"
        @click="select(tab)"
      >
        {{ tab.name }}
      </button>
    </div>
    <div class="tabs-component__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs-component",
  components: {},
  data: function() {
    return {
      tabs: []
    };
  },
  props: {},
  computed: {},
  methods: {
    select(selectedTab) {
      this.tabs.map(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });
    }
  },
  created() {
    this.tabs = this.$children;
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
