<template>
  <div class="masseges custom_scroll vue-component" ref="masseges">
    <massege
      v-for="(msg, i) in getCurrentMsgs"
      :key="i"
      :text="msg.msg"
      :author="msg.u.name"
      :avatar="msg.u.avatar"
      :time="msg.time"
      :attachments="msg.attachments"
      role="executor"
    />
    <pulse-loader
      class="masseges__loader"
      :loading="getLoading"
      color="#333"
      size="30px"
    ></pulse-loader>
    <!-- <div class="overlay"></div> -->
    <!-- <date date="Вторник, 23 января 2020" /> -->
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import Massege from "./Massege";
// import Date from "./Date";

import { mapGetters } from "vuex";

export default {
  name: "masseges",
  data: function() {
    return {
      t: 1,
      users: []
    };
  },
  methods: {
    onScroll(e, trigger = 75) {
      if (e.target.scrollTop <= trigger && this.t != 0) {
        this.$store.dispatch("loadMoreMsg");
        this.t = 0;
      }
    }
  },
  computed: mapGetters(["getCurrentMsgs", "getLoading"]),
  components: {
    Massege,
    // Date,
    PulseLoader
  },
  props: [],
  mixins: {},
  mounted() {
    this.$refs.masseges.addEventListener("scroll", e => {
      this.onScroll(e);
    });
  }
};
</script>

<style scoped="scoped">
.masseges {
  height: calc(80vh - 140px);
  padding: 20px;
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
}
.masseges__loader {
  position: absolute;
  top: 42%;
  left: 42%;
}
.overlay {
  width: 120%;
  height: 100%;
  background: #00000055;
  position: absolute;
  top: 0;
}
</style>
