<template>
  <interlayer-vue class="faq-interlayer" :title="'Ответы на вопросы'">
    <div class="faq vue-component">
      <div class="faq__list">
        <template v-if="faq.length">
          <question
            class="faq__question"
            v-for="(question, i) in faq"
            :key="i"
            :question="question"
          />
        </template>
      </div>
    </div>
  </interlayer-vue>
</template>

<script>
import Question from "./Question.vue";
import InterlayerVue from "../Interlayer.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "faq",
  components: {
    Question,
    InterlayerVue
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
@import "@/assets/styles/variables.sass"

.faq-interlayer
  width: 100%
  height: 100%
  padding: 32px
  @media ($media_lg2)
    padding: 20px
  @media ($media_md)
    padding: 10px

.faq
  display: flex
  flex-direction: column

  &__list
    padding: 32px

  &__question + &__question
    margin-top: 24px
</style>
