export default {
  methods: {
    onSendTask() {
      if (this.socket) {
        this.socket.on("send task to teacher", data => {
          // Если только активный пользователь отправляет данные
          if (data.senderId == this.activeUser) {
            // Если есть дочерние элементы, то обновляем их
            if ("childRef" in data.taskData) {
              this.updateChildComponent(
                this.$refs.task[data.taskIndex],
                data.taskData
              );
            } else {
              let updatingTask = this.$refs.task[data.taskIndex];
              this.updateTask(updatingTask, data.taskData);
            }
          }
        });
      }
    },
    updateTask(component, data) {
      if (component) {
        component.update(data);
      }
    },
    updateChildComponent(component, data) {
      data = data.data ? data.data : data;
      if (component && data) {
        try {
          let child = component.$refs[data.childRef][data.childIndex];
          this.updateTask(child, data);
        } catch (e) {
          e;
        }
      }
    }
  },
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
