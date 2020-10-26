import { mapGetters } from "vuex";

// В зависимости от некторых переменных возращает нужные таски
export default {
  methods: {
    getContext() {
      if (this.getActualTasks()) {
        return this.getActualTasks()[this.activeGroup].tasks;
      } else {
        return [];
      }
    },
    getActualTasks() {
      // Определяет есть ли сохраннёные таски и что это дз или урок
      let res = this.input;
      if (
        (!this.saved.length && this.type == "lesson") ||
        (!this.savedHomework.length && this.type == "homework")
      ) {
        res = this.input;
      } else if (this.saved.length && this.type == "lesson") {
        res = this.saved;
      } else if (this.savedHomework.length && this.type == "homework") {
        res = this.savedHomework;
      }
      return res;
    }
  },
  computed: {
    ...mapGetters(["activeGroupLesson", "activeGroupHomework"]),
    activeGroup() {
      let index = 0;
      if (this.type == "lesson") index = this.activeGroupLesson;
      else if (this.type == "homework") index = this.activeGroupHomework;
      return index;
    }
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
