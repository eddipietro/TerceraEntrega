const express = require("express");

const router = express.Router();

router.get("/clear/:name", (req, res) => {
  const { name } = req.params;
  res.clearCookie(name).send("Cookie deleted");
});

router.get("/get", (req, res) => {
  res.status(200).json(req.signedCookies);
});

router.post("/", (req, res) => {
  const { name, value, time } = req.body;
  const config = {
    signed: true,
  };
  if (!time) {
    return res.cookie(name, value, config).send(`Cookies ${name} set`);
  }
  if (isNaN(time) || time < 1) {
    return res.status(400).json({
      success: false,
      message: "Bad cookie time format",
    });
  }
  config["maxAge"] = parseInt(time) * 1000;
  res.cookie(name, value, config).send(`Cookie ${name} set`);
});

router.get("/", (req, res) => {
  res.status(200).json(req.signedCookies);
});

router.delete("/:name", (req, res) => {
  const { name } = req.params;
  if (!Object.hasOwn(req.signedCookies, name)) {
    return res.status(400).json({
      success: false,
      message: `The cookie ${name} does not exists`,
    });
  }
  res.clearCookie(name).send(`Cookie ${name} was deleted successfully`);
});

module.exports = router;