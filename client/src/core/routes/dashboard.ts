import { RouteConfig } from "vue-router";
import users from "@/core/routes/users";

// Init dashboard routes
const dashboard: RouteConfig[] = [];

/**
 * New route objects should be added here.
 * you should add any separate exported route files in this array
 * so application can loop throw it and attach it to main dashboard route
 */
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
