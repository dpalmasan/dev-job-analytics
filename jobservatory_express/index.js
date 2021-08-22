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
