// src/features/comments/commentSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCommennts } from "../../api/dummyJSON";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ skip = 0, limit = 20 }) => {
    const response = await getAllCommennts(skip, limit);
    return response.data;
  },
);

const commentSlice = createSlice({
  name: "comments",

  initialState: {
    comments: [],
    totalComments: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
        state.totalComments = action.payload.total;
      })

      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;
