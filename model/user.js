const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
    default: "-",
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  createdAt: { type: Date, default: Date.now },

  posts: [{ type: mongoose.Types.ObjectId, ref: "Post", default: [] }],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
