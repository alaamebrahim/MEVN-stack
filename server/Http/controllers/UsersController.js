"use strict";

import passport from "../../passport";
import authInfo from "../../config/auth";
import jwt from "jsonwebtoken";
import log from "../../logger";
import Hashids from 'hashids';

export default class UsersController {
    /**
     * Login post proccess
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static postLogin(req, res, next) {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.json({
                    code: 501,
                    error: "no user",
                    message: info
                });
            }
            if (user.isActive === 0) {
                return res.json({
                    code: 501,
                    error: "user is not activated",
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                const hashedUserId     = new Hashids(authInfo.userIdKey, 32).encode(user.id);
                const hashedUserRoleId = new Hashids(authInfo.roleIdKey, 32).encode(user.roleId);
                const loggedUser = {
                    name: user.name,
                    email: user.email,
                    isActive: user.isActive,
                    id: hashedUserId,
                    roleId: hashedUserRoleId
                };
                const token = jwt.sign(loggedUser, authInfo.jwtPassKey) ;
                return res.json({
                    success: true,
                    loggedUser,
                    token
                });
            });
        })(req, res, next);
    }

    /**
     * Test authentication
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static getTest(req, res, next) {
        log.log({
            level: "info",
            message: "test"
        });
        res.json({done: true});
    }
}
