<template>
  <div class="dictionary vue-component">
    <page-title title="Словарь" />
    <v-row class="front relative">
      <v-col cols="12" sm="3" md="3" v-for="(words, i) in dictionary" :key="i">
        <v-card class="pa-5">
          <div>{{ words.en }}</div>
          <div>{{ words.ru }}</div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageTitle from "@/components/Base/PageTitle";

import { mapGetters } from "vuex";

export default {
  name: "dictionary",
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(["dictionary"])
  },
  components: {
    PageTitle
  },
  props: [],
  mixins: {},
  beforeMount() {
    this.$store.dispatch("getDictionary");
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
