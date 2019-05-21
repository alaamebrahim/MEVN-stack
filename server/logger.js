"use strict";

let winston = require("winston");
let path = require("path");
let fs = require("fs");
let mkdirp = require("mkdirp");

let loggerInfo = require("./config/logger");

let transports = [];

/**
 * Console transporter
 */
transports.push(
  new winston.transports.Console({
    level: loggerInfo.level,
    colorize: true,
    prettyPrint: true,
    handleExceptions: process.env.NODE_ENV === "production"
  })
);

/**
 * File transporter
 */
if (loggerInfo.file.enabled) {
  // Create logs directory
  let logDir = loggerInfo.file.path;
  if (!fs.existsSync(logDir)) {
    mkdirp(logDir);
  }
  console.log(logDir);

  transports.push(
    new (require("winston-daily-rotate-file"))({
      filename: path.join(logDir, "server.log"),
      level: loggerInfo.file.level || "info",
      timestamp: true,
      json: loggerInfo.file.json || false,
      handleExceptions: true
    })
  );

  if (loggerInfo.file.exceptionFile) {
    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, "exceptions.log"),
        level: "error",
        timestamp: true,
        json: loggerInfo.file.json || false,
        prettyPrint: true,
        handleExceptions: true,

        humanReadableUnhandledException: true
      })
    );
  }
}

let log = winston.createLogger({
  level: "debug",
  transports: transports,
  exitOnError: false
});

module.exports = log;
