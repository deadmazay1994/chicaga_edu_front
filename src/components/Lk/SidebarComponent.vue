<template>
  <div class="sidebar-component">
    <div class="sidebar-component__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SidebarComponent",
  components: {},
  data() {
    return {
      mobileDetected: false
    };
  },
  props: [],
  computed: {
    ...mapGetters(["draver"])
  },
  methods: {
    ...mapMutations(["setDraverState"]),
    toggleDraverByWindowSize() {
      if (window.innerWidth >= 1200) {
        this.mobileDetected = false;
        this.setDraverState(true);
      } else {
        this.mobileDetected = true;
        this.setDraverState(false);
      }
    }
  },
  created() {
    document.onresize = () => {
      this.toggleDraverByWindowSize();
    };
  },
  beforeMount() {
    this.toggleDraverByWindowSize();
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"

.sidebar-component
  position: relative
  background-color: #f5f5f5
  background-image: linear-gradient(rgba(196, 196, 196, 0.113), rgba(196, 196, 196, 0.113)), url("~@/assets/imgs/sidebar-bg.png")
  background-size: auto, cover
  @media ($media_lg2)
    background-image: none
    box-shadow: 0 -4px 20px rgba(128, 128, 128, 0.1)
  &::before
    content: ""
    position: absolute
    top: 0
    left: 0
    z-index: 1
    width: 100%
    height: 100%
    background-color: #f5f5f5
    background-image: linear-gradient(rgba(196, 196, 196, 0.113), rgba(196, 196, 196, 0.113)), url("~@/assets/imgs/sidebar-bg.png")
    background-size: auto, cover
    filter: blur(5px)
    pointer-events: none
    @media ($media_lg2)
      height: 1px
      background-color: #e3e3e3
      background-image: none
      filter: none
  &__content
    position: relative
    z-index: 2
    width: 100%
    height: 100%
    padding: 20px 22px
    @media ($media_lg2)
      max-width: 340px
      margin-right: auto
      margin-left: auto
      padding: 6px 10px
</style>
