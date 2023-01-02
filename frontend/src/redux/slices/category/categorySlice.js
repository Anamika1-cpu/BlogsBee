import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

//action to redirect
const resetEditAction = createAction("category/reset");
const resetDeleteAction = createAction("category/delete-reset");
const resetCategoryAction = createAction("category/create-reset");
//create action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { getState, rejectWithValue, dispatch }) => {
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
        `${baseUrl}/api/category`,
        {
          title: category?.title,
        },
        config
      );
      dispatch(resetCategoryAction());
      return data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);
//FETCH all ACTION
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch",
  async (category, { getState, rejectWithValue, dispatch }) => {
    //get user tokens
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
      const { data } = await axios.get(`${baseUrl}/api/category`, config);
      return data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);
//UPDATE CATEGOY ACTION
export const updateCategoriesAction = createAsyncThunk(
  "category/update",
  async (category, { getState, rejectWithValue, dispatch }) => {
    //get user tokens
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
      const { data } = await axios.put(
        `${baseUrl}/api/category/${category?.id}`,
        { title: category?.title },
        config
      );
      //dipatch action to reset the updated data
      dispatch(resetEditAction());
      return data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);
//DELETE CATEGORY ACTION
export const deleteCategoriesAction = createAsyncThunk(
  "category/delete",
  async (id, { getState, rejectWithValue, dispatch }) => {
    //get user tokens
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
      const { data } = await axios.delete(
        `${baseUrl}/api/category/${id}`,
        config
      );
      dispatch(resetDeleteAction());
      return data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);
//FETCH Detaills ACTION
export const fetchCategoryAction = createAsyncThunk(
  "category/details",
  async (id, { getState, rejectWithValue, dispatch }) => {
    //get user tokens
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
      const { data } = await axios.get(`${baseUrl}/api/category/${id}`, config);
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

const categorySlices = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetCategoryAction, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreated = false;
      state.category = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch all
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //update
    builder.addCase(updateCategoriesAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetEditAction, (state, action) => {
      state.isEdited = true;
    });
    builder.addCase(updateCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isEdited = false;
      state.updatedCategory = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //delete
    builder.addCase(deleteCategoriesAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetDeleteAction, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.deletedCategory = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //FETCH SINGLE CATEGORY DETAILS
    builder.addCase(fetchCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
  },
});
export default categorySlices.reducer;
