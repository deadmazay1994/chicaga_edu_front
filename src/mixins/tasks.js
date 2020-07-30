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
