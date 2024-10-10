const express = require("express");
const connectDB = require("./config/db");
const cryptoRoutes = require("./routes/cryptoRoutes");
const morgan = require("morgan");
const startCronJob = require("./jobs/cryptoCron");
require("colors");

//* env configuration
require("dotenv").config();

//* rest object
const app = express();

//* db connection
connectDB();

//* middlewares
app.use(express.json());
app.use(morgan("dev"));

//* routes
app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome to Koinx Assessment Server \n ~ Nand Kishore</h1>");
});
app.use("/api/v1/crypto", cryptoRoutes);

//* cron jon should run every 2hr when the server  is up
startCronJob();

//* port
const PORT = process.env.PORT || 8080;

//* server listening on 8080
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.bgMagenta.black.bold)
);
