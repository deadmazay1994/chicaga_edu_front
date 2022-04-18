<template>
  <div class="notifications">
    <transition name="notifications" tag="div">
      <div
        v-for="(not, i) in snuckbarsActive"
        :key="i"
        class="notification"
        :class="not.state"
      >
        <close
          color="white"
          class="lightbox__close"
          @click.native="not.active = false"
        />
        {{ not.val }}
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Close from "@/components/Icons/Close";

export default {
  name: "Notifications",
  components: { Close },
  computed: {
    ...mapGetters(["snuckbars", "snuckbarsActive"])
  }
};
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  min-width: 150px;
  border-radius: 0.5rem;
  border: 2px solid;
  background: #ffffff;
  z-index: 9999;

  .lightbox__close {
    cursor: pointer;
    width: 12px;
    position: absolute;
    right: 0.45rem;
    top: 0.2rem;
  }
}

.notifications-enter-active,
.notifications-leave-active {
  transition: all 0.5s;
}

.notifications-enter,
.notifications-leave-to {
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
