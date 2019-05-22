"use strict"
import usersRouter from "./users";

export default class appRoutes {

  /**
   * Setup all application routes here
   * @param app
   */
  static setUp(app) {
    // Routes
    app.use("/users", usersRouter);
  }
}
