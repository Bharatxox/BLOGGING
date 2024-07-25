const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Types.ObjectId },
  content: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Types.ObjectId, ref: "Post" },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
