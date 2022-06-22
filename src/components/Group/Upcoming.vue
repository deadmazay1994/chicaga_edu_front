<template>
  <div class="private-upcoming vue-component">
    <div class="private-upcoming__inner">
      <div class="private-upcoming__part" v-if="showVideoChat">
        <web-cam
          :roomId="'presonal__' + (Math.random() + 1).toString(36).substring(7)"
          style="height: 100%"
        />
      </div>
      <div class="private-upcoming__part private-upcoming__part--right">
        <slot></slot>
        <prepare :disabled="disabled" :link="link">Присоедениться</prepare>
      </div>
    </div>
  </div>
</template>

<script>
import WebCam from "@/components/VideoChat";
import Prepare from "@/components/Group/Prepare.vue";

export default {
  name: "upcoming",
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    roomLink() {
      return window.location.href;
    }
  },
  components: {
    WebCam,
    Prepare
  },
  props: {
    link: {
      required: true
    },
    disabled: {
      default: false
    },
    showVideoChat: {
      default: true
    }
  },
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.private-upcoming
  &__inner
    display: flex
    width: 100%
    height: 100%
  &__part
    width: 50%
    height: 100%
  &__part--right
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
</style>
