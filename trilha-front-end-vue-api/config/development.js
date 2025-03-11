const loggers = require("../logger");

module.exports = {
  db: {
    database: "trilha_front_end",
    username: "",
    password: "",
    params: {
      dialect: "sqlite",
      storage: "trilha_front_end.sqlite",
      logging: (sql) => {
        loggers.info(`[${new Date()}] ${sql}`);
      },
      define: {
        underscored: true,
      },
    },
  },
};
