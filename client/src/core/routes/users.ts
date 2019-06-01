import { RouteConfig } from "vue-router";
import HelloWorld from "@/core/components/HelloWorld.vue";

const users: RouteConfig[] = [];

users.push({
  path: "test",
  name: "test",
  component: HelloWorld,
  meta: {
    permissions: ["view_admin"]
  }
});

users.push({
  path: "test2",
  component: HelloWorld
});
export default users;
