<template>
  <div class="bg-c vue-component">
    <div
      class="bg-c__grid-item"
      v-for="(item, i) in iterator"
      :key="i"
      :style="{ 'left: 64px': user, 'width: calc( 100vw - 56px )': user }"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "bg-c",
  data: function() {
    return {
      iterator: []
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["user"])
  },
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
@import "@/assets/styles/variables.sass"

.bg-c
  position: fixed
  top: 64px
  height: calc( 100vh - 64px )
  width: 100%
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
