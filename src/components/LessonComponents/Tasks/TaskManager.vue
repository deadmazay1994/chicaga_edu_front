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
      return attrs;
    },
    manager(h, data, type, index) {
      let res = false;
      let attrs = this.getAttrsForTask(data, index);
      switch (type) {
        case "grouping":
          res = h("grouping", attrs);
          break;
        case "gaps_imgs":
          res = h("gaps-imgs", attrs);
          break;
        case "select_stressed_syllable":
          res = h("syllable", attrs);
          break;
        case "images_order":
          res = h("task-images", attrs);
          break;
        case "drag_skipped_word":
          res = h("fill-gaps", attrs);
          break;
        case "comprasion":
          res = h("comparison", attrs);
          break;
        case "true_false":
          res = h("t-f", attrs);
          break;
        case "crosswordы":
          res = h("crossword", attrs);
          break;
        case "match":
          res = h("match-imgs", attrs);
          break;
        case "selection_box":
          res = h("selection-box", attrs);
          break;
        case "underline_box":
          attrs.props.underline = true;
          res = h("selection-box", attrs);
          break;
        default:
          break;
      }
      return res;
    },
    onSendTask() {
      if (window.location.hash.substr(1)) {
        this.socket.on("send task to teacher", data => {
          // Как только получаем данные от ученика
          // Принудительно обновляем данне учителя
          this.updateTask(this.$refs.task[data.taskIndex], data.taskData);
        });
      }
    },
    updateTask(component, data) {
      component._data = data;
      component.$forceUpdate();
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
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
