const mongoDB = require("../src/db/options/mongoDB");

const messageModel = require("../src/db/models/message");

const ContenedorMessage = require("../src/db/contenedor/ContenedorMessage");

class MessageDAOMongoDB extends ContenedorMessage {
  constructor() {
    super(mongoDB, messageModel);
  }
}

module.exports = MessageDAOMongoDB;