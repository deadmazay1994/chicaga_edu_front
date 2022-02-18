export default {
  namespaces: true,
  actions: {},
  mutations: {
    pushNotification(state, params) {
      // Параметры по дефолту так сейчас не прописывают
      // Можно присовить дефолтное значение прямо такой
      // pushNotification(state, params = 5000) {
      if (!params.timeout) {
        params.timeout = 5000;
      }
      state.notifications.push({
        ...params,
        active: true,
        pos: state.notifications.length,
        state: params.state ? params.state : "default",
      });
      state.notifications
        .filter((elem) => elem.active)
        .reverse()
        .forEach((element) => {
          setTimeout(() => {
            element.active = false;
          }, params.timeout);
        });
    },
  },
  state: {
    notifications: [],
  },
  getters: {
    getNotifications(state) {
      return state.notifications;
    },
    getActiveNotifications(state) {
      return state.notifications.filter((not) => not.active);
    },
  },
};
