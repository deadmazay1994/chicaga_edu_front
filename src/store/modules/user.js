const DEFAULT_AVATAR = "/imgs/user.png";

export default {
  namespaces: true,
  actions: {
    login({ commit, state }, formdata = false) {
      if (state.token) {
        formdata;
        let response = {
          username: "Равиль Гиззатуллин",
          email: "147rawil147@gmail.com",
          avatar: ""
        };
        commit("setUser", response);
      } else if (formdata) {
        let response = {
          username: "Равиль Гиззатуллин",
          email: "147rawil147@gmail.com",
          avatar: ""
        };
        commit("setUser", response);
        commit("setToken", "token");
        console.log(state.token);
      }
    },
    register({ dispatch }, formdata) {
      let response = true;
      if (response) {
        dispatch("login", formdata);
      }
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
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.user = false;
      state.token = false;
      state.logined = false;
      localStorage.removeItem("token");
    }
  },
  state: {
    user: false,
    logined: false,
    token: localStorage.getItem("token") || false
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
