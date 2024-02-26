const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`);
  }
};

module.exports = connectToDatabase;
