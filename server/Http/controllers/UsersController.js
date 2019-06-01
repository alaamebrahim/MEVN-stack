"use strict";

import users from "../../database/models/users";

export default class UsersController {
  static getUsers(req, res, next) {
    return users.findAll().then(users => {
      if (users !== null) {
        return res.json({
          success: true,
          data: users
        });
      } else {
        return res.json({
          success: false,
          data: []
        });
      }
    });
  }
}
