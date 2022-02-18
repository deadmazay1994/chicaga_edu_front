<template>
  <component :is="layout">
    <router-view />
    <snuckbars />
  </component>
</template>

<script>
import Snuckbars from "@/components/Base/Snackbars";
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    },
  },
  components: {
    Snuckbars,
  },
};
</script>

<style>
body,
html {
  height: auto !important;
}
.red-btn {
  cursor: pointer;
  pointer-events: all !important;
  background: rgba(255, 53, 53);
  border-radius: 40px;
  padding: 1rem;
  transition: all .5s ease;
  color: #ffffff;
  -webkit-box-shadow: 3px 3px 15px 3px #FFFFFF80 inset;
  -moz-box-shadow: 3px 3px 15px 3px #FFFFFF80 inset;
  box-shadow: 3px 3px 15px 3px #FFFFFF80 inset;
  text-align: center;
  font-style: normal;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.18em;
  max-width: 315px;
  width: 100%;
}
.red-btn:disabled,
.red-btn[disabled] {
  background: #FAB5B4;
  -webkit-box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
  -moz-box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
  box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
  pointer-events: none;
}
</style>
