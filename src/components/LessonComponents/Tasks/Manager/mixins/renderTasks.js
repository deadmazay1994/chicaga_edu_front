import { mapGetters } from "vuex";

export default {
  methods: {
    renderTasks(groups, manager) {
      let renderedGrops = [];
      groups.forEach((group, index) => {
        // Таски в каждой группе обрабатываем отедльно
        if (group.tasks) {
          let rendered = [];
          for (let index in group.tasks) {
            const task = group.tasks[index];
            // Если это не сохраненный таск
            if (!task.inputCopy) {
              rendered.push(manager(task, task.type, index));
            } else {
              rendered.push(manager(task, task.inputCopy.type, index));
            }
          }
          // Если данная группа выбрана, то выводим ее
          renderedGrops.push(
            <div v-show={this.activeGroup == index}>{rendered}</div>
          );
        }
      });
      return renderedGrops;
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
