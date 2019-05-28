import { Module } from "vuex";

const usersModule: Module<any, any> = {
  state: {
    status: {
      isLogged: false,
      user: null
    }
  },
  mutations: {
    SET_LOGIN_STATUS(state, payload) {
      state.status.isLogged = payload.isLogged;
      state.status.user = payload.user;

      // Remove token from localStorage
      if (payload.isLogged === false) {
        localStorage.removeItem("token");
      }
    }
  },
  actions: {
    setUserLogged(context, user) {
      context.commit("SET_LOGIN_STATUS", {
        isLogged: true,
        user: user
      });
    },
    setUserNotLogged(context, user) {
      context.commit("SET_LOGIN_STATUS", {
        isLogged: false,
        user: null
      });
    }
  },
  getters: {
    /**
     * Get user permissions
     * @param state
     */
    getUserPermissions(state) {
      if (state.status.isLogged !== true) {
        return null;
      }

      if (state.status.user.userPermissions === null) {
        return null;
      }

      // return permissions keys
      return state.status.user.userPermissions.map((perm: any) => perm.key);
    }
  }
};

export default usersModule;
