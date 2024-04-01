const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  problemSolved: {
    type: [
      {
        title: { type: String, unique: true },
        url: { type: String, unique: true },
        difficulty: String,
      },
    ],
    default: [],
  },
  languages: {
    type: [String],
    default: [],
  },
});

const UserModel = new mongoose.model("User", userSchema);

module.exports = UserModel;
