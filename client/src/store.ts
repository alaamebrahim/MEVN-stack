import Vue from "vue";
import Vuex from "vuex";
import loginModule from "./core/store/login.module";
import usersModule from "@/core/store/users.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { users: loginModule, usersManage: usersModule },
  state: {},
  mutations: {},
  actions: {}
});
