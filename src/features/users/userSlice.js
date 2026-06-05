// src/features/users/userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../api/dummyJSON";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ skip = 0, limit = 20 }) => {
    const response = await getAllUsers(skip, limit);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    totalUsers: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.total;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;