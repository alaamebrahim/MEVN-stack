"use strict";

import passport from "../../passport";
import authInfo from "../../config/auth";
import jwt from "jsonwebtoken";
import Hashids from "hashids";
import roles from "../../database/models/roles";
import permissions from "../../database/models/permissions";

export default class LoginController {
  /**
   * Login post proccess
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static postLogin(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user || user.isActive === 0) {
        return res.json({
          code: 401,
          error: "bad_credentials"
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        // Hashing ids
        const hashedUserId = new Hashids(authInfo.userIdKey, 32).encode(
          user.id
        );
        const hashedUserRoleId = new Hashids(authInfo.roleIdKey, 32).encode(
          user.roleId
        );

        // Get user permissions
        roles
          .findOne({
            where: { id: user.roleId },
            include: [{ model: permissions, attributes: ["key"] }]
          })
          .then(role => {
            // User object passed to frontend
            const loggedUser = {
              name: user.name,
              email: user.email,
              isActive: user.isActive,
              id: hashedUserId,
              roleId: hashedUserRoleId,
              roleName: user.role.name,
              userPermissions: role.permissions
            };
            const token = jwt.sign(loggedUser, authInfo.jwtPassKey);
            res.status(200);
            return res.json({
              code: 200,
              loggedUser,
              token
            });
          });
      });
    })(req, res, next);
  }
}
