const express = require("express");

const statusCode = require("http-status");

const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

//Conteo de entradas

router.get("/", authMiddleware, (req, res) => {
  if (!req.session.contador) {
    req.session.contador = 0;
  }
  req.session.contador = req.session.contador + 1;
  res
    .status(200)
    .send(
      `<h1>Hola ${req.session.username}. Usted ingreso al servidor ${req.session.contador} veces</h1>`
    );
});

//Signin

router.post("/signin", (req, res) => {
  const USERNAME = "erika";
  const PASSWORD = "12345";
  const { usernameInput, passwordInput } = req.body;
  if (!usernameInput || !passwordInput) {
    return res.status(400).json({
      success: false,
      message: "Username or password missing",
    });
  }
  if (usernameInput != USERNAME || passwordInput != PASSWORD) {
    return res.status(403).json({
      succes: false,
      message: `${statusCode[403]}, bad username or password`,
    });
  }
  req.session.username = usernameInput;
  req.session.password = passwordInput;
  res.status(200).json({
    succes: true,
    message: "Welcome to ${USERNAME} Chat",
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    res.status(200).json({
      success: true,
      message: "Session destroyed",
    });
  });
});

router.get("/destroy", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    res.status(200).json({
      success: true,
      message: "Session destroyed",
    });
  });
});

module.exports = router;