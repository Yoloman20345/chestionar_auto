const mongoose = require("mongoose");

const URI =
  "mongodb+srv://Czryourbro:Cezar2004@cluster0.8efmu.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
