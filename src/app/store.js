// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";

import productReducer from "../features/products/productSlice";
import userReducer from "../features/users/userSlice";
import postReducer from "../features/posts/postSlice";
import commentReducer from "../features/comments/commentSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});