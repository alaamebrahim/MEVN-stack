import { Module } from "vuex";

const usersModule: Module<any, any> = {
  state: {
    userSaved: false
  },
  mutations: {
    SET_USER_SAVED(state, saved) {
      state.userSaved = saved;
    }
  },
  actions: {
    setUserSaved(context, saved) {
      context.commit("SET_USER_SAVED", saved);
    }
  },
  getters: {
    getSaveStatus(state) {
      return state.userSaved;
    }
  }
};

export default usersModule;
