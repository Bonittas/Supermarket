require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors package
const userAuth = require("./routes/user.router");
const connectToDatabase = require("./config/database");
const app = express();
const product = require("./routes/product")
const category = require("./routes/category")
const path = require("path");
const order =require("./routes/order")
const feedback = require("./routes/feedback")
const payment = require("./routes/payment")
app.use(express.json());

app.use(express.static(path.join(__dirname,'/frontend/build')))
app.get('*',(req,res)=> res.sendFile(path.join(__dirname,'/frontend/build/index.html')))
app.use("/", (req, res, next) => {
  console.log(req.method, req.path);
  next();
});
 app.use(cors())
app.use('/uploads/', express.static(path.join(__dirname, 'uploads')));

 
// Connect to the database
connectToDatabase()
// Routes middleware for products, categories, orders, and feedback
app.use('/api',product)
app.use('/api',category)
app.use('/api',order)
app.use('/api',feedback)

// Routes middleware for payment
app.use('/api',payment)

// Routes middleware for signIn and SignUp
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

// Start the server
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});