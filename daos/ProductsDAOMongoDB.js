const mongoDB = require("../src/db/options/mongoDB");

const productsModel = require("../src/db/models/products");

const ContenedorProducts = require("../src/db/contenedor/ContenedorMessage");

class ProductsDAOMongoDB extends ContenedorProducts {
  constructor() {
    super(mongoDB, productsModel);
  }
}

module.exports = ProductsDAOMongoDB;