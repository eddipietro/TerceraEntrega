const express = require("express");
const cookiesRouter = require("./cookies/cookies.routes");
const sessionRouter = require("./session/session.router");
const dotenv = require("dotenv");
require("dotenv").config();
// const pageRouter = require("./pages/pages.router");
// const authRoutes = require("./auth/auth.route");

const router = express.Router();

router
  .get("/health", (_req, res) => {
    const environment = process.env.ENVIRONMENT || "Undefined";
    res.status(200).json({
      success: true,
      health: "UP",
      environment,
    });
  })

  .use("/cookies", cookiesRouter)
  .use("/session", sessionRouter);
// .use(pageRouter)
// .use("/api/auth", authRoutes);

module.exports = router;