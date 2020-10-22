<script>
import TaskComponents from "./exportAllTaskComponents";

import ConsultationData from "Tasks/Consultation/data";

import { mapGetters } from "vuex";

import { manager, getContext, renderTasks } from "./functions.js";

import studentToTeacher from "./mixins/studentToTeacher.js";

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
    tasksForEach(callback) {
      if (this.$refs) {
        this.$refs.task.forEach(task => callback(task));
      }
    },
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
          // Метод проверки у каждого компоненте разный
          // Метод зашит в компоненте
          task.check();
        }
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
      this.tasksForEach(task => task.saveProgress());
    },
    setErrorsNum() {
      this.errorCounter = 0;
      this.tasksForEach(task => {
        if (!isNaN(task.error)) {
          this.errorCounter += Number(task.error);
        }
      });
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
  mixins: [studentToTeacher],
  beforeMount() {
    // StudentToTeacher mixin
    this.onSendTask();
    this.onSendAllTasks();

    // Обрабатываем проверку и сохранение тасков
    this.$parent.$on("check", () => {
      this.check();
      // StudentToTeacher mixin
      this.signalingToTeacherUserIsAnswred();
    });
    this.$parent.$on("saveTasks", this.saveTasks);
  }
};
</script>

<style scoped="scoped" lang="sass">
.tasks
  &__task
    overflow: auto
</style>
