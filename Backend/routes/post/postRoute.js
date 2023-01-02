const { Router } = require("express");
const express = require("express");
const {
  createPost,
  fetchAllPosts,
  fetchSinglePost,
  updatePost,
  deletePost,
  toggleAddDislikeToPost,
  toggleAddLikeToPosts,
} = require("../../controllers/post/postCntrl");
const authMiddleware = require("../../middlewares/error/auth/authMiddleware");
const {
  photoUpload,
  postPhotoResize,
} = require("../../middlewares/uploads/photoUpload");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  photoUpload.single("image"),
  postPhotoResize,
  createPost
);

router.get("/", fetchAllPosts);

router.get("/:id", fetchSinglePost);

router.put("/:id", authMiddleware, updatePost);

router.delete("/:id", authMiddleware, deletePost);

router.post("/likes", authMiddleware, toggleAddLikeToPosts);

router.post("/dislike", authMiddleware, toggleAddDislikeToPost);

module.exports = router;
