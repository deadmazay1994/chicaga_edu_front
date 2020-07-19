<template>
  <div class="massege vue-component">
    <avatar class="massege__avatar" :path="avatar" />
    <div class="content__massege content-massege">
      <div class="content-massege__info">
        <title-chat class="content-massege__user">
          {{ role }}
          <div class="massege__author">{{ author }}</div>
        </title-chat>
        <div class="content-massege__time">{{ time }}</div>
      </div>
      <div class="text__content-massege">{{ text }}</div>
      <attachments :attachments="attachments" />
    </div>
  </div>
</template>

<script>
import Avatar from "./Thumbnail";
import TitleChat from "./Title";
import Attachments from "./Attachments";

export default {
  name: "massege",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    Avatar,
    TitleChat,
    Attachments
  },
  props: ["avatar", "author", "time", "role", "text", "attachments"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped">
.massege {
  display: flex;
  margin-bottom: 20px;
}
.massege:last-child {
  margin-bottom: 0;
}
.massege__avatar {
  min-width: 50px;
}
.content__massege {
  width: 90%;
}
.massege__author {
  color: #96aeba;
  font-size: 0.9rem;
  margin-left: 7px;
}
.content-massege__info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.content-massege__time {
  color: #96aeba;
}
.content-massege__user {
  display: flex;
  width: 80%;
}
.text__content-massege {
  word-wrap: wrap;
}
</style>
