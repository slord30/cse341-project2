const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const initDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB via Mongoose");
  } catch (err) {
    console.error("Connection Error: ", err);
  }
};

module.exports = initDb;