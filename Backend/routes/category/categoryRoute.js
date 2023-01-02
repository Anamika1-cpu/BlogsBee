const express = require("express");
const {
  createCategory,
  fetchAllCategories,
  updateCategory,
  deleteCategory,
  fetchSingleCategory,
} = require("../../controllers/category/Category");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createCategory);

router.get("/", fetchAllCategories);

router.get("/:id", fetchSingleCategory);

router.put("/:id", authMiddleware, updateCategory);

router.delete("/:id", authMiddleware, deleteCategory);

module.exports = router;
