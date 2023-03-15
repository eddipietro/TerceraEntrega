const homeController = (_req, res) => {
  return res.render("index");
};

const signupController = (_req, res) => {
  return res.render("signup");
};

const bienvenidaController = (req, res) => {
  userLog = req.user;
  return res.render("bienvenida", { userLog });
};

const viewFormAddProductController = (_req, res) => {
  return res.render("formProductosAdmin");
};

const viewErrorController = (req, res) => {
  msgError = req.params.msg;
  return res.render("viewError");
};

module.exports = {
  homeController,
  signupController,
  bienvenidaController,
  viewFormAddProductController,
  viewErrorController,
};
