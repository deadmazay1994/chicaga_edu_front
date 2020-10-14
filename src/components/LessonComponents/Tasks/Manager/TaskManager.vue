<script>
import TaskImages from "Tasks/TaskImages";
import FillGaps from "Tasks/FillGaps";
import TF from "Tasks/TF";
import MatchImgs from "Tasks/MatchImgs";
import Syllable from "Tasks/ChooseSyllable";
import Comparison from "Tasks/Comparison";
import Grouping from "Tasks/Grouping";
import SelectionBox from "Tasks/SelectionBox";
import Crossword from "Tasks/Crossword";
import GapsImgs from "Tasks/GapsImgs";
import Attachs from "Tasks/Attachs";
import Results from "Tasks/Results";
import CheckBtn from "Tasks/CheckBtn";
import YoutubeAddons from "Tasks/YoutubeAddons";
import ChooseImage from "Tasks/ChooseImage";
import PaymentOption from "Tasks/PaymentOption/";

import Choose from "Tasks/Consultation/Choose";
import Gaps from "Tasks/Consultation/Gaps";
import ConsultationData from "Tasks/Consultation/data";

import { mapGetters } from "vuex";

export default {
  name: "task-manager",
  render(h) {
    let tasks = [];
    if (this.isConsultation()) {
      this.input = this.consultation;
    }
    // Если прогресс пустой
    // console.log((!Object.keys(this.saved).length && this.type == "lesson") ||
    //   (!Object.keys(this.savedHomework).length && this.type == "homework"))
    this.setTaskNum();
    // tasks.push(this.manager(h, "", true, 1));
    if (
      (!this.saved.length && this.type == "lesson") ||
      (!this.savedHomework.length && this.type == "homework")
    ) {
      if (this.input) {
        this.input.forEach((task, index) => {
          // Манагер уже сам выбирает какой таск когда подключать
          tasks.push(this.manager(task, task.type, index));
        });
      }
    } else if (this.saved.length && this.type == "lesson") {
      // Перебираем таски из прогресса
      for (const index in this.saved) {
        const task = this.saved[index];
        if (task) {
          if (!task.inputCopy) {
            console.log("Проверь задание под номером", index + 1);
          } else {
            let saved = this.manager(task, task.inputCopy.type, index);
            tasks.push(saved);
          }
        }
      }
    } else if (this.savedHomework.length && this.type == "homework") {
      for (const index in this.savedHomework) {
        const task = this.savedHomework[index];
        if (!task.inputCopy) {
          console.log("Проверь задание под номером", index + 1);
        } else {
          let saved = this.manager(task, task.inputCopy.type, index);
          tasks.push(saved);
        }
      }
    }
    let results = [];
    if (!location.href.includes("consultation")) {
      results = this.results;
    }
    let slots = [...tasks, results];
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
    getAttrsForTask(data, index) {
      let attrs = {
        props: {
          input: data,
          index
        },
        ref: "task",
        refInFor: true,
        class: "tasks__task"
      };
      if (data.inputCopy) {
        attrs.props.input = data;
      }
      if (data.child) {
        attrs.props.childSaved = data.child;
      }
      return attrs;
    },
    manager(data, type, index) {
      let h = this.$createElement;
      let slots = [h("check-btn")];
      let attrs = this.getAttrsForTask(data, index);
      let componentName = "";
      switch (type) {
        case "group_by_dragging":
          componentName = "grouping";
          break;
        case "write_word_to_picture":
          componentName = "gaps-imgs";
          break;
        case "select_stressed_syllable":
          componentName = "syllable";
          break;
        case "images_order":
          componentName = "task-images";
          break;
        case "drag_and_drop_words":
          attrs.props.drag = true;
          componentName = "fill-gaps";
          break;
        case "match_words":
          componentName = "comparison";
          break;
        case "true_or_false":
          componentName = "t-f";
          break;
        case "crosswordы":
          componentName = "crossword";
          break;
        case "match_picture_and_word":
          componentName = "match-imgs";
          break;
        case "select_correct_answer":
          componentName = "selection-box";
          break;
        case "select_correct_variant":
          attrs.props.underline = true;
          componentName = "selection-box";
          break;
        case "insert_skipped_word":
          componentName = "fill-gaps";
          break;
        case "youtube_addons":
          componentName = "youtubeAddons";
          break;
        case "lesson_addons_files":
          componentName = "attachs";
          break;
        case "select_correct_image_answer":
          componentName = "choose-image";
          break;
        // Для конслуьтации
        case "payment-option":
          slots = [];
          componentName = "payment-option";
          break;
        case "choose":
          componentName = "choose";
          break;
        case "gaps":
          componentName = "gaps";
          break;
      }
      return h(componentName, attrs, slots);
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
    TaskImages,
    FillGaps,
    TF,
    MatchImgs,
    Syllable,
    Comparison,
    Grouping,
    SelectionBox,
    Crossword,
    GapsImgs,
    Attachs,
    Results,
    CheckBtn,
    YoutubeAddons,
    ChooseImage,
    PaymentOption,
    Choose,
    Gaps
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
