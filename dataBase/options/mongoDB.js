
const mongoose = require('mongoose');

const dotenv = require(`dotenv`);
dotenv.config();

const URL = process.env.URL_MONGO; //`mongodb://0.0.0.0:27017`;

const connection = mongoose.connect(URL, {
    useNewUrlParser: true
});

module.exports = connection;
