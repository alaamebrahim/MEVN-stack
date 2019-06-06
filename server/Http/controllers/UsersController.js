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

  /**
   * Add or update a user
   * @param req
   * @param res
   * @param next
   * @constructor
   */
  static AddUpdateUser(req, res, next) {
    const user = req.body;
    if (user.id !== undefined && user.id !== null) user.createdAt = new Date();
    user.updatedAt = new Date();

    users
      .create(user)
      .then(response => {
        return res.json({
          success: true,
          data: response
        });
      })
      .catch(err => {
        console.log(err);
        return res.json({
          success: false,
          errorField: err.errors[0].path,
          errorValidationKey: err.errors[0].validatorKey,
          errorValue: err.errors[0].value
        });
      });
  }
}
