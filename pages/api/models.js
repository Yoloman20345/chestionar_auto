const mongoose = require("mongoose");

// Create a Mongoose schema for the user model
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
});

// Create a Mongoose model from the schema
if (mongoose.models.User) {
  var User = mongoose.model("User");
} else {
  var User = mongoose.model("User", userSchema);
}

export default module.exports = {
  User,
};
