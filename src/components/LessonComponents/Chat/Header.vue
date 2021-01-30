<template>
  <div class="header-chat vue-component">
    <div class="header-chat__left">
      <div class="header-chat__name">
        <thumbnail alt="Профиль" :path="user.avatar_link" />
        <title-chat class="header-chat__title">
          <template>
            {{ user.name }}
            <span v-show="newMsgsNum" class="header-chat__new-msgs-num">
              {{ newMsgsNum }}
            </span>
          </template>
        </title-chat>
      </div>
    </div>
    <div class="header-chat__right">
      <v-btn
        class="header-chat__btn"
        large
        color="white--text"
        @click="toggleChat"
        >{{ chatIsOpen ? "ЗАКРЫТЬ ЧАТ" : "ОТКРЫТЬ ЧАТ" }}</v-btn
      >
    </div>
  </div>
</template>

<script>
import Thumbnail from "./Thumbnail";
import TitleChat from "./Title";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "header-chat",
  methods: {
    ...mapMutations(["toggleOpenChat"]),
    ...mapActions(["scrollToBottom"]),
    toggleChat() {
      this.toggleOpenChat();
      this.scrollToBottom();
    }
  },
  computed: {
    ...mapGetters(["user", "chatIsOpen", "newMsgsNum"])
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

.header-chat
  &__btn
    background-color: $main_color !important
    margin: 0 10px
  &__new-msgs-num
    background: darken($main_color, 5%)
    width: 25px
    height: 25px
    display: inline-flex
    justify-content: center
    align-items: center
    color: $main_color--text
    border-radius: 100%
@media (max-width:480px)
  .header-chat
    &__btn
      margin:0
      height: 35px !important
</style>
