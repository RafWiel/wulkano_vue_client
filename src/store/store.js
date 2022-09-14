import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
  },
  mutations: {
    setToken(state, value) {
      state.token = value;

      if (value) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setUser(state, value) {
      state.user = value;
    },
  },
  actions: {
    setToken({ commit }, value) {
      commit('setToken', value);
    },
    setUser({ commit }, value) {
      commit('setUser', value);
    },
  },
});
