<template>
  <div
    height="300px"
    class="masseges messages__content active custom_scroll vue-component"
    ref="masseges"
  >
    <massege
      v-for="(msg, i) in getCurrentMsgs"
      :key="i"
      :text="msg.msg"
      :author="msg.u.name"
      :avatar="'https://chat.edu.chicaga.ru/avatar/' + msg.u.username"
      :time="msg.time"
      :attachments="msg.attachments"
      role="executor"
    />
    <div class="loading" v-if="preload">
      <div></div>
    </div>
  </div>
</template>

<script>
import Massege from "./Massege";
// import Date from "./Date";

import { mapGetters } from "vuex";

export default {
  name: "masseges",
  data: function () {
    return {
      t: 1,
      users: [],
      loading: null,
    };
  },
  methods: {
    onScroll(e, trigger = 75) {
      if (e.target.scrollTop <= trigger && this.t != 0) {
        this.$store.dispatch("loadMoreMsg");
        this.t = 0;
      }
    },
  },
  computed: {
    ...mapGetters(["getCurrentMsgs", "getLoading", "preload"]),
  },
  components: {
    Massege,
  },
  props: [],
  mixins: {},
  mounted() {
    this.$refs.masseges.addEventListener("scroll", (e) => {
      this.onScroll(e);
    });
  },
};
</script>

<style scoped="scoped">
.masseges {
  padding: 20px;
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
  width: 100%;
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
.loading > div {
  max-width: 340px;
  padding: 10px;
  border-radius: 10px;
  background: #e0e0e0;
  height: 77px;
  margin-left: 45px;
  position: relative;
  z-index: 0;
  margin-bottom: 15px;
}
.loading > div::after {
  content: "";
  top: 0;
  transform: translateX(100%);
  width: 100%;
  height: 77px;
  position: absolute;
  z-index: 1;
  animation: slide 1s infinite;
  background: -moz-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(128, 186, 232, 0) 99%,
    rgba(125, 185, 232, 0) 100%
  ); /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0%, rgba(255, 255, 255, 0)),
    color-stop(50%, rgba(255, 255, 255, 0.8)),
    color-stop(99%, rgba(128, 186, 232, 0)),
    color-stop(100%, rgba(125, 185, 232, 0))
  ); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(128, 186, 232, 0) 99%,
    rgba(125, 185, 232, 0) 100%
  ); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(128, 186, 232, 0) 99%,
    rgba(125, 185, 232, 0) 100%
  ); /* Opera 11.10+ */
  background: -ms-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(128, 186, 232, 0) 99%,
    rgba(125, 185, 232, 0) 100%
  ); /* IE10+ */
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(128, 186, 232, 0) 99%,
    rgba(125, 185, 232, 0) 100%
  ); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#007db9e8',GradientType=1 );
}
@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
