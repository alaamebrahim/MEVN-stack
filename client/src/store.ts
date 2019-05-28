import Vue from "vue";
import Vuex from "vuex";
import usersModule from "./core/store/users.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { users: usersModule },
  state: {},
  mutations: {},
  actions: {}
});
