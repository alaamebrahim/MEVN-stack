import { Module } from "vuex";

const moment = require("moment");

const usersModule: Module<any, any> = {
  state: {
    status: {
      isLogged: false,
      user: null
    },
    loginTries: 0,
    blockedSeconds: 0
  },
  mutations: {
    SET_LOGIN_STATUS(state, payload) {
      state.status.isLogged = payload.isLogged;
      state.status.user = payload.user;

      // Remove token from localStorage
      if (payload.isLogged === false) {
        localStorage.removeItem("token");
      }
    },
    SET_LOGIN_TRIES_COUNT(state, payload) {
      if (payload.count === 0) {
        state.loginTries = 0;
      } else {
        state.loginTries += payload.count;
      }

      // save it to localStorage so we can keep it if user reloaded page.
      localStorage.setItem("LoginTries", state.loginTries);

      // Several fail logins
      if (state.loginTries >= 3) {
        let startTime = moment().format();

        // Setup seconds that user will be blocked.
        const blockedSeconds = localStorage.getItem("blockedSeconds");
        const secondsToBlockUser =
          blockedSeconds === null
            ? 0
            : parseInt(blockedSeconds) > 0
            ? parseInt(blockedSeconds)
            : 60;

        // After 30 sec user can try again.
        const handlePreventLoginAttempts = () => {
          // Calculate seconds between last attempt to login AND now..
          const now = moment().format();
          const diff = moment
            .utc(moment(now).diff(moment(startTime)))
            .seconds();

          // Set this value to display for the user
          state.blockedSeconds = secondsToBlockUser - diff;
          localStorage.setItem("blockedSeconds", state.blockedSeconds);

          // user can try again after this amount of seconds.
          if (diff >= secondsToBlockUser) {
            state.loginTries = 0;
            localStorage.removeItem("LoginTries");
            clearInterval(interval);
          }
        };
        const interval = setInterval(handlePreventLoginAttempts, 250);
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
    },
    setLoginTries(context, count) {
      context.commit("SET_LOGIN_TRIES_COUNT", {
        count: count
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
    },
    getLoginTriesCount(state) {
      return state.loginTries;
    }
  }
};

export default usersModule;
