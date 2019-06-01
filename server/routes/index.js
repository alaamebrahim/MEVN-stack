"use strict"
import usersRouter from "./users";

export default class appRoutes {

  /**
   * Setup all application routes here
   * @param app
   */
  static setUp(app) {
    this.allowCors(app);
    // Routes
    app.use("/api/users", usersRouter);
  }

  static allowCors(app){
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      next();
    });
  }
}
