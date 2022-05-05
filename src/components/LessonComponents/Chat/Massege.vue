<template>
  <div
    class="messages__item"
    :class="{ 'messages__item--left': isUserMessage }"
  >
    <div class="messages__author-img-block" v-if="!isUserMessage">
      <img class="messages__author-img" :src="avatar" alt="Avatar" />
    </div>
    <div class="messages__message">
      <div style="display: flex; justify-content: space-between">
        <h4 v-if="!isUserMessage" class="message__author">
          {{ author || "Пользователь" }}
        </h4>
        {{ time }}
      </div>
      <p class="message__text">{{ text }}</p>
      <attachments :attachments="attachments" />
    </div>
  </div>
  <!--  <div class="massege vue-component">-->
  <!--    <avatar class="massege__avatar" :path="avatar" />-->
  <!--    <div class="content__massege content-massege">-->
  <!--      <div class="content-massege__info">-->
  <!--        <title-chat class="content-massege__user">-->
  <!--          {{ author || "Пользователь" }}-->
  <!--        </title-chat>-->
  <!--        <div class="content-massege__time">{{ time }}</div>-->
  <!--      </div>-->
  <!--      <div class="text__content-massege">{{ text }}</div>-->
  <!--      <attachments :attachments="attachments" />-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
// import Avatar from "./Thumbnail";
// import TitleChat from "./Title";
import Attachments from "./Attachments";

import { mapGetters } from "vuex";

export default {
  name: "massege",
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(["user"]),
    isUserMessage() {
      return this.user.chat_auth_info.name === this.author;
    }
  },
  components: {
    // Avatar,
    // TitleChat,
    Attachments
  },
  props: ["avatar", "author", "time", "role", "text", "attachments"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.messages__item
  display: flex
  align-items: flex-end
  margin-bottom: 15px

  &--left
    justify-content: flex-end

    .messages__message
      background: #FCDBE3
      border-radius: 10px 10px 0px 10px

      &::before
        border-left: 1rem solid #FCDBE3
        border-bottom-right-radius: 0
        left: auto
        right: -0.35rem

      &::after
        left: auto
        right: -40px
        border-bottom-right-radius: 0
        border-bottom-left-radius: 0.5rem

.messages__message
  flex-grow: 1
  background: #f8f8f8
  border-radius: 10px 10px 10px 0px
  position: relative
  padding: 10px 25px 10px 10px
  max-width: 70%

  &::before,
  &::after
    bottom: -0.1rem
    content: ""
    height: 1rem
    position: absolute

  &::before
    border-bottom-right-radius: 0.8rem 0.7rem
    border-left: 1rem solid #f8f8f8
    left: -0.35rem
    bottom: 0px

  &::after
    background-color: #fff
    border-bottom-right-radius: 0.5rem
    left: 20px
    transform: translate(-30px, -2px)
    width: 10px

.massege
  display: flex
  margin-bottom: 20px

.massege:last-child
  margin-bottom: 0

.massege__avatar
  min-width: 50px

.content__massege
  width: 90%

.content-massege__info
  display: flex
  justify-content: space-between
  flex-wrap: wrap

  .content-massege__time
  color: $main_color

.content-massege__user
  display: flex
  width: 80%

.text__content-massege
  word-wrap: wrap

.message__author,
.message__text
  font-family: sf-ui, sans-serif

.message__text
  font-weight: 500
  font-size: 12px
  margin-bottom: 0
  line-height: 14.32px

.message__author
  color: rgba(255, 0, 0, .8)
  margin-bottom: 5px
  font-weight: 600
  font-size: 12px
  line-height: 14.32px

.message__link
  text-decoration: underline
  color: #598aeb
</style>
