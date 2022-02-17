export default {
  actions: {},
  mutations: {
    pushNotification(state, message) {
      state.notifications.push({
        ...message,
      })
    }
  },
  state: {
    notifications: []
  },
  getters: {}
}