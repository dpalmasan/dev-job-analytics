const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const createApp = require("./app");


dotenv.config({ path: "./config/config.env" });
connectDB();

const app = createApp();
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} / CORS ENABLED`
      .blue.bold
  )
);
