"use strict";

let path = require("path");
let fs = require("fs");

const loggerInfo = {
  level: "info",
  file: {
    enabled: true,
    path: path.join(path.dirname(require.main.filename), "../logs"),
    level: "info",
    json: false,
    exceptionFile: true
  }
};

module.exports = loggerInfo;
