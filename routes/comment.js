const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const commentController = require("../controller/comment");

const router = express.Router();

router.get("/", commentController.getComment);

router.post("/create", authMiddleware, commentController.createComment);

router.post("/update", authMiddleware, commentController.updateComment);

router.delete("/delete", authMiddleware, commentController.deleteComment);

module.exports = router;
