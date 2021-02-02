const DEFAULT_AVATAR = "/imgs/user.png";
import api from "@/mixins/api";

import { router } from "@/router";

export default {
  namespaces: true,
  actions: {
    async login({ commit, state }, formdata = false) {
      if (state.token) {
        let response = await api.methods.reLogin();
        if ("error" in response) {
          commit("logout");
          router.push({ path: "/auth/login" });
          commit("pushShuckbar", {
            val: "Не правильная токен сессия. Авторизируйтесь заново",
            success: false
          });
        } else {
          commit("setUser", response.data);
        }
      } else if (formdata) {
        let response = await api.methods.login(formdata);
        let barText = "";
        let barStatus = false;
        if ("success" in response) {
          if (response.success) {
            commit("setUser", response.data);
            commit("setToken", response.data.api_token);
            let redirectUrl = "/lk/my-coursers";
            if (router.currentRoute.query.redirect)
              redirectUrl = router.currentRoute.query.redirect;
            router.push({ path: redirectUrl });
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
    async updateUser({ commit }, formdata) {
      let response = await api.methods.updateUser(formdata);
      let barText = "";
      let barStatus = false;
      if ("success" in response) {
        if (response.success) {
          barText = "Вы успешно изменили свои персональные данные";
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
    async recoverPassword({ commit }, email) {
      commit;
      let r = await api.methods.recoverPassword(email);
      if (r.error) {
        commit("pushShuckbar", {
          val: Object.values(r.error).reduce(
            (acc, current) => (acc += current + " "),
            ""
          ),
          success: false
        });
      }
      if (r.success) return true;
      return false;
    },
    async setNewPassword({ commit }, { password, token, passwordConfirmed }) {
      commit;
      let r = await api.methods.setNewPassword(
        password,
        passwordConfirmed,
        token
      );
      if (r.error) {
        commit("pushShuckbar", {
          val: Object.values(r.error).reduce(
            (acc, current) => (acc += current + " "),
            ""
          ),
          success: false
        });
      }
      if (r.success) {
        commit("pushShuckbar", {
          val: "Вы успешно изменили пароль",
          success: true
        });
        return true;
      }
      return false;
    },
    setAvatar({ commit }, avatarUri) {
      commit("setAvatar", avatarUri);
    }
  },
  mutations: {
    setAvatar(state, avatarUri) {
      if (state.logined) {
        state.user.avatar_link = avatarUri;
      }
    },
    setUser(state, user) {
      state.user = user;
      if (user.avatar_link == "") {
        user.avatar_link = DEFAULT_AVATAR;
      }
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
      return state.user;
    },
    avatar: state => {
      if (state.user) {
        console.log(state.user);
        return state.user.avatar_link;
      }
      return false;
    },
    logined: state => state.logined
  }
};
