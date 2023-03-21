const getDataHome = (_req, res) => {
    const data = {
      title: "Desafio Nº19",
      content: "DIVIDIR EN CAPAZ NUESTRO PROYECTO",
    };
    return res.render("index", data);
  };
  
  module.exports = {
    getDataHome,
  };