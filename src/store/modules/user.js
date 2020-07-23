const DEFAULT_AVATAR = "/imgs/user.png";

export default {
  namespaces: true,
  actions: {
    login({ commit }, formdata) {
      formdata;
      let response = {
        username: "Равиль Гиззатуллин",
        email: "147rawil147@gmail.com",
        avatar: ""
      };
      commit("setUser", response);
    },
    setAvatar({ commit }, avatarUri) {
      commit("setAvatar", avatarUri);
    }
  },
  mutations: {
    setAvatar(state, avatarUri) {
      if (state.logined) {
        state.user.avatar = avatarUri;
      }
    },
    setUser(state, user) {
      state.user = user;
      state.logined = true;
    }
  },
  state: {
    user: false,
    logined: false
  },
  getters: {
    user: state => {
      if (state.user)
        if (state.logined) {
          state.user.avatar = DEFAULT_AVATAR;
        }
      return state.user;
    }
  }
};
