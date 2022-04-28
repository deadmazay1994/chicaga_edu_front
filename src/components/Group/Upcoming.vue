<template>
  <div class="private-upcoming vue-component">
    <div
      class="row"
      style="width: 100%; height: 100%; display: flex; justify-content: center"
    >
      <div class="col-md-6 col-sm-12" v-if="showVideoChat">
        <web-cam
          :roomId="'presonal__' + (Math.random() + 1).toString(36).substring(7)"
          style="height: 100%"
        />
      </div>
      <div class="col-md-6 col-sm-12 private-ipcoming__right">
        <slot></slot>
        <prepare :disabled="disabled" :link="link">Присоедениться</prepare>
      </div>
    </div>
  </div>
</template>

<script>
import WebCam from "@/components/LessonComponents/WebCam/WebCam";
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
.private-ipcoming
  &__right
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
</style>
