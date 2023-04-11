const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();

mongoose.set("debug", true);
mongoose.set("strictQuery", false);
const options = {
  strict: "throw",
  strictQuery: false,
};

const URL = process.env.URL_MONGO;

const connection = mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.info("Mongoose connected");

module.exports = connection;