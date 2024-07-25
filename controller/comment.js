const User = require("../model/user");
const Comment = require("../model/comment");
const Post = require("../model/post");

const getComment = async (req, res) => {
  try {
    const postComment = await Post.findById(req.body.postId)
      .populate("comments")
      .select("comments");
    res.status(200).json({
      status: "success",
      message: "all the comments",
      comments: postComment,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
    });
    await Post.findByIdAndUpdate(req.body.postId, {
      $push: { comments: newComment._id },
      author: req.user._id,
      post: req.body.postId,
    });
    res.status(200).json({
      status: "success",
      message: "created comment successfully",
      data: newComment,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.body.commentId, {
      $set: { content: req.body.content },
    });
    res.status(200).json({
      status: "success",
      message: "update comment successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.body.commentId, {
      $set: { isActive: false },
    });
    res.status(200).json({
      status: "success",
      message: "delete comment successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

const commentController = {
  getComment,
  createComment,
  deleteComment,
  updateComment,
};

module.exports = commentController;
