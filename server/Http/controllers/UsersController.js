"use strict";

import users from "../../database/models/users";
import roles from "../../database/models/roles";

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

  static getRoles(req, res, next) {
    return roles.findAll().then(roles => {
      if (roles !== null) {
        return res.json({
          success: true,
          data: roles
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
