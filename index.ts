const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multipart = require("parse-multipart-data");

const apiRoutes = require("./src/routes/api");

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "70mb", extended: true }));

app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_URL); // * = any domain can access
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  ); // * = any domain can access
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // * = any domain can access
  res.setHeader("Access-Control-Allow-Credentials", true); // * = any domain can access
  next();
});

app.use("/api", apiRoutes);

app.use((error: any, req: any, res: any, next: any) => {
  console.log(error);
  const status = error.statusCode || 500;
  const errors = error.data === null || []; // data is a custom property on error object
  const message = error.message; // message is a default property on error object
  res.status(status).json({ status, message, errors });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 8080);
  })
  .catch(console.log);
