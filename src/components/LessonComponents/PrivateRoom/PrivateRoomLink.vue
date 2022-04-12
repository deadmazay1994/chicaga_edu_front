<template>
  <div class="private-room-link">
    <router-link :to="room" ref="link">{{ room }}</router-link>
    <button class="copy" @click="copy()">Копировать</button>
  </div>
</template>

<script>
export default {
  name: "PrivateRoomLink",
  props: {
    room: String
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.$refs.link.to).then(() => {
        this.$store.commit("pushShuckbar", {
          success: true,
          val: "Ссылка скопирована в буфер обмена"
        });
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.private-room-link
  display: flex
  align-items: center
  justify-content: center
  padding: 2rem 1rem
  background-color: #f8f8f8
  border-radius: 12px

  .copy
    margin-left: 1rem
</style>
