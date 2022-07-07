<template>
  <div class="user-aside-progress vue-component">
    <div class="user-aside__head">
      <div class="user-aside__image">
        <img
          :src="user.avatar_link"
          alt="Ваше фото"
          class="user-aside__image-avatar"
        />
      </div>
      <div class="user-aside__title">{{ user.name }}</div>
      <div class="user-aside__add-info">{{ user.chat_auth_info.id }}</div>
      <div class="user-aside__add-info">Регистрация: 08.06.2021</div>
      {{ $route }}
    </div>
    <div class="user-aside__points">
      <scores-vue class="user-aside__scores" />
    </div>
    <div class="user-aside__progress">
      <div class="user-aside__progress-title">Прогресс курса:</div>
      <ProgressBarVue :fullWidth="true" :value="5" :numbers="10" />
    </div>
  </div>
</template>

<script>
import ScoresVue from "../../LessonComponents/Scores.vue";
import ProgressBarVue from "../ProgressBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "user-aside-progress",
  components: {
    ScoresVue,
    ProgressBarVue
  },
  data: function() {
    return {};
  },
  props: [],
  computed: {
    ...mapGetters(["user"])
  },
  methods: {},
  mounted() {
    console.log(this.user);
  }
};
</script>

<style scoped="scoped" lang="sass">
.user-aside
  &__head
    display: flex
    align-items: center
    flex-direction: column
  &__image
    width: 130px
    height: 130px
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: space-between
  &__image-avatar
    object-fit: contain
    width: 100%
    height: auto
  &__title
    padding-top: 16px
    font-size: 20px
    font-weight: 600
  &__add-info
    font-size: 14px
    font-weight: 500
    color: #808080
  &__add-info:first-child
    padding-top: 8px
  &__points
    padding-top: 40px
  &__scores
    justify-content: center
  &__progress
    padding-top: 32px
  &__progress-title
    font-size: 16px
    font-weight: 600
    letter: 2%
</style>
