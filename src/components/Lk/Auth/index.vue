<template>
  <div class="auth vue-component d-flex align-center justify-center">
    <v-row class="d-flex front relative justify-center">
      <v-col cols="12" md="5">
        <v-card class="pa-5">
          <router-view />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "auth",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.auth
  height: calc(100vh - 64px)
</style>
