const mongoose = require("mongoose");
const colors = require("colors");

// function mongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected to ${mongoose.connection.host}`.blue.bold);
  } catch (error) {
    console.log("Error connecting in DB".red.bold, error);
  }
};
module.exports = connectDB;
