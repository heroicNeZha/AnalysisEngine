import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: 0,
    count: 0
  },
  mutations: {
    increase() {
      this.state.count++;
    },
    setToken(state, payload) {
      state.token = payload;
    }
  },
  actions: {
  },
  modules: {
  },
});
