const express = require("express");
const {
  createComment,
  fetchAllComments,
  fetchSingleComment,
  updateComment,
  deleteComment,
} = require("../../controllers/comment/commentCntrl");
const authMiddleware = require("../../middlewares/error/auth/authMiddleware");
const { update } = require("../../models/comment/Comment");
const router = express.Router();

router.post("/", authMiddleware, createComment);

router.get("/", fetchAllComments);

router.get("/:id", authMiddleware, fetchSingleComment);

router.put("/:id", authMiddleware, updateComment);

router.delete("/:id", authMiddleware, deleteComment);

module.exports = router;
