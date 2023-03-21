class Contenedor {
    constructor(mongoDB, messageModel) {
      this.mongoDB = mongoDB;
      this.messageModel = messageModel;
    }
  
    async save(message) {
      try {
        // Instancia del modelo message
        const newMessage = new this.messageModel(message);
  
        console.log("I'm from MongoDB");
  
        this.mongoDB
          .then((_) => newMessage.save())
          .catch((err) => console.log(`Error: ${err.message}`));
      } catch (error) {
        throw Error("Error in save");
      }
    }
  
    async getAll() {
      try {
        let docs = false;
        docs = await this.messageModel.find();
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