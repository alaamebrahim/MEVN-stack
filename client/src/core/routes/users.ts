import { RouteConfig } from "vue-router";
import ViewUsers from "@/core/components/users/ViewUsers.vue";

const users: RouteConfig[] = [];

/**
 * PUSH every new route like following
 * And right before exporting users object
 */
users.push({
  path: "users",
  name: "usersIndex",
  component: ViewUsers,
  meta: {
    permissions: ["view_admin"]
  }
});

export default users;
