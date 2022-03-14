<template>
  <div class="messages__header" @click="toggleChat">
    <p class="messages__number-of-members">
      Чат <span class="number-of-members__number">(4 участника)</span>
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
    },
  },
  computed: {
    ...mapGetters(["user", "chatIsOpen", "newMsgsNum"]),
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {},
};
</script>

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
