const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const postController = require("../controller/post");
const { getPost, createPost, updatePost, deletePost } = postController;

const router = express.Router();

router.get("/", authMiddleware, getPost);

router.post("/create", authMiddleware, createPost);

router.post("/update/:postId", authMiddleware, updatePost);

router.delete("/delete/:postId", authMiddleware, deletePost);

module.exports = router;
