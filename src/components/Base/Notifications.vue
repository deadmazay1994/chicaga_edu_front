<template>
  <div class="notification">
    <button @click="test()">test</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Notifications",
  computed: {
    ...mapGetters(["snuckbars", "snuckbarsActive"])
  },
  methods: {
    test() {
      this.$toast("I'm a toast!");
    }
  }
};
</script>
