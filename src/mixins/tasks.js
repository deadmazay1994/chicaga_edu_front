import { mapGetters, mapMutations } from "vuex";

export default {
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["saveTask", "saveChildTask"]),
    sendTaskToTeacher(index, data = this._data) {
      this.socket.emit("send task to teacher", {
        taskIndex: index,
        taskData: data,
        teacherId: this.teacherId,
        senderId: this.$parent.socket.id
      });
      this.sendChilds(index);
    },
    sendChilds(index) {
      // Из чайлдов получаем массив вида [refName, ref]
      let refs = Object.keys(this.$refs).map(refName => [
        refName,
        this.$refs[refName]
      ]);
      refs.forEach(childRefs => {
        if (Array.isArray(childRefs[1])) {
          childRefs[1].forEach(ref => {
            if (ref.sendTaskToTeacher) {
              ref.sendTaskToTeacher(index, {
                // Примешиваем данные потомка
                ...ref._data,
                childIndex: ref.index,
                childRef: childRefs[0]
              });
            }
          });
        }
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
    },
    update(data) {
      // Метод обновляет все данные таска и ререндерит его
      this._data = data;
      this.$forceUpdate();
      // Если данные компонента нужно обновить еще и особым образом, обновляем
      if ("customForceUpdate" in this) {
        this.customForceUpdate(data);
      }
    }
  },
  computed: {
    ...mapGetters(["teacherId", "socket"])
  },
  components: {},
  props: [],
  mixins: [],
  beforeMount() {
    this.setInputCopy();
  }
};
