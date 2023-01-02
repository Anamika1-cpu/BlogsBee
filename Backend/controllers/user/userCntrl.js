const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/database/token/generateToken");
const validateMongodbId = require("../../utils/validateMongoDbId");
const sgMail = require("@sendgrid/mail");
const { cloudinaryUploadImage } = require("../../utils/cloudinary");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const { response } = require("express");
const User = require("../../models/user/User");
const fs = require("fs");
const blockUser = require("../../utils/isBlock");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//--------------------------------------//
// PROFILE PHOTO UPLOAD
//--------------------------------------//

exports.profilePhotoUploadCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  //1.Get the path to image
  const localPath = `public/images/profile/${req.file.filename}`;
  //2.Upload to cloudinary
  const imageUpload = await cloudinaryUploadImage(localPath);
  const foundUser = await User.findByIdAndUpdate(
    _id,
    {
      profilePhoto: imageUpload?.url,
    },
    {
      new: true,
    }
  );
  //Remove image from local public folder
  fs.unlinkSync(localPath);
  res.json(foundUser);
});

//--------------------------------------//
// REGISTER USER
//--------------------------------------//
exports.userRegister = expressAsyncHandler(async (req, res, next) => {
  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) return next(new Error("User already exists"));
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    return res.json(user);
  } catch (err) {
    return res.json(err);
  }
});

//--------------------------------------//
//LOGIN USER
//--------------------------------------//
exports.loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });

  //Check if password is matched
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound._id),
      isAccountVerified: userFound?.isAccountVerified,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

//--------------------------------------//
// FETCH ALL USERS
//--------------------------------------//
exports.fetchAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).populate("posts");
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------------//
//DELETE USER
//--------------------------------------//
exports.deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await User.findByIdAndDelete(id);
    res.json("User Deleted");
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------------//
//FETCH SINGLE USER
//--------------------------------------//
exports.fetchSingleUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await User.findById(id).populate("posts").populate("viewedBy");
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------------//
//USER PROFILE
//--------------------------------------//
exports.userProfile = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  //get the login user
  const loginUserId = req?.user?._id.toString();
  try {
    const user = await User.findById(id).populate("viewedBy").populate("posts");
    const alreadyViewed = user?.viewedBy?.find((user) => {
      return user._id?.toString() === loginUserId;
    });
    if (alreadyViewed) {
      res.json(user);
    } else {
      const profile = await User.findByIdAndUpdate(user?._id, {
        $push: {
          viewedBy: loginUserId,
        },
      });
      res.json(user);
    }
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------------//
//UPDATE USER PROFILE
//--------------------------------------//

exports.updateUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  blockUser(req?.user);
  validateMongodbId(_id);

  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

//--------------------------------------//
//-------UPDATE USER PASSWORD-----------------//
//--------------------------------------//

exports.updateUserPassword = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  //Find the user by _id
  const user = await User.findById(_id);

  if (password) {
    user.password = password;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json("user");
  }
});

//--------------------------------------//
//-------USER FOLLOWING-----------------//
//--------------------------------------//
exports.followingUser = expressAsyncHandler(async (req, res) => {
  const { followId } = req.body;
  const loginUserId = req.user.id;

  const targetedUser = await User.findById(followId);

  const alreadyFollowing = targetedUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );

  if (alreadyFollowing) throw new Error("You have alreay followed this user");
  await User.findByIdAndUpdate(
    followId,
    {
      $push: {
        followers: loginUserId,
      },
      isFollowing: true,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );

  res.json("You followed the user successfully");
});

//--------------------------------------//
//------- USER UNFOLLOWING-----------------//
//--------------------------------------//

exports.unfollowingUser = expressAsyncHandler(async (req, res) => {
  const { unfollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unfollowId,
    {
      $pull: {
        followers: loginUserId,
      },
      isFollowing: false,
    },
    {
      new: true,
    }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: {
        following: unfollowId,
      },
    },
    {
      new: true,
    }
  );
  res.json("You have successfully unfollowed");
});

//--------------------------------------//
//------- BLOCK USER-----------------//
//--------------------------------------//

exports.blockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------------//
//------- UNBLOCK USER-----------------//
//--------------------------------------//

exports.unblockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    {
      new: true,
    }
  );
  res.json(user);
});

//--------------------------------------//
// GENERATE EMAIL VERIFICATION TOKEN
//--------------------------------------//
exports.generateVerificationMail = expressAsyncHandler(async (req, res) => {
  const loginUserId = req.user.id;
  const user = await User.findById(loginUserId);
  console.log(user);
  try {
    // Generate Token
    const verificationToken = await user.getAccounVerificationToken();
    await user.save();

    //Build your message
    const resetURL = `${req.protocol}://https://strong-liger-f94f9c.netlify.app/verify-account/${verificationToken}`;

    const message = `Your account verification link is, Verify within 10 minutes, :- \n\n ${resetURL} \n\n If you have not requested, Then, Please ignore`;

    await sendEmail({
      email: user?.email,
      subject: ` Verification mail`,
      message,
    });
    res.json(resetURL);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------------//
// ACCOUNT  VERIFICATION
//--------------------------------------//

exports.accountVerification = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  //find this user by token
  const user = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });

  if (!user) throw new Error("Token Expired , try again later !!");

  //update the propery to true
  user.isAccountVerified = true;
  user.accountVerificationToken = undefined;
  user.accountVerificationTokenExpires = undefined;
  await user.save();
  res.json(user);
});

//--------------------------------------//
// FORGOT PASSWORD TOKEN
//--------------------------------------//

exports.resetPasswordToken = expressAsyncHandler(async (req, res) => {
  //find the user by email
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  try {
    const token = await user.getResetPaswordToken();
    await user.save();

    //Build your message
    const resetURL = `${req.protocol}://https://strong-liger-f94f9c.netlify.app/reset-password/${token}`;

    const message = `Your reset Password link is, :- \n\n ${resetURL} \n\n If you have not requested, Then, Please ignore \n Link will expire in 10 minutes`;

    await sendEmail({
      email: email,
      subject: ` Reset Password `,
      message,
    });
    res.json(resetURL);
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------------//
//  RESET PASSWORD
//--------------------------------------//
exports.resetPassword = expressAsyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  //find user with hashed token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  });
  if (!user) throw new Error("Token Expired, try again lter!!");

  //Update /chnage password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});
