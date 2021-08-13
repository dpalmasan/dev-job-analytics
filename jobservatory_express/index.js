const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
var cors = require("cors");

dotenv.config({ path: "./config/config.env" });

connectDB();
const technologies = require("./routes/api/technologies");
// const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/technologies", technologies);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} / CORS ENABLED`
      .blue.bold
  )
);

// // const logger = (req, res, next) => {
// //   console.log(`hello`);
// //   next();
// // };

// //body parser middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use("/api/members", require("./routes/api/members"));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log("Server running", PORT));
