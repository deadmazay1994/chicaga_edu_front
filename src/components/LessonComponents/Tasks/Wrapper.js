import { mapGetters, mapMutations } from "vuex";
import Methods from "@/mixins/tasks";

export const withTaskWrapper = Task => {
  return {
    functional: true,
    name: "WithLoggerButton",
    render(h, context) {
      console.log(context);
      return h(Task, context.children);
    },
    methods: {
      ...mapMutations(["saveTask"])
    },
    computed: {
      ...mapGetters(["socket", "teacherId"])
    },
    mixins: [Methods]
  };
};
