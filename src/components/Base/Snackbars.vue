<template>
  <div class="shackbars vue-component">
    <v-snackbar
      v-for="(snack, i) in snuckbarsActive"
      :key="i"
      v-model="snack.active"
    >
      {{ snack.text }}
      <v-btn color="red" text @click="snack.active = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "shackbars",
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(["snuckbarsActive"])
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped"></style>
