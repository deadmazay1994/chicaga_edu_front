<script>
import TaskComponents from "./exportAllTaskComponents";

import ConsultationData from "Tasks/Consultation/data";

import { mapGetters } from "vuex";

import { manager } from "./functions.js";
import context from "./mixins/context";

import studentToTeacher from "./mixins/studentToTeacher.js";
import rerender from "./mixins/rerender";
import render from "./mixins/renderTasks";

export default {
  name: "task-manager",
  render(h) {
    if (this.isConsultation()) {
      this.input = this.consultation;
    }
    this.setTasksNum();
    let results = [];
    if (!location.href.includes("consultation")) {
      results = this.results;
    }
    let tasksInput = this.getContext();
    let slots = [
      <div class="manager__workspace">
        {...this.renderTasks(tasksInput, this.manager)}
      </div>,
      <div class="manager__bottom">
        {results}
        <choose-group class="manager__choose-group" lessonType={this.type} />
        <portal-target name="manager" />
      </div>
    ];
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
        this.$refs.task.forEach((task, index) => callback(task, index));
      }
    },
    setTasksNum() {
      // let input = Object.keys(this.input).map(key => this.input[key]);
      // let addonsType = ["youtube_addons", "lesson_addons_files"];
      // const inAddons = taskType =>
      //   addonsType.find(task => (task == taskType ? true : false));
      // if (this.input) {
      //   let ifSaved = typeof this.saved != "object";
      //   let ifHomeworkSaved = typeof this.savedHomework != "object";
      //   let addonsNum = 0;
      //   if (
      //     (!ifSaved && this.type == "lesson") ||
      //     (!ifHomeworkSaved && this.type == "homework")
      //   ) {
      //     addonsNum = input.filter(task => inAddons(task.type)).length;
      //   } else {
      //     addonsNum = input.filter(task => inAddons(task.inputCopy.type))
      //       .length;
      //   }
      //   this.tasksNum = input.length - addonsNum;
      // } else if (this.saved) {
      //   let addonsNum = this.saved.filter(task => {
      //     if (task) {
      //       return inAddons(task.inputCopy.type);
      //     }
      //     return false;
      //   }).length;
      //   this.tasksNum = this.saved.length - addonsNum;
      // }
    },
    check() {
      this.tasksForEach(task => {
        if (task.check) {
          // Метод проверки у каждого компоненте разный
          task.check();
        }
      });
      this.setErrorsNum();
      this.checked = true;
    },
    manager(data, type, index) {
      // Данная функция создает компонент согласно его названию
      return manager(data, type, index, this.$createElement);
    },
    saveTasks() {
      // this.tasksForEach(task => task.saveProgress());
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
  mixins: [studentToTeacher, rerender, context, render],
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
.manager
  &__bottom
    border-top: 1px solid #dedede
    padding-top: 10px
    display: flex
    flex-direction: column
    justify-content: space-around
    background: #f3f3f3
  &__choose-group
    padding: 10px 0
  &__workspace
    padding: 10px
    overflow: auto
</style>
