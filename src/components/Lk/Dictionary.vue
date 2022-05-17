<template>
  <div class="dictionary vue-component">
    <v-row v-if="!dictLoaded">
      <v-col v-for="(i, j) in new Array(16)" :key="j" cols="3">
        <v-card class="front">
          <v-skeleton-loader type="article" />
        </v-card>
      </v-col>
    </v-row>
    <v-row class="front relative" v-if="dictionary.length">
      <v-col cols="12" sm="3" md="3" v-for="(words, i) in dictionary" :key="i">
        <v-card class="pa-5 relative">
          <div>{{ words.transcription }}</div>
          <div>{{ words.word }}</div>
          <v-icon class="dictionary__remove" @click="remove(words.id)"
            >mdi mdi-bookmark-remove</v-icon
          >
        </v-card>
      </v-col>
    </v-row>
    <div
      v-else-if="dictLoaded"
      class="front relative text-h4 mt-15 text-center"
    >
      Ваш словарь пуст
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "dictionary",
  data: function() {
    return {};
  },
  methods: {
    remove(id) {
      this.$store.dispatch("deleteWordFromDict", id);
    }
  },
  computed: {
    ...mapGetters(["dictionary", "dictLoaded"])
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {
    this.$store.dispatch("getDictionary");
  }
};
</script>

<style scoped="scoped" lang="sass">
.dictionary
  &__remove
    position: absolute
    right: 10px
    top: 10px
    cursor: pointer
</style>
