import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

//Action to redirect
const resetProfilePhoto = createAction("profilePhoto/reset");
const resetUserAction = createAction("user/profile/reset");
const resetPasswordAction = createAction("user/password/reset");

//register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//LOGIN ACTION
export const loginUserAction = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        user,
        config
      );
      //save user in local storage
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      if (!err?.response) throw err;
      return rejectWithValue(err?.response?.data);
    }
  }
);

//LOGOUT ACTION
export const logoutUserAction = createAsyncThunk(
  "users/logout",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      localStorage.removeItem("user");
    } catch (err) {
      if (err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);
//get user from local storage and save in store
const userLoginFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Profile
export const userProfileAction = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/users/profile/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch User details ACtion
export const fetchUserAction = createAsyncThunk(
  "user/details",
  async (id, { getState, rejectWithValue, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    console.log(user);

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.get(`${baseUrl}/api/users/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//UPload Profile Photo ACtion
export const UploadProfilePhotoAction = createAsyncThunk(
  "user/profile-photo",
  async (userImg, { getState, rejectWithValue, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    console.log(user);

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const formPostData = new FormData();
      formPostData.append("image", userImg?.image);
      const { data } = await axios.put(
        `${baseUrl}/api/users/profilePhoto-upload`,
        formPostData,
        config
      );
      dispatch(resetProfilePhoto());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update user action
export const updateUserAction = createAsyncThunk(
  "user/update",
  async (useR, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.put(
        `${baseUrl}/api/users`,
        {
          lastName: useR?.lastName,
          firstName: useR?.firstName,
          bio: useR?.bio,
          email: useR?.email,
        },
        config
      );
      dispatch(resetUserAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Follow user action
export const followUserAction = createAsyncThunk(
  "user/follow",
  async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.patch(
        `${baseUrl}/api/users/follow`,
        { followId: userToFollowId },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Unfollow user action
export const unfollowUserAction = createAsyncThunk(
  "user/unfollow",
  async (userToUnfollowId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.patch(
        `${baseUrl}/api/users/unfollow`,
        { unfollowId: userToUnfollowId },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch ALL User  ACtion
export const fetchAllUsersAction = createAsyncThunk(
  "user/list",
  async (users, { getState, rejectWithValue, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.get(`${baseUrl}/api/users`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Block user
export const userBlockAction = createAsyncThunk(
  "user/block",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/block-user/${id}`,
        {},
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// UNBlock user Action
export const userunBlockAction = createAsyncThunk(
  "user/un-block",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/unblock-user/${id}`,
        {},
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Update Password Action
export const updatePasswordAction = createAsyncThunk(
  "update/password",
  async (password, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.patch(
        `${baseUrl}/api/users/password`,
        password,
        config
      );
      console.log(data);
      dispatch(resetPasswordAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Password reset token generator action
export const passwordResetTokenAction = createAsyncThunk(
  "password/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/forgot-password-token`,
        email,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Password reset  action
export const passwordResetAction = createAsyncThunk(
  "password/reset",
  async (password, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.patch(
        `${baseUrl}/api/users/reset-password`,
        password,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//SLICES
const userSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    //REGISTER SLICES
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });

    //LOGIN SLICES
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //LOGOUT SLICES
    builder.addCase(logoutUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = undefined;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth = undefined;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });

    // FETCH USER DETIALS SLICES
    builder.addCase(fetchUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userProfile = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    // UPLOAD PROFILE PHOTO SLICE
    builder.addCase(UploadProfilePhotoAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetProfilePhoto, (state, action) => {
      state.isUploaded = true;
    });
    builder.addCase(UploadProfilePhotoAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profilePhoto = action?.payload;
      state.isUploaded = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(UploadProfilePhotoAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });

    // UPDATE USER SLICE
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetUserAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userUpdated = action?.payload;
      state.isUpdated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    // FOLLOW USER SLICE
    builder.addCase(followUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userFollowed = action?.payload;
      state.userUnfollowed = undefined;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    // UNFOLLOW USER SLICE
    builder.addCase(unfollowUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unfollowUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userUnfollowed = action?.payload;
      state.userFollowed = undefined;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unfollowUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    // FETCH USER PROFILE SLICES
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    // FETCH  ALL USERS  SLICES
    builder.addCase(fetchAllUsersAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.usersList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    // BLOCK USER  SLICES
    builder.addCase(userBlockAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userBlockAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userBlock = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userBlockAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    // UNBLOCK USER  SLICES
    builder.addCase(userunBlockAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userunBlockAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userUnBlock = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userunBlockAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    // UPDATE USER PASSWORD  SLICES
    builder.addCase(updatePasswordAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetPasswordAction, (state, action) => {
      state.isPasswordUpdated = true;
    });
    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isPasswordUpdated = false;
      state.passwordUpdate = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //  PASSWORD RESET TOKEN  SLICES
    builder.addCase(passwordResetTokenAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordToken = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //  PASSWORD RESET   SLICES
    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordReset = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
  },
});

export default userSlices.reducer;
