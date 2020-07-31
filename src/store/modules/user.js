const DEFAULT_AVATAR = "/imgs/user.png";
import api from "@/mixins/api";

import { router } from "@/router";

export default {
  namespaces: true,
  actions: {
    async login({ commit, state }, formdata = false) {
      if (state.token) {
        formdata;
        let response = {
          id: 2,
          name: "test@mail.ru",
          email: "test@mail.ru",
          api_token:
            "9TFX7mN9lCAvaM8g0R7NE8992kB8vMg43To9hHFkAtfEk4nyvr9JoFoZMoxF2W2n6bHGNOUjX6IYAk2p"
        };
        commit("setUser", response);
        commit("setToken", response.api_token);
      } else if (formdata) {
        let response = await api.methods.login(formdata);
        let barText = "";
        let barStatus = false;
        if ("success" in response) {
          if (response.success) {
            console.log(response);
            commit("setUser", response.data);
            commit("setToken", response.data.api_token);
            router.push({ path: "/lk/my-coursers" });
            barText = "Вы успешно авторизировались";
            barStatus = true;
          }
        }
        if ("error" in response) {
          barText = api.methods.getErrorText(response);
          barStatus = false;
        }
        commit("pushShuckbar", {
          val: barText,
          success: barStatus
        });
      }
    },
    async register({ dispatch, commit }, formdata) {
      let response = await api.methods.register(formdata);
      let barText = "";
      let barStatus = false;
      if ("success" in response) {
        if (response.success) {
          dispatch("login", formdata);
          barText = "Вы успешно зарегистрировались";
          barStatus = true;
        }
      }
      if ("error" in response) {
        barText = api.methods.getErrorText(response);
        barStatus = false;
      }
      commit("pushShuckbar", {
        val: barText,
        success: barStatus
      });
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
    },
    logined: state => state.logined
  }
};
