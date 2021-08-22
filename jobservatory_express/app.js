const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const technologies = require("./routes/api/technologies");
const questions = require("./routes/api/questions");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  app.use("/api/v1/technologies", technologies);
  app.use("/api/v1/questions", questions);

  return app;
}

module.exports = createApp;