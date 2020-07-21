<template>
  <div class="course-card vue-component">
    <v-card
      class="front course-card__card pa-5 d-flex justify-space-between flex-column"
      style="height: 100%"
    >
      <div>
        <router-link :to="'/lk/course/' + course.id" class="text-h6">{{
          course.title
        }}</router-link>
        <v-divider class="my-4"></v-divider>
        <div>{{ description }}</div>
        <v-divider class="my-4"></v-divider>
      </div>
      <v-btn large class="main-color main-color--text mt-4">
        Купить
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "course-card",
  data: function() {
    return {
      maxDescriptionSize: 20,
      description: []
    };
  },
  methods: {
    setDescription() {
      this.description = this.course.description
        .split(" ")
        .slice(0, this.maxDescriptionSize)
        .join(" ");
      if (this.course.description.split(" ").length > this.maxDescriptionSize) {
        this.description += " ...";
      }
    }
  },
  computed: {},
  components: {},
  props: ["course", "buy"],
  mixins: {},
  beforeMount() {
    this.setDescription();
  }
};
</script>

<style scoped="scoped" lang="sass">
.course-card
  height: 100%
  &__card
</style>
