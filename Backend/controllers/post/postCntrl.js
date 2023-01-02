const expressAsyncHandler = require("express-async-handler");
const Post = require("../../models/post/Post");
const validateMongodbId = require("../../utils/validateMongoDbId");
const Filter = require("bad-words");
const User = require("../../models/user/User");
const { cloudinaryUploadImage } = require("../../utils/cloudinary");
const fs = require("fs");
const blockUser = require("../../utils/isBlock");
//----------------------------------------------//
// POST CREATION
//----------------------------------------------//

exports.createPost = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  blockUser(req.user);
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);
  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      "Creating Failed because it contains profane words and you have been blocked"
    );
  }
  console.log(req.file);
  //1.Get the path to image
  const localPath = `public/images/posts/${req.file.filename}`;
  //2.Upload to cloudinary
  const imageUpload = await cloudinaryUploadImage(localPath);
  const loginUser = req.user;
  try {
    const post = await Post.create({
      ...req.body,
      image: imageUpload?.url,
      user: _id,
      title: req.body.title,
    });
    //update the user post count
    await User.findByIdAndUpdate(
      _id,
      {
        $inc: { postCount: 1 },
      },
      {
        new: true,
      }
    );
    //Remove image from local public folder
    fs.unlinkSync(localPath);
    res.json({ post, loginUser });
  } catch (err) {
    res.json(err);
  }
});

//----------------------------------------------//
// FETCH ALL POSTS
//----------------------------------------------//
exports.fetchAllPosts = expressAsyncHandler(async (req, res) => {
  const hasCategory = req.query.category;
  try {
    //check if it has a category
    if (hasCategory) {
      const posts = await Post.find({ category: hasCategory })
        .populate("user")
        .populate("comments")
        .sort("-createdAt");
      res.json(posts);
    } else {
      const posts = await Post.find({})
        .populate("user")
        .populate("comments")
        .sort("-createdAt");

      res.json(posts);
    }
  } catch (err) {
    res.json(err);
  }
});

//----------------------------------------------//
// FETCH SINGLE POST
//----------------------------------------------//
exports.fetchSinglePost = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongodbId(id);
  if (validateMongodbId)
    try {
      const post = await Post.findById(id)
        .populate("user")
        .populate("likes")
        .populate("disLikes")
        .populate("comments");

      //update num of views
      await Post.findByIdAndUpdate(
        id,
        {
          $inc: {
            numViews: +1,
          },
        },
        {
          new: true,
        }
      );
      res.json(post);
    } catch (err) {
      res.json(err);
    }
});

//----------------------------------------------//
// UPDATE  POST
//----------------------------------------------//
exports.updatePost = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: req.user._id,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});

//----------------------------------------------//
// DELETE POST
//----------------------------------------------//
exports.deletePost = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    await Post.findByIdAndDelete(id);
    res.json("Post deleted successfully");
  } catch (err) {
    res.json(err);
  }
});

//----------------------------------------------//
// LIKE A POST
//----------------------------------------------//
// exports.toggleAddLikeToPost = expressAsyncHandler(async (req, res) => {
//   //1. Find the post to be liked
//   const { postId } = req.body;
//   const post = await Post.findById(postId);
//   //2.Find the login user
//   const loginUserId = await req?.user?._id;
//   //3.Check if the post is already liked by this user
//   const isLiked = post?.isLiked;
//   //4.Check if the post is already dislike by this user
//   const alreadyDisliked = post?.disLikes?.find(
//     (userId) => userId?.toString() === loginUserId.toString()
//   );
//   //5.remove user from dislike array
//   if (alreadyDisliked) {
//     const post = await Post.findByIdAndUpdate(
//       postId,
//       {
//         $pull: {
//           dislikes: loginUserId,
//         },
//         isDisLiked: false,
//       },
//       { new: true }
//     );
//     res.json(post);
//   }
//   //Toggle
//   //Remove the user if he has liked the post
//   // if (isLiked) {
//   //   const post = await Post.findById(postId);
//   //   const indexOfUser = post.likes.indexOf(loginUserId);
//   //   post.isLiked = false;
//   //   post.likes.splice(indexOfUser, 1);
//   //   await post.save();
//   //   res.json("like array s htaya user");
//   // }
//   if (isLiked) {
//     const post = await Post.findByIdAndUpdate(
//       postId,
//       {
//         $pull: { likes: loginUserId },
//         isLiked: false,
//       },
//       { new: true }
//     );
//     res.json(post);
//   } else {
//     //add like to the post
//     const post = await Post.findByIdAndUpdate(
//       postId,
//       {
//         $push: {
//           likes: loginUserId,
//         },
//         isLiked: true,
//       },
//       { new: true }
//     );
//     res.json(post);
//   }
// });

//----------------------------------
// Dislikes
//---------------------------------
// exports.toggleAddDisikeToPost = expressAsyncHandler(async (req, res) => {
//   //1. Find the post to be disliked
//   const { postId } = req.body;
//   const post = await Post.findById(postId);
//   //2.Find the login user
//   const loginUserId = req?.user?._id;
//   //3.Check if the post is already disliked by this user
//   const isDisLiked = post?.isDisLiked;
//   //4.Check if the post is already liked by this user
//   const alreadyLiked = post?.likes?.find(
//     (userId) => userId.toString() === loginUserId.toString()
//   );
//   //Remove this user from likes array if exists
//   if (alreadyLiked) {
//     const post = await Post.findOneAndUpdate(
//       postId,
//       {
//         $pull: {
//           likes: loginUserId,
//         },
//         isLiked: false,
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(post);
//   }

//   //Toggling
//   //Remove the user from dislikes if they already disliked the post
//   if (isDisLiked) {
//     const post = await Post.findByIdAndUpdate(
//       postId,
//       {
//         $pull: {
//           disLikes: loginUserId,
//         },
//         isDisLiked: false,
//       },
//       { new: true }
//     );
//     res.json(post);
//   }
//   // else if (isDisLiked) {
//   //   const post = await Post.findById(postId);
//   //   const indexOfUser = post.disLikes.indexOf(loginUserId);
//   //   post.isDisLiked = false;
//   //   post.disLikes.splice(indexOfUser, 1);
//   //   await post.save();
//   //   res.json(post);
//   else {
//     //add dislike to the post
//     const post = await Post.findByIdAndUpdate(
//       postId,
//       {
//         $push: {
//           disLikes: loginUserId,
//         },
//         isDisLiked: true,
//       },
//       { new: true }
//     );
//     res.json(post);
//   }
// });

// exports.toggleAddDislikeToPost = expressAsyncHandler(async (req, res) => {
//   //1.Find the post to be disLiked
//   const { postId } = req.body;
//   const post = await Post.findById(postId);
//   //2.Find the login user
//   const loginUserId = req?.user?._id;
//   //3.Check if this user has already disLikes
//   const isDisLiked = post?.isDisLiked;
//   //4. Check if already like this post
//   const alreadyLiked = post?.likes?.find(
//     (userId) => userId.toString() === loginUserId?.toString()
//   );
//   //Remove this user from likes array if it exists
//   if (alreadyLiked) {
//     const post = await Post.findOneAndUpdate(
//       postId,
//       {
//         $pull: { likes: loginUserId },
//         isLiked: false,
//       },
//       { new: true }
//     );
//     res.json(post);
//   }
//   //Toggling
//   //Remove this user from dislikes if already disliked
//   if (isDisLiked) {
//     const post = await Post.findByIdAndUpdate(
//       postId,
//       {
//         $pull: { disLikes: loginUserId },
//         isDisLiked: false,
//       },
//       { new: true }
//     );
//     res.json(post);
//   } else {
//     //add dislike to the post
//     const post = await Post.findByIdAndUpdate(
//       postId,
//       {
//         $push: {
//           disLikes: loginUserId,
//         },
//         isDisLiked: true,
//       },
//       { new: true }
//     );
//     res.json(post);
//   }
//   // else {
//   //   const post = await Post.findByIdAndUpdate(
//   //     postId,
//   //     {
//   //       $push: { disLikes: loginUserId },
//   //       isDisLiked: true,
//   //     },
//   //     { new: true }
//   //   );
//   //   res.json(post);
//   // }
// });

//------------------------------
//Likes
//------------------------------

exports.toggleAddLikeToPosts = expressAsyncHandler(async (req, res) => {
  //1.Find the post to be liked
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2. Find the login user
  const loginUserId = req?.user?._id;
  //3. Find is this user has liked this post?
  const isLiked = post?.isLiked;
  //4.Chech if this user has dislikes this post
  const alreadyDisliked = post?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  //5.remove the user from dislikes array if exists
  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //Toggle
  //Remove the user if he has liked the post
  else if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    //add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

//------------------------------
//disLikes
//------------------------------

exports.toggleAddDislikeToPost = expressAsyncHandler(async (req, res) => {
  //1.Find the post to be disLiked
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2.Find the login user
  const loginUserId = req?.user?._id;
  //3.Check if this user has already disLikes
  const isDisLiked = post?.isDisLiked;
  //4. Check if already like this post
  const alreadyLiked = post?.likes?.find(
    (userId) => userId.toString() === loginUserId?.toString()
  );
  //Remove this user from likes array if it exists
  if (alreadyLiked) {
    const post = await Post.findOneAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //Toggling
  //Remove this user from dislikes if already disliked
  else if (isDisLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});
