<template>
  <div class="notifications">
    <transition-group name="notifications" tag="div">
      <div 
        v-for="(not, i) in snuckbarsActive"
        :key="i"
        class="notification"
        :class="not.state"
      >
        {{ not.val }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Notifications",
  computed: {
    ...mapGetters(["snuckbars", "snuckbarsActive"])
  },
  methods: {
    ...mapMutations(['pushShuckbar'])
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

.notifications-enter-active, .notifications-leave-active {
  transition: all .5s;
}

.notifications-enter, .notifications-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.default {
  border-color: #333333;
  background: #ffffff;
  color: #333333;
}

.success {
  border-color: #4caf50;
  background: #4caf50;
  color: #ffffff;
}

.error {
  border-color: #ff5252;
  background: #ff5252;
  color: #ffffff;
}
</style>