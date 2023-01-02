const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../models/comment/Comment");
const blockUser = require("../../utils/isBlock");

//--------------------------------
// CREATE COMMENT
//--------------------------------

exports.createComment = expressAsyncHandler(async (req, res) => {
  //1.Get the user
  const user = req.user;
  //Check if user is blocked
  blockUser(user);
  //2.Get the post
  const { postId, description } = req.body;
  console.log(postId, description);
  try {
    const comment = await Comment.create({
      post: postId,
      description,
      user,
    });
    res.json(comment);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------
// FETCH ALL COMMENTS
//--------------------------------
exports.fetchAllComments = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find().sort("-created");
    res.json(comments);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------
// FETCH SINGLE COMMENT
//--------------------------------
exports.fetchSingleComment = expressAsyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.json(comment);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------
// UPDATE COMMENT
//--------------------------------
exports.updateComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        user: req?.user,
        description: req?.body?.description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(comment);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------
// DELETE COMMENT
//--------------------------------
exports.deleteComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json("comment deleted sucessfully");
  } catch (err) {
    res.json(err);
  }
});
