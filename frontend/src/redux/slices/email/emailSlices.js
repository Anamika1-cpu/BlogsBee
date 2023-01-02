import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

//create reset action
const resetEmailAction = createAction("mail/reset");
//create action
export const sendMailAction = createAsyncThunk(
  "mail/sent",
  async (email, { getState, rejectWithValue, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    console.log(user);
    //http call
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/email`,
        {
          message: email?.message,
          email: email?.recipientEmail,
          subject: email?.subject,
        },
        config
      );
      dispatch(resetEmailAction());
      return data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);
//SLICES

const sendMailSlice = createSlice({
  name: "mail",
  initialState: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(sendMailAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetEmailAction, (state, action) => {
      state.isMailSent = true;
    });
    builder.addCase(sendMailAction.fulfilled, (state, action) => {
      state.loading = false;
      state.mailSent = action?.payload;
      state.isMailSent = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(sendMailAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});
export default sendMailSlice.reducer;
