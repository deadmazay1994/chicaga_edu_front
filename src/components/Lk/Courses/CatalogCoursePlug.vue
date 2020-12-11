<template>
  <div class="catalog-course-plug vue-component">
    <v-row>
      <v-col v-for="(i, k) in new Array(9)" :key="k" cols="12" lg="4">
        <v-card>
          <v-skeleton-loader
            class="front relative"
            type="article@2"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "catalog-course-plug",
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
