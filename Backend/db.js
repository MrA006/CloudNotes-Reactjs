require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.connectionString;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    });
    console.log("Connected to MongoDB Atlas successfully");
  } catch (error) {
    console.error("Connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;