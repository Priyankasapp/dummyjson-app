// src/features/products/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../../api/dummyJSON";

// Fetch Products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ skip = 0, limit = 20 }) => {
    const response = await getAllProducts(skip, limit);
    return response.data;
  }
);

// Delete Product
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);

// Edit Product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, productData }) => {
    const response = await updateProduct(id, productData);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    totalProducts: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Product
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })

      // Edit Product
      .addCase(editProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id
            ? action.payload
            : product
        );
      });
  },
});

export default productSlice.reducer;