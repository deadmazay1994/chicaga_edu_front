<template>
  <div class="header-chat vue-component">
    <div class="header-chat__left">
      <div class="header-chat__name">
        <thumbnail alt="Профиль" :path="user.avatar_link" />
        <title-chat class="header-chat__title">{{ user.name }}</title-chat>
      </div>
    </div>
    <div class="header-chat__right">
      <v-btn
        class="header-chat__btn"
        large
        color="white--text"
        @click="toggleOpenChat"
        >{{ chatIsOpen ? "ЗАКРЫТЬ ЧАТ" : "ОТКРЫТЬ ЧАТ" }}</v-btn
      >
    </div>
  </div>
</template>

<script>
import Thumbnail from "./Thumbnail";
import TitleChat from "./Title";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "header-chat",
  methods: {
    ...mapMutations(["toggleOpenChat"])
  },
  computed: {
    ...mapGetters(["user", "chatIsOpen"])
  },
  components: {
    Thumbnail,
    TitleChat
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped">
.header-chat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px 20px;
  height: 74px;
}

.header-chat__name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.header-chat__right {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.header-chat__search {
  margin-right: 15px;
}
</style>

<style lang="sass" scoped>
@import "@/components/Sass/Varibles.sass"

.header-chat__btn
  background-color: $main_color !important
  margin: 0 10px
</style>
