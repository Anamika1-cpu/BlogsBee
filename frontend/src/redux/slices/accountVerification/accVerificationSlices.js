import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

//action to redirect
const accReset = createAction("account/verify-reset");
//account send Token action
export const accVerificationSendToken = createAsyncThunk(
  "account/token",
  async (email, { getState, rejectWithValue, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    //http call
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/generate-verify-email-token`,
        {},
        config
      );
      console.log(data);
      return data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);

//account verify token
export const VerifyAccountAction = createAsyncThunk(
  "account/verify",
  async (token, { getState, rejectWithValue, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    //http call
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/verify-account`,
        { token },
        config
      );
      dispatch(accReset());
      console.log(data);
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

const accountVerificationSlice = createSlice({
  name: "account",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(accVerificationSendToken.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(accVerificationSendToken.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(accVerificationSendToken.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //verify account Slice
    builder.addCase(VerifyAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(accReset, (state, action) => {
      state.isVerified = true;
    });
    builder.addCase(VerifyAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.verified = action?.payload;
      state.isVerified = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(VerifyAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});
export default accountVerificationSlice.reducer;
