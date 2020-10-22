export default {
  methods: {
    onSendTask() {
      if (this.socket) {
        this.socket.on("send task to teacher", data => {
          // Если только активный пользователь отправляет данные
          if (data.senderId == this.activeUser) {
            let updatingTask = this.$refs.task[data.taskIndex];
            this.updateTask(updatingTask, data.taskData);
            // Если есть дочерние элементы, то обновляем их
            if ("childRef" in data.taskData) {
              this.updateChildComponent(
                this.$refs.task[data.taskIndex],
                data.taskData
              );
            }
          }
        });
      }
    },
    updateTask(component, data) {
      if (component) component.update(data);
    },
    updateChildComponent(component, data) {
      if (component && data.data) {
        let child = component.$refs[data.childRef][data.childIndex];
        this.updateTask(child, data);
      }
    }
  },
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
