const expressAsyncHandler = require("express-async-handler");
const Category = require("../../models/category/Category");

//--------------------------------
//  CREATE CATEGORY
//--------------------------------
exports.createCategory = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  try {
    const category = await Category.create({
      user: req.user?._id,
      title: req?.body?.title,
    });
    res.json(category);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------
// FETCH ALL CATEGORIES
//--------------------------------
exports.fetchAllCategories = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate("user")
      .sort("-createdAt");
    res.json(categories);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------
// FETCH SINGLE CATEGORY
//--------------------------------
exports.fetchSingleCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    res.json(category);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------
// UPDATE CATEGORY
//--------------------------------

exports.updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(category);
  } catch (er) {
    res.json(err);
  }
});

//--------------------------------
// DELETE CATEGORY
//--------------------------------
exports.deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.json("category deleted successfully");
  } catch (er) {
    res.json(err);
  }
});
