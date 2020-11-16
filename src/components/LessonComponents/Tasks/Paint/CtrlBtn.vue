<template>
  <v-icon
    :data-toll-group="groupName"
    :data-toll="toolName"
    :class="{ 'ctrl-btn--active': btnActive }"
    class="ctrl-btn"
    v-on:click="toggle"
    ><slot></slot
  ></v-icon>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "ctrl-btn",
  methods: {
    ...mapMutations(["toggleTool", "toggleTollGroup"]),
    toggle() {
      let activation = true;
      if (this.meta) {
        if (this.meta.notActivation) {
          activation = !this.meta.notActivation;
        }
      }
      if (activation) {
        if (this.toolName) {
          this.toggleTool(this.toolName);
          if (this.parentGroup) {
            this.toggleTollGroup(this.parentGroup);
          }
        } else if (this.groupName) {
          this.toggleTollGroup(this.groupName);
        }
      }
    }
  },
  computed: {
    ...mapGetters(["tool", "toolGroup"]),
    btnActive() {
      return this.tool == this.toolName || this.groupName == this.toolGroup;
    }
  },
  components: {},
  props: ["toolName", "groupName", "parentGroup", "meta"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.ctrl-btn
  &--active
    color: $main-color
</style>
