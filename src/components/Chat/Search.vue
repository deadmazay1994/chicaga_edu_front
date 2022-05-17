<template>
  <input class="search" placeholder="Поиск" type="search" @input="search" />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "search-chat",
  data: function() {
    return {};
  },
  methods: {
    search(e) {
      if (e.target.value.length >= 3) {
        this.$store.commit("updateSearchStatus", 1);
        this.$store.dispatch("searchMsg", e.target.value);
      } else if (e.target.value.length == 0) {
        this.$store.commit("updateSearchStatus", 0);
        this.$store.commit("updateCurrentMsgs", this.$store.getters.getRoom);
      }
    }
  },
  computed: mapGetters(["getSearchText"]),
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped">
.search {
  border-radius: 70px;
  padding: 10px 12px;
  width: 150px;
  border: 1px solid #e3eaee;
  outline: none;
}
</style>
