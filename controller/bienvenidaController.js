const bienvenida = (req, res) => {
    userLog = req.user.username;
    res.render("Bienvenida", { userLog });
  };
  
  module.exports = {
    bienvenida,
  };