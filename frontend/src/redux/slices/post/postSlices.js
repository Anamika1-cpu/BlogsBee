import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

//Action to redirect
const resetPost = createAction("category/reset");
const resetEditPost = createAction("post/reset");
const resetDeletePost = createAction("post-delete/reset");

//Create POST ACtion
export const createPostAction = createAsyncThunk(
  "post/created",
  async (posts, { getState, rejectWithValue, dispatch }) => {
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
      formPostData.append("title", posts?.title);
      formPostData.append("description", posts?.description);
      formPostData.append("category", posts?.category);
      formPostData.append("image", posts?.image);
      formPostData.append("user", user);
      const { data } = await axios.post(
        `${baseUrl}/api/posts`,
        formPostData,
        config
      );
      dispatch(resetPost());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fectch POST ACtion
export const fetchPostsAction = createAsyncThunk(
  "post/list",
  async (category, { getState, rejectWithValue, dispatch }) => {
    try {
      //http call
      const { data } = await axios.get(
        `${baseUrl}/api/posts/?category=${category}`
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

//Add likes to Post Action
export const toggleAddLikesToPost = createAsyncThunk(
  "post/likes",
  async (postId, { getState, rejectWithValue, dispatch }) => {
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
      const { data } = await axios.post(
        `${baseUrl}/api/posts/likes`,
        { postId },
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
//Add disLikes to Post Action
export const toggleAddDislikesToPost = createAsyncThunk(
  "post/disLikes",
  async (postId, { getState, rejectWithValue, dispatch }) => {
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
      const { data } = await axios.post(
        `${baseUrl}/api/posts/dislike`,
        { postId },
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
// Post deatils Action
export const fetchPostDetailsAction = createAsyncThunk(
  "post/details",
  async (id, { getState, rejectWithValue, dispatch }) => {
    try {
      //http call
      const { data } = await axios.get(`${baseUrl}/api/posts/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Update Post Action
export const updatePostAction = createAsyncThunk(
  "post/updated",
  async (post, { getState, rejectWithValue, dispatch }) => {
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
        `${baseUrl}/api/posts/${post?.id}`,
        post,
        config
      );
      dispatch(resetEditPost());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Delete Post Action
export const deletePostAction = createAsyncThunk(
  "post/deleted",
  async (id, { getState, rejectWithValue, dispatch }) => {
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
      const { data } = await axios.delete(`${baseUrl}/api/posts/${id}`, config);
      dispatch(resetDeletePost());
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
const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: (builder) => {
    //create post
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPost, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreated = false;
      state.postCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //fetch posts

    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postLists = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });

    //like toggle posts

    builder.addCase(toggleAddLikesToPost.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(toggleAddLikesToPost.fulfilled, (state, action) => {
      state.loading = false;
      state.likes = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(toggleAddLikesToPost.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });

    //dislIKe toggle posts

    builder.addCase(toggleAddDislikesToPost.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(toggleAddDislikesToPost.fulfilled, (state, action) => {
      state.loading = false;
      state.disLikes = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(toggleAddDislikesToPost.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });

    //fetch post details

    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //update post

    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetEditPost, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedPost = action?.payload;
      state.appErr = undefined;
      state.isUpdated = false;
      state.serverErr = undefined;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //delete post

    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetDeletePost, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedPost = action?.payload;
      state.appErr = undefined;
      state.isDeleted = true;
      state.serverErr = undefined;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
  },
});

export default postSlice.reducer;
