<template>
  <div class="edu-panel vue-component">
    <v-tabs color="orange accent-2" dark v-model="tab" fixed-tabs>
      <v-tab>Задания</v-tab>
      <v-tab>Чат</v-tab>
      <v-tab>Материалы урока</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <tasks />
      </v-tab-item>
      <v-tab-item>
        <text-chat />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import TextChat from "@/components/LessonComponents/Chat/Chat";
import { mapGetters } from "vuex";
import Tasks from "@/components/LessonComponents/Tasks/Tasks";

export default {
  name: "edu-panel",
  data: function() {
    return {
      tab: null
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["user"])
  },
  components: {
    TextChat,
    Tasks
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style lang="sass" scoped>
@import "@/components/Sass/Varibles.sass"

.edu-panel
  overflow: auto
</style>
