import { mapGetters, mapMutations } from "vuex";

export default {
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["saveTask", "saveChildTask"]),
    sendTaskToTeacher(index, data = false) {
      this.socket.emit("send task to teacher", {
        taskIndex: index,
        taskData: data ? data : this._data,
        teacherId: this.teacherId,
        senderId: this.$parent.socket.id
      });
    },
    onChangeTask() {
      this.sendTaskToTeacher(this.index);
    },
    setInputCopy(callback = () => {}) {
      if (this.input) {
        if ("inputCopy" in this.input) {
          // Если данное свойство есть, то ученик уже проходил данный урок
          // Мы заменяем все свойства компонента на архивные
          this._data = this.input;
          this._data.isSavedTask = true;
          this.$forceUpdate();
        } else {
          this.inputCopy = this.input;
          this._data.isSavedTask = false;
          callback();
        }
      }
    },
    saveProgress() {
      this.saveTask({
        index: this.index,
        taskData: this._data
      });
      // Если есть еще и потомки у которых надо сохранить данные
      this.$children.forEach((child, childIndex) => {
        if ("index" in child) {
          this.saveProgressChild(this.index, childIndex, child._data);
        }
      });
    },
    saveProgressChild(parentIndex, childIndex, childData) {
      this.saveChildTask({
        parentIndex,
        childIndex,
        childData
      });
    }
  },
  computed: {
    ...mapGetters(["teacherId"])
  },
  components: {},
  props: [],
  mixins: [],
  beforeMount() {
    this.setInputCopy();
  }
};
