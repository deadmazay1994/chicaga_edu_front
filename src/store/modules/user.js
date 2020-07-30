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
          username: "Равиль Гиззатуллин",
          email: "147rawil147@gmail.com",
          avatar: "",
          role: "teacher"
        };
        commit("setUser", response);
      } else if (formdata) {
        let response = await api.methods.login(formdata);
        let barText = "";
        let barStatus = false;
        if ("success" in response) {
          if (response.success) {
            commit("setUser", response);
            commit("setToken", "token");
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
