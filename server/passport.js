"use strict";

import passport from "passport";
import LocalStrategyBase from "passport-local";
import User from "./database/models/users";
import Role from "./database/models/roles";
import bcrypt from "bcrypt";
import JwtStrategyBase from "passport-jwt";
import ExtractJwtBase from "passport-jwt";
import authInfo from "./config/auth";
import Hashids from 'hashids';

let LocalStrategy = LocalStrategyBase.Strategy;
let JwtStrategy = JwtStrategyBase.Strategy;
let ExtractJwt = ExtractJwtBase.ExtractJwt;

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({
        where: {
            id: id
        }
    }).then((user, err) => {
        if (err) return done(err);

        // Check that the user is not disabled or deleted
        if (!user) return done(null, false);
        if (!user.isActivated) return done(null, false);

        return done(null, user);
    });
});

// Local strateg
let local = passport.use(
    new LocalStrategy(
        {
            usernameField: "user",
            passwordField: "password",
            passReqToCallback: true
        },
        function (req, user, password, done) {
            return User.scope('withPassword')
                .findOne({
                    where: {
                        name: user
                    },
                    include: [{
                        model: Role,
                        attributes: ['name'],
                        foreignKey: 'roleId',
                    }]
                })
                .then((user, err) => {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false, {
                            message: "Incorrect username. ".user
                        });
                    }
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false, {message: "Incorrect password."});
                    }

                    return done(null, user);
                });
        }
    )
);

// JWT strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = authInfo.jwtPassKey;
// opts.issuer = authInfo.issuer;
// opts.audience = authInfo.audience;
let jwt = passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        const decodedUserId = new Hashids(authInfo.userIdKey, 32).decode(jwt_payload.id);
        User.findOne({
            where: {
                id: decodedUserId
            },
            include: [{
                model: Role,
                attributes: ['name'],
                foreignKey: 'roleId'
            }]
        }, {
            // logging: console.log
        })
            .then((user, err) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
    })
);

module.exports = local;
module.exports = jwt;
