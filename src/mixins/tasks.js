import { mapGetters } from "vuex";

export default {
  data: function() {
    return {};
  },
  methods: {
    sendTaskToTeacher(index, data) {
      this.socket.emit("send task to teacher", {
        taskIndex: index,
        taskData: data,
        teacherId: this.teacherId
      });
    },
    onChangeTask() {
      this.sendTaskToTeacher(this.index, this._data);
    },
    setInputCopy(callback = () => {}) {
      if ("inputCopy" in this.input) {
        // Если данное свойство есть, то ученик уже проходил данный урок
        // Мы заменяем все свойства компонента на архивные
        this._data = this.input;
      } else {
        this.inputCopy = this.input;
        callback();
      }
    },
    saveProgress() {
      this.saveTask({
        index: this.index,
        taskData: this._data
      });
      // Если там есть еще и потомки у которых надо сохранить данные
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
  mixins: {},
  beforeMount() {}
};
