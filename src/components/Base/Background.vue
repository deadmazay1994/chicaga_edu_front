<template>
  <div class="bg-c vue-component">
    <div class="bg-c__grid-item" v-for="(item, i) in iterator" :key="i"></div>
  </div>
</template>

<script>
export default {
  name: "bg-c",
  data: function() {
    return {
      iterator: []
    };
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {
    for (let i = 0; i < 9; i++) {
      this.iterator.push("");
    }
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.bg-c
  position: fixed
  top: 64px
  left: 56px
  width: calc( 100vw - 56px )
  height: calc( 100vh - 64px )
  display: flex
  flex-wrap: wrap
  z-index: 0
  &__grid-item
    width: 33.3333%
    height: 33.3333%
    box-sizing: border-box
    border: 1px solid #dedede
    border-top: none
    &:hover
      background: lighten($bg_color, 50%)
</style>
