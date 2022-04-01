<template>
  <div class="private-waiting-room">
    <upcoming
      :room="this.$route.path + link"
      :roomId="user.id"
      :showComponent="true"
    />
  </div>
</template>

<script>
import Upcoming from "@/components/Group/Upcoming";
import { mapGetters } from "vuex";

export default {
  name: "PrivateWaitingRoom",
  components: {
    Upcoming
    // WebCam
  },
  computed: {
    ...mapGetters(["user"]),
    location() {
      return document.location.href;
    },
    link() {
      return String(this.user.id) + String(Math.floor(Math.random() * 1000));
    }
  },
  methods: {
    createRoom() {
      return;
    }
  }
};
</script>

<style lang="sass" scoped>
.create-room
  display: flex
  align-items: center

  .block--left,
  .block--right
    flex: 1

  .block--right
    display: flex
    align-items: center
    flex-direction: column
</style>
