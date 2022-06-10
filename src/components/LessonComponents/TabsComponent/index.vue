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
        <span class="tabs-component__text">
          {{ tab.name }}
        </span>
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

<style scoped="scoped" lang="sass">
$header-height: 64px
.tabs-component
  width: 100%
  height: 100%
  &__header
    display: flex
    width: 100%
    height: $header-height
    font-weight: 600
    font-size: 16px
    line-height: 19px
    text-align: center
    background-color: #F4F4F4
  &__button
    display: flex
    align-items: center
    justify-content: center
    flex-basis: 25%
    height: 100%
    padding: 8px
    background-image: linear-gradient(180deg, rgba(244, 244, 244, 0) 0%, rgba(219, 218, 218, 0.5) 100%)
  &__button--active
    color: #ffffff
    background-image: linear-gradient(180deg, #FF6440 0%, #CC2D23 100%)
    box-shadow: inset 0px 0px 10px rgba(169, 47, 33, 0.5)
  &__text
    display: flex
    justify-content: center
    align-items: center
    max-width: 100px
  &__body
    width: 100%
    height: calc( 100% - #{$header-height} )
</style>
