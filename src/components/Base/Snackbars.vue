<template>
  <div class="shackbars vue-component">
    <v-snackbar
      v-for="(snack, i) in snuckbarsActive"
      :key="i"
      :color="snack.success ? 'success ' : ''"
      v-model="snack.active"
    >
      {{ snack.val }}
      <v-btn
        :color="snack.success ? 'white' : 'error'"
        text
        @click="snack.active = false"
        >Закрыть</v-btn
      >
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
