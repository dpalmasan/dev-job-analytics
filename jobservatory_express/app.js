const express = require("express");
const rateLimit = require('express-rate-limit');
const morgan = require("morgan");
const cors = require("cors");
const technologies = require("./routes/api/technologies");
const questions = require("./routes/api/questions");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Limit to 15 requests per minute
  const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 15
  });
  app.use(apiRequestLimiter);

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  app.use("/api/v1/technologies", technologies);
  app.use("/api/v1/questions", questions);

  return app;
}

module.exports = createApp;