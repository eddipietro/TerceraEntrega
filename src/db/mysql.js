const dotenv = require("dotenv");
dotenv.config();

const optionsMySQL = {
  client: "mysql",
  connection: {
    host: process.env.SQL_HOST || "localhost",
    user: process.env.SQL_USER || "root",
    password: process.env.SQL_PASSWORD || "",
    database: process.env.SQL_DATABASE || "ecommerce",
  },
  useNullAsDefault: true,
};

module.exports = {
  optionsMySQL,
};