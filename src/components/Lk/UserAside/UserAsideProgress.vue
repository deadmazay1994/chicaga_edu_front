<template>
  <div class="user-aside vue-component">
    <div class="user-aside__head">
      <div class="user-aside__avatar-box">
        <img
          :src="user.avatar_link"
          alt="Ваше фото"
          class="user-aside__avatar"
        />
      </div>
      <div class="user-aside__title">{{ user.name }}</div>
      <div class="user-aside__add-info">{{ user.chat_auth_info.id }}</div>
      <div class="user-aside__add-info">Регистрация: 08.06.2021</div>
    </div>
    <div class="user-aside__body">
      <div class="user-aside__points">
        <scores-vue class="user-aside__scores" />
      </div>
      <div class="user-aside__progress">
        <div class="user-aside__progress-title">Прогресс курса:</div>
        <ProgressBarVue :fullWidth="true" :value="5" :numbers="10" />
      </div>
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
@import "@/assets/styles/variables.sass"

.user-aside
  @media ($media_xl)
    display: flex
    align-items: center
    justify-content: center
    flex-wrap: wrap
  @media ($media_md2)
    display: block
  &__head
    display: flex
    flex-direction: column
    align-items: center
    @media ($media_xl)
      flex-basis: 50%
  &__avatar-box
    width: 130px
    height: 130px
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: space-between
    @media ($media_xl)
      width: 100px
      height: 100px
    @media ($media_md2)
      width: 80px
      height: 80px
  &__avatar
    object-fit: contain
    width: 100%
    height: auto
  &__title
    padding-top: 16px
    font-size: 20px
    font-weight: 600
    @media ($media_md2)
      padding-top: 8px
      font-size: 18px
  &__add-info
    font-size: 14px
    font-weight: 500
    color: #808080
  &__body
    padding-top: 40px
    @media ($media_xl)
      flex-basis: 50%
      padding-top: 0
    @media ($media_md2)
      padding-top: 8px
  &__scores
    justify-content: center
    @media ($media_xl)
      padding-right: 0
      padding-left: 0
  &__progress
    padding-top: 32px
    @media ($media_xl)
      padding-top: 16px
    @media ($media_md2)
      padding-top: 8px
  &__progress-title
    font-size: 16px
    font-weight: 600
    letter: 2%
</style>
