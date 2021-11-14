<template>
  <nav class="menu__nav" :class="{ 'mobile-active': mobilemenuopen }">
    <router-link
      style="color: #0d0d0d"
      :class="
        $route.path === '/lk/catalog-coursers'
          ? 'nav__link active'
          : 'nav__link'
      "
      to="/lk/catalog-coursers"
      >Каталог курсов</router-link
    >
    <router-link
      style="color: #0d0d0d"
      :class="
        $route.path === '/lk/my-coursers' ? 'nav__link active' : 'nav__link'
      "
      to="/lk/my-coursers"
      >Мои курсы</router-link
    >
    <router-link
      style="color: #0d0d0d"
      :class="
        $route.path === '/lk/my-groups/' ? 'nav__link active' : 'nav__link'
      "
      to="/lk/my-groups"
      >Мои группы</router-link
    >
    <router-link
      style="color: #0d0d0d"
      :class="
        $route.path === '/lk/dictionary' ? 'nav__link active' : 'nav__link'
      "
      to="/lk/dictionary"
      >Словарь</router-link
    >
    <router-link
      style="color: #0d0d0d"
      :class="$route.path === '/lk/settings' ? 'nav__link active' : 'nav__link'"
      to="/lk/settings"
      >Настройки</router-link
    >
    <router-link
      style="color: #0d0d0d"
      v-if="user.role == 'teacher'"
      :class="
        $route.path === '/course-list-teacher'
          ? 'nav__link active'
          : 'nav__link'
      "
      to="/course-list-teacher"
      >Результаты</router-link
    >
    <router-link
      style="color: #0d0d0d"
      :class="$route.path === '/faq' ? 'nav__link active' : 'nav__link'"
      to="/faq"
      >Вопросы и ответы</router-link
    >
    <button class="nav__link" @click="exit">Выйти</button>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "navigation",
  data: function() {
    return {
      mobileDetected: false
    };
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
    },
    toggleDraverByWindowSize() {
      if (window.innerWidth >= 1200) {
        this.mobileDetected = false;
        this.setDraverState(true);
      } else {
        this.mobileDetected = true;
        this.setDraverState(false);
      }
    }
  },
  computed: {
    ...mapGetters(["user", "draver"]),
    draverComputed: {
      get() {
        return this.draver;
      },
      set(value) {
        this.setDraverState(value);
      }
    }
  },
  components: {},
  props: ["mobilemenuopen"],
  mixins: {},
  beforeMount() {
    this.toggleDraverByWindowSize();
  },
  created() {
    document.onresize = () => {
      this.toggleDraverByWindowSize();
    };
  }
};
</script>

<style scoped="scoped" lang="sass">
.navigation
  &__drawer
    height: 100vh
    top: 64px !important
.navigation__drawer
  @media (max-width: 1200px)
    margin-top: -65px
.nav__link
  padding-left: 13px
.menu__nav
  width: 242px
</style>
