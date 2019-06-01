import { RouteConfig } from "vue-router";
import users from "@/core/routes/users";

// Init dashboard routes
const dashboard: RouteConfig[] = [];

// new route objects should be added here.
const routeFiles = [users];

// loop throw routeFiles
// and add routes to main dashboard route
routeFiles.forEach(file => {
  file.forEach((aRoute: RouteConfig) => {
    // This will apply to all children
    aRoute.meta = {
      permissions: ["view_admin"]
    };
    dashboard.push(aRoute);
  });
});

export default dashboard;
