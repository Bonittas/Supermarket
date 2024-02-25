require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

//middlewares
app.use(express.json());

app.listen(4000, () => {

});