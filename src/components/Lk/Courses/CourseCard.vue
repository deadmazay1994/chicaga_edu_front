<template>
  <div class="course-card vue-component">
    <v-card
      class="front course-card__card pa-5 d-flex justify-space-between flex-column"
      style="height: 100%"
    >
      <div>
        <router-link :to="'/lk/course/' + course.id" class="text-h6">
          {{ course.name }}
        </router-link>
        <v-divider class="my-4"></v-divider>
        <div>{{ description }}</div>
      </div>
      <div v-if="!buy">
        <v-divider class="my-4"></v-divider>
        <div class="text-h5 main-color-text">{{ course.price }} &#8381;</div>
        <v-divider class="my-4"></v-divider>
        <v-btn large block @click="pay" class="main-color main-color--text mt-4"
          >Купить</v-btn
        >
      </div>
      <div v-else>
        <v-divider class="my-4"></v-divider>
        <progress-info
          :complite="course.current_step"
          :all="course.total_steps"
        />
      </div>
    </v-card>
  </div>
</template>

<script>
import ProgressInfo from "./ProgressInfo";
import api from "@/mixins/api";
import "@/mixins/methods";

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
  components: {
    ProgressInfo
  },
  props: ["course", "buy"],
  mixins: [api],
  beforeMount() {
    this.setDescription();
  }
};
</script>

<style scoped="scoped" lang="sass">
.course-card
  height: 100%
</style>
