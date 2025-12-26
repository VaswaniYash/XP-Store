// scripts/test-mongo.js
const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/xpstore_test";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });