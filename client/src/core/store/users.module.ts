import { Module } from "vuex";
import appConfig from "../config/app.config";
const moment = require("moment");

const usersModule: Module<any, any> = {
  state: {
    status: {
      isLogged: null,
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

      // Remove login tries on login
      if (payload.isLogged === true) {
        localStorage.removeItem("LoginTries");
        localStorage.removeItem("blockedSeconds");
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
      if (state.loginTries >= appConfig.maxLoginTries) {
        let startTime = moment().format();

        // Setup seconds that user will be blocked.
        const blockedSeconds = localStorage.getItem("blockedSeconds");
        const secondsToBlockUser =
          blockedSeconds === null
            ? 0
            : parseInt(blockedSeconds) > 0
            ? parseInt(blockedSeconds)
            : appConfig.secondsToBlockUserLogin;

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
      if (state.status.isLogged === false) {
        return null;
      }

      const userPerms = localStorage.getItem("userPermissions");
      const userPermissions: Array<string> =
        userPerms !== null ? JSON.parse(userPerms) : [];

      if (userPermissions.length === 0 && state.status.user === null) {
        return null;
      }

      if (state.status.user !== null) {
        return state.status.user.userPermissions.map((perm: any) => perm.key);
      }

      // return permissions keys
      return userPermissions.map((perm: any) => perm.key);
    },
    getLoginTriesCount(state) {
      return state.loginTries;
    }
  }
};

export default usersModule;
