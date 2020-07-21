<template>
  <div class="signin vue-component">
    <v-dialog v-model="signInOpen" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Вход</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formdata.username"
                  required
                  label="Логин"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn @click="login(formdata)">Войти</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "signin",
  data: function() {
    return {
      formdata: {}
    };
  },
  methods: {
    ...mapActions(["login"])
  },
  computed: {
    ...mapGetters(["user"]),
    signInOpen: {
      get() {
        return this.$store.state.modals.signInOpen;
      },
      set(value) {
        this.$store.commit("setStateSignIn", value);
        this.$store.commit("hiddenSignIn");
      }
    }
  },
  components: {},
  props: [],
  mixins: {},
  mounted() {
    this.login({
      username: "Имя пользователя",
      avatar: ""
    });
  }
};
</script>

<style scoped="scoped"></style>
