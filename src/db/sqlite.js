const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const optionsSQLite3 = {
  client: process.env.CLIENT_SQLITE3,
  connection: {
    filename: path.resolve(__dirname, process.env.FILNAME_SQLITE3),
  },
  useNullAsDefault: true,
};

module.exports = {
  optionsSQLite3,
};