<template>
  <div class="navigation">
    <template v-for="(item, k) in links">
      <router-link
        :key="k"
        :to="item.url + (item.params ? item.params() : '')"
        class="router-link"
        v-if="item.showCondition ? item.showCondition() : false"
      >
        <img :src="item.src" :alt="item.name" />
      </router-link>
    </template>
    <span class="router-link exit-link" @click="exit()">
      <img src="@/assets/svg/exit.svg" alt="Выйти" />
    </span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      links: [
        {
          name: "Каталог курсов",
          url: "/lk/catalog-coursers",
          src: require("@/assets/svg/courses.svg"),
          showCondition: () => true
        },
        {
          name: "Мои курсы",
          url: "/lk/my-coursers",
          src: require("@/assets/svg/education.svg"),
          showCondition: () => true
        },
        {
          name: "Вебинары",
          url: "/lk/webinars",
          src: require("@/assets/svg/group.svg"),
          showCondition: () => true
        },
        {
          name: "Уроки",
          url: "/lk/my-groups",
          src: require("@/assets/svg/book.svg"),
          showCondition: () => true
        },
        { name: "Словарь", url: "#", src: require("@/assets/svg/book.svg") },
        {
          name: "Настройки",
          url: "/lk/settings",
          src: require("@/assets/svg/settings.svg"),
          showCondition: () => true
        },
        {
          name: "Вопросы и ответы",
          url: "/faq",
          src: require("@/assets/svg/question.svg"),
          showCondition: () => true
        },
        {
          name: "Создать комнату",
          url: "/conference/",
          params: () => {
            return this.generateRoomId;
          },
          src: require("@/assets/svg/question.svg"),
          showCondition: () => {
            return this.user.role === "teacher";
          }
        }
      ],
      mobileDetected: false
    };
  },
  props: ["mobilemenuopen"],
  computed: {
    ...mapGetters(["user", "draver"]),
    access() {
      // предоставить доступ только учителю
      return this.user.role == "teacher";
    },
    draverComputed: {
      get() {
        return this.draver;
      },
      set(value) {
        this.setDraverState(value);
      }
    },
    generateRoomId() {
      return (
        String(this.user.id) +
        "__" +
        (Math.random() + 1).toString(36).substring(7)
      );
    }
  },
  methods: {
    ...mapMutations(["logout", "setDraverState"]),
    exit() {
      this.logout();
      this.$router.push("/auth/login");
      this.$store.commit("pushShuckbar", {
        val: "Вы успешно вышли из личного кабинета",
        success: true
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.navigation
  display: flex
  align-items: center
  flex-direction: column

  .router-link
    width: 47px
    height: 47px
    display: flex
    align-items: center
    justify-content: center
    background: #fff
    border-radius: 15px
    margin-top: 12px
    transition: all .15s ease-in-out

    &-active
      box-shadow: inset 3px 0px 1px rgba(147, 43, 31, 0.5)
    &:hover
      background: #D9D9D9

  .exit-link
    cursor: pointer
</style>
