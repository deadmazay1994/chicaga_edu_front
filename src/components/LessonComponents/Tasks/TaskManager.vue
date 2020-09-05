<script>
import TaskImages from "./TaskImages";
import FillGaps from "./FillGaps";
import TF from "./TF";
import MatchImgs from "./MatchImgs";
import Syllable from "./ChooseSyllable";
import Comparison from "./Comparison";
import Grouping from "./Grouping";
import SelectionBox from "./SelectionBox";
import Crossword from "./Crossword";
import GapsImgs from "./GapsImgs";
import Attachs from "./Attachs";
import Results from "./Results";
import CheckBtn from "./CheckBtn";
import YoutubeAddons from "./YoutubeAddons";
import ChooseImage from "./ChooseImage";

import { mapGetters } from "vuex";

export default {
  name: "task-manager",
  render(h) {
    let tasks = [];
    // Если прогресс пустой
    // console.log((!Object.keys(this.saved).length && this.type == "lesson") ||
    //   (!Object.keys(this.savedHomework).length && this.type == "homework"))
    this.setTaskNum();
    if (
      (!this.saved.length && this.type == "lesson") ||
      (!this.savedHomework.length && this.type == "homework")
    ) {
      if (this.input) {
        this.input.forEach((task, index) => {
          // Манагер уже сам выбирает какой таск когда подключать
          tasks.push(this.manager(h, task, task.type, index));
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
            let saved = this.manager(h, task, task.inputCopy.type, index);
            tasks.push(saved);
          }
        }
      }
    } else if (this.savedHomework.length && this.type == "homework") {
      // console.log(this.savedHomework)
      for (const index in this.savedHomework) {
        const task = this.savedHomework[index];
        if (!task.inputCopy) {
          console.log("Проверь задание под номером", index + 1);
        } else {
          let saved = this.manager(h, task, task.inputCopy.type, index);
          tasks.push(saved);
        }
      }
    }
    let results = this.results;
    let slots = [...tasks, results];
    return h("div", slots);
  },
  data: function() {
    return {
      errorCounter: 0,
      checked: false,
      tasksNum: 0
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
    manager(h, data, type, index) {
      let res = false;
      let slots = [h("check-btn")];
      let attrs = this.getAttrsForTask(data, index);
      switch (type) {
        case "group_by_dragging":
          res = h("grouping", attrs, slots);
          break;
        case "write_word_to_picture":
          res = h("gaps-imgs", attrs, slots);
          break;
        case "select_stressed_syllable":
          res = h("syllable", attrs, slots);
          break;
        case "images_order":
          res = h("task-images", attrs, slots);
          break;
        case "drag_and_drop_words":
          attrs.props.drag = true;
          res = h("fill-gaps", attrs, slots);
          break;
        case "match_words":
          res = h("comparison", attrs, slots);
          break;
        case "true_or_false":
          res = h("t-f", attrs, slots);
          break;
        case "crosswordы":
          res = h("crossword", attrs, slots);
          break;
        case "match_picture_and_word":
          res = h("match-imgs", attrs, slots);
          break;
        case "select_correct_answer":
          res = h("selection-box", attrs, slots);
          break;
        case "select_correct_variant":
          attrs.props.underline = true;
          res = h("selection-box", attrs, slots);
          break;
        case "insert_skipped_word":
          res = h("fill-gaps", attrs, slots);
          break;
        case "youtube_addons":
          res = h("youtubeAddons", attrs, slots);
          break;
        case "lesson_addons_files":
          res = h("attachs", attrs, slots);
          break;
        case "select_correct_image_answer":
          res = h("choose-image", attrs, slots);
          break;
      }
      return res;
    },
    onSendTask() {
      let self = this;
      if (this.socket) {
        this.socket.on("send task to teacher", data => {
          if (data.senderId == this.activeUser) {
            if ("childRef" in data.taskData) {
              // Если данные прислал дочерний таск, то обновляем дочерний таск
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
      if (component) {
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
          task.sendTaskToTeacher(task.index, task._data);
          if (!isNaN(task.error)) {
            this.errorCounter += Number(task.error);
          }
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
        this.$refs.task.forEach(task => {
          task.sendTaskToTeacher(task.index, task._data);
        });
      });
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
    ChooseImage
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
