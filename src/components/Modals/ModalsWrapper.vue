<template>
  <transition name="fade" v-if="activeModal">
    <div class="modals-wrapper vue-component">
      <component
        :is="activeModal"
        :modalData="modalData"
        v-click-outside="onClickOutside"
      ></component>
    </div>
  </transition>
</template>

<script>
// Вызывать все модальные окна здесь
import DemoModal from "../Lk/Courses/DemoPage/DemoModal.vue";
import CalendarModal from "@/components/Calendar/CalendarModal.vue";

import vClickOutside from "v-click-outside";

import { eventBus } from "@/main";

export default {
  name: "modals-wrapper",
  components: { DemoModal, CalendarModal },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data: function() {
    return {
      activeModal: undefined,
      modalData: {}
    };
  },
  props: [],
  computed: {},
  methods: {
    onClickOutside() {
      this.activeModal = false;
    }
  },
  created() {
    eventBus.$on("showModal", data => {
      this.activeModal = data.name;
      if (data.data) this.modalData = data.data;
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
  z-index: 9999
  overflow: hidden auto
.fade-enter-active, .fade-leave-active
  transition: opacity 0.2s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
