const fs = require("fs");
const winston = require("winston");

if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

module.exports = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "infor",
      filename: "logs/app.logs",
      maxsize: 1048576,
      maxFiles: 10,
    }),
  ],
});
