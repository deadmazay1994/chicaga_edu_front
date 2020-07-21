<template>
  <div class="lk vue-component">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "lk",
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

<style scoped="scoped" lang="sass"></style>
