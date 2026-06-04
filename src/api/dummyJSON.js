import axios from "axios";

const API_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Products
export const getAllProducts = (skip = 0, limit = 20) =>
  api.get(`/products?skip=${skip}&limit=${limit}`);

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`);

export const updateProduct = (id, productData) =>
  api.patch(`/products/${id}`, productData);

// Users
export const getAllUsers = (skip = 0, limit=20) =>
  api.get(`/users?skip=${skip}&limit=${limit}`);

export const getUserById = (id) =>
  api.get(`/users/${id}`);


// Post 
export const getAllPosts = (skip = 0, limit=20) => 
  api.get(`/posts?skip=${skip}&limit=${limit}`);

export const getPostById = (id) => api.get(`/posts/${id}`);


//Commetns
export const getAllCommennts = (skip = 0, limit=20) =>
  api.get(`/comments?skip=${skip}&limit=${limit}`);

export const getCommentById = (id) => api.get(`/comments/${id}`);