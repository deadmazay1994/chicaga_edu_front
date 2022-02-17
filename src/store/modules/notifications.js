export default {
  namespaces: true,
  actions: {},
  mutations: {
    pushNotification(state, params) {
      state.notifications.push({
        ...params,
        active: true 
      });
      setTimeout(() => {
        state.notifications[state.notifications.length - 1].active = false
      }, 5000)
    }
  },
  state: {
    notifications: []
  },
  getters: {
    getNotifications(state) {
      return state.notifications
    },
    getActiveNotifications(state) {
      return state.notifications.filter(not => not.active)
    }
  }
}