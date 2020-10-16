<script>
import TaskComponents from "./exportAllTaskComponents";

import ConsultationData from "Tasks/Consultation/data";

import { mapGetters } from "vuex";

import { manager, getContext, renderTasks } from "./functions.js";

export default {
  name: "task-manager",
  render(h) {
    if (this.isConsultation()) {
      this.input = this.consultation;
    }
    this.setTaskNum();
    let results = [];
    if (!location.href.includes("consultation")) {
      results = this.results;
    }
    let tasksInput = getContext(this);
    let slots = [...renderTasks(tasksInput, this.manager), results];
    return h("div", slots);
  },
  data: function() {
    return {
      errorCounter: 0,
      checked: false,
      tasksNum: 0,
      consultation: ConsultationData
    };
  },
  methods: {
    setTaskNum() {
      let addonsType = ["youtube_addons", "lesson_addons_files"];
      const inAddons = taskType =>
        addonsType.find(task => (task == taskType ? true : false));
      if (this.input) {
        let ifSaved = typeof this.saved != "object";
        let ifHomeworkSaved = typeof this.savedHomework != "object";
        let addonsNum = 0;
        if (
          (!ifSaved && this.type == "lesson") ||
          (!ifHomeworkSaved && this.type == "homework")
        ) {
          addonsNum = this.input.filter(task => inAddons(task.type)).length;
        } else {
          addonsNum = this.input.filter(task => inAddons(task.inputCopy.type))
            .length;
        }
        this.tasksNum = this.input.length - addonsNum;
      } else if (this.saved) {
        let addonsNum = this.saved.filter(task => {
          if (task) {
            return inAddons(task.inputCopy.type);
          }
          return false;
        }).length;
        this.tasksNum = this.saved.length - addonsNum;
      }
    },
    check() {
      this.errorCounter = 0;
      this.$refs.task.forEach(task => {
        if (task.check) {
          task.check();
        }
        // console.log(task, task.check)
        if (task.error != undefined) {
          this.errorCounter += Number(task.error);
        }
      });
      this.checked = true;
    },
    manager(data, type, index) {
      let h = this.$createElement;
      // Данная функция создает компонент согласно его названию
      return manager(data, type, index, h);
    },
    onSendTask() {
      let self = this;
      if (this.socket) {
        this.socket.on("send task to teacher", data => {
          if (data.senderId == this.activeUser) {
            if ("childRef" in data.taskData) {
              this.updateChildComponent(
                self.$refs.task[data.taskIndex],
                data.taskData
              );
            } else {
              // Если у таска нет дочерних компонентов, то заменяем данные на прямую
              this.updateTask(this.$refs.task[data.taskIndex], data.taskData);
            }
          }
        });
      }
    },
    updateTask(component, data) {
      // component.update(data);
      if (component) {
        component._data = data;
        component.$forceUpdate();
      }
    },
    updateChildComponent(component, data) {
      if (component && data.data) {
        let child = component.$refs[data.childRef][data.childIndex];
        child._data = data.data;
        child.$forceUpdate();
        if ("customForceUpdate" in child) {
          child.customForceUpdate(data);
        }
      }
    },
    saveTasks() {
      this.errorCounter = 0;
      if (this.$refs) {
        this.$refs.task.forEach(task => {
          task.saveProgress();
          if (!isNaN(task.error)) {
            this.errorCounter += Number(task.error);
          }
          this.sendTasksToTeacher(task);
        });
      }
      if (this.socket) {
        this.socket.emit("i was wrong", {
          errorCounter: this.errorCounter,
          teacher: this.teacherId,
          myId: this.socket.id
        });
      }
    },
    onSendAllTasks() {
      this.socket.on("send all tasks", () => {
        this.$refs.task.forEach(task => this.sendTasksToTeacher(task));
      });
    },
    sendTasksToTeacher(task) {
      task.sendTaskToTeacher(task.index, task._data);
      // Передаем данные в дочерних тасках
      for (let i in task.$refs) {
        let childRefs = task.$refs[i];
        for (let j in childRefs) {
          let childTasks = childRefs[j];
          if ("sendData" in childTasks) {
            childTasks.sendData();
          }
        }
      }
    },
    isConsultation() {
      return location.href.includes("consultation");
    }
  },
  computed: {
    ...mapGetters(["user", "socket", "teacherId", "activeUser"]),
    results() {
      return this.checked ? (
        <results errorsNum={this.errorCounter} tasksNum={this.tasksNum} />
      ) : (
        ""
      );
    }
  },
  components: {
    ...TaskComponents
  },
  props: ["input", "saved", "savedHomework", "type"],
  mixins: {},
  beforeMount() {
    this.onSendTask();
    this.onSendAllTasks();
    this.$parent.$on("saveTasks", this.saveTasks);
  }
};
</script>

<style scoped="scoped" lang="sass">
.tasks
  &__task
    overflow: auto
</style>
