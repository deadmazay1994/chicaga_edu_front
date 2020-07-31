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

import { mapGetters } from "vuex";

export default {
  name: "task-manager",
  render(h) {
    let tasks = [];
    // Если прогресс пустой
    if (!this.saved.length) {
      // Перебираем все таски
      this.input.forEach((task, index) => {
        // Манагер уже сам выбирает какой таск когда подключать
        tasks.push(this.manager(h, task, task.type, index));
      });
    } else {
      // Перебираем таски из прогресса
      this.saved.forEach((task, index) => {
        let saved = this.manager(h, task, task.inputCopy.type, index);
        tasks.push(saved);
      });
    }
    return h("div", tasks);
  },
  data: function() {
    return {};
  },
  methods: {
    check() {
      this.$refs.task.forEach(task => task.check());
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
      if (data.child) {
        attrs.props.childSaved = data.child;
      }
      return attrs;
    },
    manager(h, data, type, index) {
      let res = false;
      let attrs = this.getAttrsForTask(data, index);
      switch (type) {
        case "type5":
          res = h("grouping", attrs);
          break;
        case "write_word_to_picture":
          res = h("gaps-imgs", attrs);
          break;
        case "select_stressed_syllable":
          res = h("syllable", attrs);
          break;
        case "images_order":
          res = h("task-images", attrs);
          break;
        case "drag_and_drop_words":
          attrs.props.drag = true;
          res = h("fill-gaps", attrs);
          break;
        case "match_words":
          res = h("comparison", attrs);
          break;
        case "true_false":
          res = h("t-f", attrs);
          break;
        case "crosswordы":
          res = h("crossword", attrs);
          break;
        case "match_picture_and_word":
          res = h("match-imgs", attrs);
          break;
        case "selection_box":
          res = h("selection-box", attrs);
          break;
        case "underline_box":
          attrs.props.underline = true;
          res = h("selection-box", attrs);
          break;
        case "insert_skipped_word":
          res = h("fill-gaps", attrs);
          break;
      }
      return res;
    },
    onSendTask() {
      if (window.location.hash.substr(1)) {
        this.socket.on("send task to teacher", data => {
          if ("childIndex" in data.taskData) {
            // Если у таска есть дочерние компоненты, то надо обновлять их данные, а не родителя
            this.updateChildComponent(
              this.$refs.task[data.taskIndex],
              data.taskData
            );
          } else {
            // Если у таска нет дочерних компонентов, то заменяем данные на прямую
            this.updateTask(this.$refs.task[data.taskIndex], data.taskData);
          }
        });
      }
    },
    updateTask(component, data) {
      // component.update(data);
      component._data = data;
      component.$forceUpdate();
    },
    updateChildComponent(component, data) {
      let child = component.$refs[data.childRef][data.childIndex];
      child._data = data.data;
      child.$forceUpdate();
      if ("customForceUpdate" in child) {
        child.customForceUpdate(data);
      }
    },
    saveTasks() {
      this.$refs.task.forEach(task => {
        task.saveProgress();
      });
    }
  },
  computed: {
    ...mapGetters(["user", "socket"])
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
    GapsImgs
  },
  props: ["input", "saved"],
  mixins: {},
  beforeMount() {
    this.onSendTask();
    this.$parent.$on("saveTasks", this.saveTasks);
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
