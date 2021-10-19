<template>
  <div class="messages__item">
    <div class="messages__author-img-block">
      <img class="messages__author-img" :src="avatar" alt="Avatar" />
    </div>

    <div class="messages__message">
      <div style="display: flex; justify-content: space-between">
        <h4 class="message__author">{{ aut0hor || "Пользователь" }}</h4>
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
    ...mapGetters(["user"])
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
@import "@/components/Sass/Varibles.sass"

.massege
  display: flex
  margin-bottom: 20px

.massege:last-child
  margin-bottom: 0

.massege__avatar
  min-width: 50px

.content__massege
  width: 90%

.massege__author
  color: #96aeba
  font-size: 0.9rem
  margin-left: 7px

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
</style>
