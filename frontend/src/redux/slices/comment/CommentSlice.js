import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

//action to reddirect
const resetCommentAction = createAction("comments/reset");
//Create comment ACtion
export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (comment, { getState, rejectWithValue, dispatch }) => {
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
      const { data } = await axios.post(
        `${baseUrl}/api/comments/`,
        {
          description: comment?.description,
          postId: comment?.postId,
        },
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

//Delete comment ACtion
export const deleteCommentAction = createAsyncThunk(
  "comment/delete",
  async (commentId, { getState, rejectWithValue, dispatch }) => {
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
      const { data } = await axios.delete(
        `${baseUrl}/api/comments/${commentId}`,
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

//Update comment ACtion
export const updateCommentAction = createAsyncThunk(
  "comment/update",
  async (comment, { getState, rejectWithValue, dispatch }) => {
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
        `${baseUrl}/api/comments/${comment?.id}`,
        {
          description: comment?.description,
        },
        config
      );
      dispatch(resetCommentAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch comment details ACtion
export const fetchCommentAction = createAsyncThunk(
  "comment/details",
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
      const { data } = await axios.get(`${baseUrl}/api/comments/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Slices
const commentSlices = createSlice({
  name: "comment",
  initialState: {},
  extraReducers: (builder) => {
    //create comment
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //delete comment
    builder.addCase(deleteCommentAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDeleted = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });

    //update comment
    builder.addCase(updateCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetCommentAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentUpdated = action?.payload;
      state.appErr = undefined;
      state.isUpdated = false;
      state.serverErr = undefined;
    });
    builder.addCase(updateCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //fetch comment details
    builder.addCase(fetchCommentAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
  },
});

export default commentSlices.reducer;
