<template>
  <div class="faq vue-component front relative">
    <v-container>
      <page-title :title="title" :subtitle="subtitle" />
      <div class="faq__questions">
        <v-row v-if="faq.length">
          <v-col cols="12" md="8" lg="6" v-for="(question, i) in faq" :key="i">
            <question class="faq__question" :question="question" />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col
            v-for="(i, j) in new Array(4)"
            :key="j"
            cols="12"
            md="8"
            lg="6"
          >
            <v-card class="front">
              <v-skeleton-loader type="article" />
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import Question from "./Question";

import PageTitle from "@/components/Base/PageTitle";

import { mapActions, mapGetters } from "vuex";
export default {
  name: "faq",
  data: function() {
    return {
      subtitle: "Частозадаваемые вопросы и ответы на них",
      title: "FAQ"
    };
  },
  methods: {
    ...mapActions(["setFaq"])
  },
  computed: {
    ...mapGetters(["faq"])
  },
  components: { PageTitle, Question },
  props: [],
  mixins: {},
  beforeMount() {
    this.setFaq();
  }
};
</script>

<style scoped="scoped" lang="sass">
.faq
  &__questions
    margin-top: 30px
</style>
