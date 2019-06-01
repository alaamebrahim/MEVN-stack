import Vue from "vue";
import Router from "vue-router";
import Home from "./core/views/Home.vue";
import Login from "@/core/components/users/Login.vue";
import store from "./store";
import NotifyService from "@/core/services/NotifyService";
import NotFound from "@/core/components/NotFound.vue";
import { i18n } from "@/i18n";
import UserService from "@/core/services/UserService";
import HelloWorld from "@/core/components/HelloWorld.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        permissions: ["view_admin"]
      },
      children: [
        {
          path: "test",
          name: "test",
          component: HelloWorld,
          meta: {
            permissions: ["view_admin"]
          }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    { path: "*", component: NotFound }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = UserService.isAuthenticated();
  // Check if user is logged in
  if (authRequired && !loggedIn) {
    return next({ name: "login" });
  } else {
    // Check user permissions for the next route
    if (to.matched.some(record => record.meta.permissions)) {
      if (!loggedIn) {
        NotifyService.alert(i18n.tc("login.permissionDenied"));
        return next({ name: "login" });
      }
      let hasPermission = false;
      to.meta.permissions.forEach((permission: Array<string>) => {
        hasPermission =
          store.getters.getUserPermissions.indexOf(permission) !== -1;
      });

      // User has no access to th page
      if (!hasPermission) {
        NotifyService.alert(i18n.tc("login.permissionDenied"));
        return next({ name: "login" });
      } else {
        return next();
      }
    } else {
      // We are fine
      next();
    }
  }
});
export default router;
