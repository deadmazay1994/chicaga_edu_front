<template>
  <div class="dict-add vue-component">
    <v-form class="d-flex align-center">
      <v-text-field
        label="RU"
        dense
        outlined
        background-color="white"
        hide-details
        class="dict-add__field rounded-0 rounded-l"
        v-model="dict.ru"
      ></v-text-field>
      <v-text-field
        label="EN"
        dense
        outlined
        background-color="white"
        hide-details
        class="dict-add__field rounded-0"
        v-model="dict.en"
      ></v-text-field>
      <v-btn
        @click="add"
        class="dict-add__add mx-2 pa-0 ml-0 rounded-0 rounded-r"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "dict-add",
  data: function() {
    return {
      dict: {
        en: "",
        ru: ""
      }
    };
  },
  methods: {
    addSnackbar() {
      if (this.dict.en.length == 0 && this.dict.ru.length == 0) {
        this.$store.commit("pushShuckbar", "Вы не указали не одного слова");
      } else if (this.dict.en.length == 0) {
        this.$store.commit(
          "pushShuckbar",
          "Вы не указлаи слово на английском языке"
        );
      } else if (this.dict.ru.length == 0) {
        this.$store.commit(
          "pushShuckbar",
          "Вы не указлаи слово на руссоком языке"
        );
      } else {
        this.$store.commit("pushShuckbar", "Слово успешно добавлено в словарь");
      }
    },
    add() {
      this.addSnackbar();
      this.dict = {
        en: "",
        ru: ""
      };
    }
  },
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.dict-add
  &__add
    height: 38px !important
    min-width: 38px !important
  &__field
    width: 150px
</style>
