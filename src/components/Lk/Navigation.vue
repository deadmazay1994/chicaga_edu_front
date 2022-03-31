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
      @click.native="clicked()"
      >Каталог курсов</router-link
    >
    <router-link
      style="color: #0d0d0d"
      :class="
        $route.path === '/lk/my-coursers' ? 'nav__link active' : 'nav__link'
      "
      to="/lk/my-coursers"
      @click.native="clicked()"
      >Мои курсы</router-link
    >
    <router-link
      style="color: #0d0d0d"
      :class="
        $route.path === '/lk/my-groups' ? 'nav__link active' : 'nav__link'
      "
      to="/lk/my-groups"
      @click.native="clicked()"
      >Вебинары</router-link
    >
    <!-- Добавить маршрут -->
    <router-link
      style="color: #0d0d0d"
      :class="
        $route.path === '/lk/my-groups' ? 'nav__link active' : 'nav__link'
      "
      to="/lk/my-groups"
      @click.native="clicked()"
      >Уроки</router-link
    >
    <!-- Добавить маршрут -->
    <router-link
      style="color: #0d0d0d"
      :class="
        $route.path === '/lk/dictionary' ? 'nav__link active' : 'nav__link'
      "
      to="/lk/dictionary"
      @click.native="clicked()"
      >Словарь</router-link
    >
    <router-link
      style="color: #0d0d0d"
      :class="$route.path === '/lk/settings' ? 'nav__link active' : 'nav__link'"
      to="/lk/settings"
      @click.native="clicked()"
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
      @click.native="clicked()"
      >Результаты</router-link
    >
    <router-link
      style="color: #0d0d0d"
      :class="$route.path === '/faq' ? 'nav__link active' : 'nav__link'"
      to="/faq"
      @click.native="clicked()"
      >Вопросы и ответы</router-link
    >
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

.menu__nav
  margin-top: 50px
  width: 242px

  @media (max-width: 1100px)
    &
      margin-top: 30px

  .nav__link
    position: relative
    overflow: hidden
    display: block
    padding: 14px 50px 14px 13px
    font-size: 16px

    @media (max-width: 1460px)
      &
        display: flex
        flex-direction: column
    @media (max-width: 1300px)
      &
        padding: 15px
        display: inline-block
    @media (max-width: 1100px)
      &
        padding: 10px 15px

    &.active
      background: hsla(0, 0%, 50%, .1)
      border-radius: 5px
      width: 100%

    &.active::after
      content: ""
      position: absolute
      width: 5px
      height: 100%
      top: 0
      left: 0
      background: red

  @media (max-width: 992px)
    &
      position: absolute
      right: 0
      top: 39px
      background: #fff
      height: 100vh
      transition: 0.5s
      transform: translateX(120%)
</style>
