import { Module } from "vuex";

const usersModule: Module<any, any> = {
  state: {
    submitted: false
  },
  mutations: {
    SET_FORM_SUBMIT(state, submitted) {
      state.submitted = submitted;
    }
  },
  actions: {
    setFormSubmitted(context, submitted) {
      context.commit("SET_FORM_SUBMIT", submitted);
    }
  },
  getters: {
    getSubmitStatus(state) {
      return state.submitted;
    }
  }
};

export default usersModule;
