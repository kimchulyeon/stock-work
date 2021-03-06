import Vue from "vue";
import Vuex from "vuex";
import { getAuthFromCookie } from "@/utils/cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getAuthFromCookie() || "", // 쿠키에 저장된 난독화된 토큰 값이거나 빈값
    username: "", // 사용자 이름
  },

  // watch
  getters: {
    isLogin(state) {
      return state.username !== "";
    },
  },

  // setState
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setUsername(state, payload) {
      state.username = payload;
    },
  },
  actions: {},
  modules: {},
});
