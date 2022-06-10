<template>
  <div class="messages__header">
    <p class="messages__number-of-members">
      Чат
      <span class="number-of-members__number"
        >({{ this.usersInChat }} участника)</span
      >
    </p>
    <!-- <div class="messages__img">
      <div class="messages__avatar-block">
        <div class="messages__avatar-inner">
          <img
            class="messages__avatar"
            src="@/assets/imgs/lessons/messages-avatars/messages-img1.png"
            alt=""
          />
        </div>
      </div>

      <div class="messages__avatar-block">
        <div class="messages__avatar-inner">
          <img
            class="messages__avatar"
            src="@/assets/imgs/lessons/messages-avatars/messages-img2.png"
            alt=""
          />
        </div>
      </div>

      <div class="messages__avatar-block">
        <div class="messages__avatar-inner">
          <img
            class="messages__avatar"
            src="@/assets/imgs/lessons/messages-avatars/messages-img3.png"
            alt=""
          />
        </div>
      </div>

      <div class="messages__avatar-block">
        <div class="messages__avatar-inner">
          <img
            class="messages__avatar"
            src="@/assets/imgs/lessons/messages-avatars/messages-img4.png"
            alt=""
          />
        </div>
      </div>
    </div> -->
  </div>
  <!--  <div class="header-chat vue-component">-->
  <!--    <div class="header-chat__left">-->
  <!--      <div class="header-chat__name">-->
  <!--        <thumbnail alt="Профиль" :path="user.avatar_link" />-->
  <!--        <title-chat class="header-chat__title">-->
  <!--          <template>-->
  <!--            {{ user.name }}-->
  <!--            <span v-show="newMsgsNum" class="header-chat__new-msgs-num">-->
  <!--              {{ newMsgsNum }}-->
  <!--            </span>-->
  <!--          </template>-->
  <!--        </title-chat>-->
  <!--      </div>-->
  <!--    </div>-->

  <!--  </div>-->
</template>

<script>
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
    ...mapGetters(["user", "chatIsOpen", "newMsgsNum", "socketUsers"]),
    usersInChat() {
      return this.socketUsers.length ? this.socketUsers.length + 1 : 1;
    }
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style>
.messages__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid hsla(0, 0%, 50%, .1);
  padding-bottom: 13px
}

.messages__header--hidden {
  margin-top: 5px;
  padding: 15px 0;
  border-top: 2px solid hsla(0, 0%, 50%, .1)
}

.messages__number-of-members {
  font-family: Manrope, sans-serif;
  font-weight: 700;
  font-size: 14px
}

.messages__number-of-members--private {
  cursor: pointer;
  position: relative
}

.messages__number-of-members-btns {
  content: "Позвать в приватную комнату";
  position: absolute;
  bottom: -50px;
  left: 0;
  z-index: 10;
  background: #f8f8f8;
  border: 1.5px solid red;
  color: #000;
  border-radius: 5px;
  width: 155px;
  font-family: Manrope, sans-serif;
  font-weight: 500;
  font-size: 12px;
  display: none
}

.messages__number-of-members-btns p {
  padding: 5px
}

.messages__number-of-members-btns p:last-child {
  margin-bottom: 0
}

.messages__number-of-members-btns p:hover {
  background: #dfdfdf
}

.messages__number-of-members-btns.active {
  display: block
}
</style>

<!--<style scoped="scoped">-->
<!--.header-chat {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  flex-wrap: wrap;-->
<!--  padding: 15px 20px;-->
<!--  height: 74px;-->
<!--}-->

<!--.header-chat__name {-->
<!--  display: flex;-->
<!--  flex-wrap: wrap;-->
<!--  align-items: center;-->
<!--}-->
<!--.header-chat__right {-->
<!--  display: flex;-->
<!--  flex-wrap: wrap;-->
<!--  align-items: center;-->
<!--}-->
<!--.header-chat__search {-->
<!--  margin-right: 15px;-->
<!--}-->
<!--</style>-->

<!--<style lang="sass" scoped>-->
<!--@import "@/assets/styles/variables.sass"-->

<!--.header-chat-->
<!--  &__btn-->
<!--    background-color: $main_color !important-->
<!--    margin: 0 10px-->
<!--  &__new-msgs-num-->
<!--    background: darken($main_color, 5%)-->
<!--    width: 25px-->
<!--    height: 25px-->
<!--    display: inline-flex-->
<!--    justify-content: center-->
<!--    align-items: center-->
<!--    color: $main_color&#45;&#45;text-->
<!--    border-radius: 100%-->
<!--@media (max-width:480px)-->
<!--  .header-chat-->
<!--    &__btn-->
<!--      margin:0-->
<!--      height: 35px !important-->
<!--</style>-->
