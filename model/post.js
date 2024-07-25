const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isActive: {
    type: Boolean,
    default: true,
  },
  content: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
