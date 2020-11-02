<template>
  <div class="navigation vue-component">
    <v-navigation-drawer
      fixed
      dark
      :expand-on-hover="true"
      class="navigation__drawer rounded-0 main-color"
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line class="px-0">
          <router-link to="/lk/settings">
            <v-list-item-avatar>
              <img :src="user.avatar_link" />
            </v-list-item-avatar>
          </router-link>
          <v-list-item-content>
            <router-link to="/lk/settings" class="white--text">
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <router-link to="/lk/catalog-coursers" class="white--text">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-book-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Каталог курсов</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/lk/my-coursers" class="white--text">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-book-open</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Мои курсы</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/lk/dictionary" class="white--text">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-book</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Словарь</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/lk/settings" class="white--text">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Настройки</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/faq" class="white--text">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-help-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Вопросы и ответы</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-divider></v-divider>
        <template v-if="user.role == 'teacher'">
          <router-link to="/course-list-teacher" class="white--text">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-clipboard-check</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Результаты</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </template>
        <v-list-item link class="mt-3" @click="exit">
          <v-list-item-icon>
            <v-icon>mdi-account-cancel</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "navigation",
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["logout"]),
    exit() {
      this.logout();
      this.$router.push("/auth/login");
      this.$store.commit("pushShuckbar", {
        val: "Вы успешно вышли из личного кабинета",
        success: true
      });
    }
  },
  computed: {
    ...mapGetters(["user", "draver"])
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.navigation
  &__drawer
    height: 100vh
    top: 64px !important
</style>
