require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors package
const userAuth = require("./routes/user.router");
const connectToDatabase = require("./config/database");
const app = express();
const product = require("./routes/product");
const category = require("./routes/category");

// Middleware for parsing the request body
app.use(express.json());

app.use("/", (req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Enable CORS for all routes
app.use(cors());

// Connect to the database
connectToDatabase();

app.use("/api", product);
app.use("/api", category);
app.use("/api/auth", userAuth);


app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});