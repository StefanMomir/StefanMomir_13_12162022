import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileUser from "./apiCallProfile.js";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user?.email,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get User Profile
export const getProfile = createAsyncThunk(
  "profile/profile",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await profileUser.getProfile(Object.values(token));
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit User Profile
export const editProfile = createAsyncThunk(
  "profiles/editProfile",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await profileUser.editProfile(userData, Object.values(token));
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    init: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { init } = profileSlice.actions;
export default profileSlice.reducer;
