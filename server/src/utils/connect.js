const mongoose = require("mongoose");
const logger = require("./logger");

const connectToDatabase = async () => {
  try {
    const URI = "mongodb+srv://learnmongo:learnmongo@learnmongo.b6ij2g4.mongodb.net/userauth";

    mongoose.set("strictQuery", true);
    await mongoose.connect(URI, {
      retryWrites: true,
      w: "majority",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connection Successful!");
    logger.log("info", "Database Connection Successful!");
  } catch (error) {
    console.log("Failed to establish database connection.");
    logger.log("error", error);
  }
};

module.exports = connectToDatabase;
