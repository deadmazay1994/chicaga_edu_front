<template>
  <div class="faq vue-component">
    <template v-if="faq.length">
      <question
        class="faq__question"
        v-for="(question, i) in faq"
        :key="i"
        :question="question"
      />
    </template>
  </div>
</template>

<script>
import Question from "./Question.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "faq",
  components: {
    Question
  },
  data: function() {
    return {
      subtitle: "Частозадаваемые вопросы и ответы на них",
      title: "FAQ"
    };
  },
  props: [],
  computed: {
    ...mapGetters(["faq"])
  },
  methods: {
    ...mapActions(["setFaq"])
  },
  beforeMount() {
    this.setFaq();
  }
};
</script>

<style scoped="scoped" lang="sass">
.faq
  display: flex
  flex-direction: column
  padding-top: 32px
  padding-right: 33px
  padding-left: 31px

  &__question + &__question
    margin-top: 24px
</style>
