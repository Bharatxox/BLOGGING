const Post = require("../model/post");

const getPost = async (req, res) => {
  try {
    //pagination
    const pageSize = req.query.pageSize || 10; //no of item per page
    const pageNo = req.query.pageNo || 1; //current page no

    // Filters
    const filterPost = {};
    const { title, content, author, tags, sortCreatedAt, sortTitle } =
      req.query;

    if (title) {
      filterPost.title = {
        $regex: new RegExp(`${title}`, "gi"),
      };
    }
    if (content) {
      filterPost.content = {
        $regex: new RegExp(`${content}`, "gi"),
      };
    }
    if (author) {
      filterPost.author = {
        $regex: new RegExp(`${author}`, "gi"),
      };
    }
    if (tags) {
      filterPost.tags = { $in: tags.split(",") };
    }

    // Sorting
    const sortOptions = {};
    if (sortCreatedAt) {
      sortOptions.createdAt = sortCreatedAt === "asc" ? 1 : -1;
    }
    if (sortTitle) {
      sortOptions.title = sortTitle === "asc" ? 1 : -1;
    }

    const postList = await Post.find(filterPost)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    res.json({
      success: true,
      message: "Post list fetched successfully",
      result: postList,
    });
  } catch (err) {
    res.json({
      sucess: false,
      message: err.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      message: "post created successfully",
      data: newPost,
    });
  } catch (err) {
    res.json({
      sucess: false,
      message: err.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    await Post.findByIdAndUpdate(postId, {
      $set: req.body,
    });
    res.status(200).json({
      status: "success",
      message: "post updated successfully",
    });
  } catch (err) {
    res.json({
      sucess: false,
      message: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    //we dont delete the actual data from the DB instead we apply the flag as isActive where we store true and false
    await Post.findByIdAndUpdate(postId, {
      $set: { isActive: false },
    });
    res.json({ status: "success", message: "post deleted successfully" });
  } catch (err) {
    res.json({
      sucess: false,
      message: err.message,
    });
  }
};

const postController = { getPost, createPost, updatePost, deletePost };

module.exports = postController;
