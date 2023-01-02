const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { log } = require("util");
//create schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      required: [true, "First name is required"],
      type: String,
    },
    lastName: {
      required: [true, "Last name is required"],
      type: String,
    },
    profilePhoto: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/bHY50kvRmdB_KDHz8dgVgKU7EBxiFdYUh4Kp35DrMHSAcTiVr4ag1ZoEEa8RqwCDSlq3RbC0a8zS8ELO_3qQ7J0eaMIM6eQHu2saKcqg-tNpBL-leTjuJSaYUkOtyVaB1YkketFT",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Guest", "Admin", "Blogger"],
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isUnfollowing: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: {
      type: String,
    },
    accountVerificationTokenExpires: {
      type: Date,
    },
    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//Virtual method to populate created post
userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

//Account Type
userSchema.virtual("accountType").get(function () {
  const totalFollowers = this.followers?.length;
  return totalFollowers >= 5 ? "Pro Account" : "Starter Account";
});

//Hash Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//match Password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Verify Account
userSchema.methods.getAccounVerificationToken = function () {
  //create a token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000; //10 minutes
  return verificationToken;
};

//Password reset/forgot password

userSchema.methods.getResetPaswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
  return resetToken;
};

//Compile schema into model
const User = mongoose.model("User", userSchema);
module.exports = User;
