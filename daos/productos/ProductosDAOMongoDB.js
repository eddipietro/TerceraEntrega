const mongoDB = require("../../src/dataBase/options/mongoDB");
const productsModel = require("../../src/dataBase/models/producto");

const CrudMongoDB = require("../../src/dataBase/crudMongoDB/crudProductos");

class ProductosDAOMongoDB extends CrudMongoDB {
  constructor() {
    super(mongoDB, productsModel);
  }
}

module.exports = ProductosDAOMongoDB;