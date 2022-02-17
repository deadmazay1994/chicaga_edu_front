<template>
  <div class="notifications">
    <button @click="pushNotification({message: 'hi'})">test</button>
    <div 
      v-for="(not, i) in getActiveNotifications"
      :key="i"
      class="notification success"
    >{{ not.message }}</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Notifications",
  data() {
    return {}
  },
  methods: {
    ...mapMutations(["pushNotification"])
  },
  computed: {
    ...mapGetters(["getNotifications", "getActiveNotifications"])
  }
};
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  padding: .5rem 1rem;
  min-width: 150px;
  border-radius: .5rem;
  border: 2px solid;
  background: #ffffff;
}
</style>