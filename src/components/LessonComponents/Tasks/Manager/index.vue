<script>
import TaskComponents from "./exportAllTaskComponents";
import TeacherPanel from "@/components/LessonComponents/TeacherPanel";
import ConsultationData from "Tasks/Consultation/data";

import { mapGetters } from "vuex";

import { manager } from "./functions.js";
import context from "./mixins/context";

import studentToTeacher from "./mixins/studentToTeacher.js";
import rerender from "./mixins/rerender";
import render from "./mixins/renderTasks";

import MediaManager from "@/components/UiElements/MediaManager/MediaManager";

export default {
  name: "task-manager",
  render(h) {
    // Получает текущий контекст
    // Дз или обычный урок
    if (this.isConsultation()) {
      this.contextData = ConsultationData;
    } else {
      this.contextData = this.getContext();
    }
    let managerBottom = [];
    if (!document.location.href.includes("consultation")) {
      managerBottom.push(
        <div class="manager__bottom">
          {this.results}
          <portal-target name="manager__bottom" />
          <media-manager />
        </div>
      );
    }
    let slots = [
      <div class="manager__top elevation-3">
        <teacher-panel />
      </div>,
      <div class="manager__workspace">
        <choose-group class="manager__choose-group" lessonType={this.type} />
        {...this.renderTasks(this.contextData, this.manager)}
      </div>,
      ...managerBottom
    ];
    return h("div", slots);
  },
  data: function() {
    return {
      errorCounter: 0,
      checked: false,
      contextData: 0,
      consultation: ConsultationData
    };
  },
  methods: {
    tasksForEach(callback) {
      if (this.$refs) {
        this.$refs.task.forEach((task, index) => callback(task, index));
      }
    },
    getTasksNumForChecking(tasks) {
      // Устанавливает количество тасков, которые проверяются
      let tasksNum = tasks.length;
      let addonsType = ["youtube_addons", "lesson_addons_files"];
      tasks.forEach(gropup => {
        tasksNum -= gropup.tasks.filter(task => addonsType.includes(task.type))
          .length;
      });
      return tasksNum;
    },
    check() {
      this.tasksForEach(task => {
        if (task.check) {
          // Метод проверки у каждого компонента разный
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
    },
    showAnswers() {
      this.tasksForEach(task => {
        if (task.showAnswers) {
          task.showAnswers();
        }
        // Перебираем всех потомков и вызываем у них тот-же метод
        // Рекурсивно спускаемся до последнего потомка
        if (task.$refs) {
          for (const i in task.$refs) {
            const refType = task.$refs[i];
            if (Array.isArray(refType)) {
              refType.forEach(ref => {
                if (ref.constructor.name == "VueComponent" && ref.showAnswers) {
                  ref.showAnswers();
                }
              });
            }
          }
        }
      });
    }
  },
  computed: {
    ...mapGetters(["user", "socket", "teacherId", "activeUser"]),
    results() {
      return this.checked ? (
        <results
          errorsNum={this.errorCounter}
          tasksNum={this.getTasksNumForChecking(this.contextData)}
        />
      ) : (
        ""
      );
    }
  },
  components: {
    ...TaskComponents,
    TeacherPanel,
    MediaManager
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
  position: relative
  &__bottom
    border-top: 1px solid #dedede
    padding: 10px
    padding-bottom: 0
    display: flex
    flex-direction: column
    justify-content: space-around
    background: #f3f3f3
  &__choose-group
    padding: 10px 0
    top: 0
    bottom: 0
    left: -5px
    height: 50px
    margin-top: auto
    margin-bottom: auto
    position: absolute
  &__workspace
    padding: 10px 60px
    overflow: auto
    overflow-x: hidden
</style>
