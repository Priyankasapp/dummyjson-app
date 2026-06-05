// src/features/posts/postSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPosts } from "../../api/dummyJSON";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ skip = 0, limit = 20 }) => {
    const response = await getAllPosts(skip, limit);
    return response.data;
  },
);

const postSlice = createSlice({
  name: "posts",

  initialState: {
    posts: [],
    totalPost: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPost = action.payload.total;
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
