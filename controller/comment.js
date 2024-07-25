const User = require("../model/user");
const Comment = require("../model/comment");
const Post = require("../model/post");

const getComment = async (req, res) => {
  try {
    const postComment = await Post.findById(req.body.postId)
      .populate("Comment")
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
    const newComment = await Comment.create(req.body);
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

const updateComment = (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

const deleteComment = (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
