<template>
  <upcoming
    :room="$route.params.room"
    :link="{
      name: 'private-room',
      params: {
        room: $route.params.room
      }
    }"
    class="private-upcoming vue-component"
  >
    <private-room-link :room="roomLink" />
  </upcoming>
</template>

<script>
import Upcoming from "@/components/Group/Upcoming";
import PrivateRoomLink from "@/components/LessonComponents/PrivateRoom/PrivateRoomLink";

export default {
  name: "private-upcoming",
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    roomLink() {
      return window.location.href;
    }
  },
  components: {
    Upcoming,
    PrivateRoomLink
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
