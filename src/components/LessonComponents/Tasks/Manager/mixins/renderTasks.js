import { mapGetters } from "vuex";

export default {
  methods: {
    renderTasks(groups, manager) {
      let renderedGrops = [];
      let taskIndex = 0;
      groups.forEach((group, gropIndex) => {
        // Таски в каждой группе обрабатываем отедльно
        if (group.tasks) {
          let rendered = [];
          for (let index in group.tasks) {
            const task = group.tasks[index];
            // Если это не сохраненный таск
            if (!task.inputCopy) {
              rendered.push(manager(task, task.type, taskIndex));
            } else {
              rendered.push(manager(task, task.inputCopy.type, taskIndex));
            }
            taskIndex++;
          }
          // Если данная группа выбрана, то выводим ее
          renderedGrops.push(
            <div v-show={this.activeGroup == gropIndex}>{rendered}</div>
          );
        }
      });
      return renderedGrops;
    }
  },
  computed: {
    ...mapGetters(["activeGroupIndexLesson", "activeGroupIndexHomework"]),
    activeGroup() {
      let index = 0;
      if (this.type == "lesson") index = this.activeGroupIndexLesson;
      else if (this.type == "homework") index = this.activeGroupIndexHomework;
      return index;
    }
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
