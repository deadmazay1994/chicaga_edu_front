<template>
  <transition name="fade" v-if="activeModal">
    <div class="modals-wrapper vue-component">
      <component :is="activeModal"></component>
    </div>
  </transition>
</template>

<script>
import DemoModal from "../Lk/Courses/DemoPage/DemoModal.vue";
import CalendarModalVue from "../Calendar/CalendarModal.vue";

import { eventBus } from "@/main";

export default {
  name: "modals-wrapper",
  components: { DemoModal, CalendarModalVue },
  data: function() {
    return {
      activeModal: undefined
    };
  },
  props: [],
  computed: {},
  methods: {},
  created() {
    eventBus.$on("showModal", data => {
      this.activeModal = data.name;
    });
    eventBus.$on("closeModal", () => {
      this.activeModal = undefined;
    });
  }
};
</script>

<style scoped="scoped" lang="sass">
.modals-wrapper
  position: fixed
  top: 0
  left: 0
  display: flex
  width: 100%
  height: 100%
  padding: 20px
  line-height: 1.5
  background-color: rgba(85, 85, 85, 0.25)
  z-index: 9998
  overflow: hidden auto
.fade-enter-active, .fade-leave-active
  transition: opacity 0.2s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
