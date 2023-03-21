class Contenedor {
    constructor(mongoDB, productsModel) {
      this.mongoDB = mongoDB;
      this.productsModel = productsModel;
    }
  
    async save(product) {
      try {
        // Instancia del modelo message
        const newProduct = new this.messageModel(product);
  
        console.log("I'm from MongoDB");
  
        this.mongoDB
          .then((_) => newProduct.save())
          .catch((err) => console.log(`Error: ${err.message}`));
      } catch (error) {
        throw Error("Error in save");
      }
    }
  
    async getAll() {
      try {
        let docs = false;
        docs = await this.productsModel.find();
        if (docs) {
          return docs;
        } else {
          return false;
        }
      } catch (error) {
        throw Error("Error in getAll");
      }
    }
  }
  module.exports = Contenedor;