require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userAuth = require("./routes/user.router");

const app = express();

//   Middleware for parsing the request body
app.use(express.json());

app.use("/", (req, res, next) => {
    console.log(req.method, req.path);
    next();
  });
app.get("/new", (req, res) => {
    res.send({ message: "Welcome to the server" });
});
  //connecting to the database  
  mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to the database successfully!")
  })
  .catch((err) => {
    console.log(`Error connecting to the database: ${err}`);
  });

  app.listen(process.env.PORT, () => {
    console.log("listening on port", process.env.PORT);
  });

  app.use('/api/auth', userAuth);

  // Error handling middleware 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message
    });
  });