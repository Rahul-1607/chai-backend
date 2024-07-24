const mongoose = require("mongoose");
require('dotenv').config();

// define mongodb connection URL
// const mongoURL = "mongodb://localhost:27017/hotels";
const mongoURL = process.env.MONGODB_URL;
// set up MongoDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// get the default connection
// mongoose maintain a default connectio object representing the mongodb connection

const db = mongoose.connection;

// define event listener for database connection

db.on("connected", () => {
  console.log("connected to mongodb server");
}); 

db.on("error", (err) => {
  console.log("connection error", err);
});

db.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

module.exports = db;