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
                const loggedUser = {
                    id: new Hashids('user').encode(user.roleId, 5),
                    name: user.name,
                    email: user.email,
                    isActive: user.isActive,
                    roleId: new Hashids('roles').encode(user.roleId, 4)
                };
                const token = jwt.sign(loggedUser, authInfo.jwtPassKey + new Hashids('jwt').encode(user.id, 10));
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
