require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const product = require('./routes/product');
const app = express();

//middlewares
app.use(express.json());

app.use("/", (req, res, next) => {
    console.log(req.method, req.path);
    next();
  });
app.use('/api', product)
  //connecting to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to the database: ${err}`);
  });