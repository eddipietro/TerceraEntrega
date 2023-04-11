const mongoDB = require("../../src/dataBase/options/mongoDB");

const productsModel = require("../../src/dataBase/models/producto");
const userModel = require("../../src/dataBase/models/user");
const ordenModel = require("../../src/dataBase/models/ordenes");

const CrudMongoDB = require("../../src/dataBase/crudMongoDB/crudOrdenes");

class OrdenesDAOMongoDB extends CrudMongoDB {
  constructor() {
    super(mongoDB, productsModel, userModel, ordenModel);
  }
}

module.exports = OrdenesDAOMongoDB;