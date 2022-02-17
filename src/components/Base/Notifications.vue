<template>
  <div class="notifications">
    <div 
      v-for="(not, i) in notifications"
      :key="i"
      class="notification"
    >{{ notification.message }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Notifications",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["notifications"])
  }
};
</script>

<style lang="scss" scoped>

</style>