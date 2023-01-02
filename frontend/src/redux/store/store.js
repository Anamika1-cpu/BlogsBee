import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "../slices/users/userSlice";
import categoriesReducers from "../slices/category/categorySlice";
import post from "../slices/post/postSlices";
import comment from "../slices/comment/CommentSlice";
import sendMail from "../slices/email/emailSlices";
import acc from "../slices/accountVerification/accVerificationSlices";
const store = configureStore({
  reducer: {
    users: usersReducers,
    category: categoriesReducers,
    post,
    comment,
    sendMail,
    acc,
  },
});

export default store;
