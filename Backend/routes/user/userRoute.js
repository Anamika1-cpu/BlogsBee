const express = require("express");
const {
  userRegister,
  loginUser,
  fetchAllUsers,
  deleteUser,
  fetchSingleUser,
  userProfile,
  updateUser,
  updateUserPassword,
  followingUser,
  unfollowingUser,
  blockUser,
  unblockUser,
  profilePhotoUploadCtrl,
  generateVerificationMail,
  accountVerification,
  resetPasswordToken,
  resetPassword,
} = require("../../controllers/user/userCntrl");
const authMiddleware = require("../../middlewares/error/auth/authMiddleware");
const {
  profilePhotoResize,
  photoUpload,
} = require("../../middlewares/uploads/photoUpload");

const router = express.Router();

router.post("/register", userRegister);

router.post("/login", loginUser);
router.put(
  "/profilePhoto-upload",
  authMiddleware,
  photoUpload.single("image"),
  profilePhotoResize,
  profilePhotoUploadCtrl
);

router.get("/", authMiddleware, fetchAllUsers);

router.delete("/:id", deleteUser);

router.get("/:id", fetchSingleUser);

router.put("/", authMiddleware, updateUser);

router.patch("/password", authMiddleware, updateUserPassword);

router.get("/profile/:id", authMiddleware, userProfile);

router.patch("/follow", authMiddleware, followingUser);

router.patch("/unfollow", authMiddleware, unfollowingUser);

router.put("/block-user/:id", authMiddleware, blockUser);

router.put("/unblock-user/:id", authMiddleware, unblockUser);

router.post(
  "/generate-verify-email-token",
  authMiddleware,
  generateVerificationMail
);
router.put("/verify-account", authMiddleware, accountVerification);

router.post("/forgot-password-token", resetPasswordToken);

router.patch("/reset-password", resetPassword);

module.exports = router;
