<template>
  <div class="header-chat vue-component">
    <div class="header-chat__left">
      <div class="header-chat__name">
        <thumbnail
          alt="Профиль"
          path="https://image.shutterstock.com/image-vector/profile-placeholder-image-gray-silhouette-260nw-1153673752.jpg"
        />
        <title-chat class="header-chat__title">{{ getRoom }}</title-chat>
      </div>
    </div>
    <div class="header-chat__right">
      <search class="header-chat__search"></search>
      <button-chat>Закрыть</button-chat>
    </div>
  </div>
</template>

<script>
import Thumbnail from "./Thumbnail";
import Search from "./Search";
import TitleChat from "./Title";
import ButtonChat from "./Button";

import { mapGetters } from "vuex";

export default {
  name: "header-chat",
  methods: {},
  computed: mapGetters(["getRoom"]),
  components: {
    Thumbnail,
    Search,
    TitleChat,
    ButtonChat
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
  border-bottom: 1px solid #e3eaee;
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
