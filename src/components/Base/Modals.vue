<template>
  <div class="modals vue-component">
    <signin />
    <report />
  </div>
</template>

<script>
import Signin from "@/components/Lk/Signin";
import Report from "@/components/Modals/Report";

export default {
  name: "modals",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    Signin,
    Report
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>
