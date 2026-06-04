import { createContext, useContext, useState } from "react";
import {
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getAllUsers,
  getAllPosts,
  getAllCommennts,
  getCommentById,
} from "../api/dummyJSON";

export const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used within ProductProvider");
  }
  return context;
};

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPost, setTotalPost] = useState(0);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);

  const [searchResults, setSearchResults] = useState({
    products: [],
    users: [],
    posts: [],
    comments: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async (skip = 0, limit=20) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllProducts(skip, limit);
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (id, productData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateProduct(id, productData);
      setProducts((prev) => prev.map((p) => (p.id === id ? response.data : p)));
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProductById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id != id));
      return true;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //   User Section
  const fetchUsers = async (skip = 0, limit=20) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllUsers(skip, limit);
      setUsers(response.data.users);
      setTotalUsers(response.data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //Post Section
  const fetchPost = async (skip = 0, limit=20) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllPosts(skip, limit);
      setPost(response.data.posts);
      setTotalPost(response.data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (skip = 0, limit=20) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllCommennts(skip, limit);
      setComments(response.data.comments);
      setTotalComments(response.data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchAll = async (query) => {
    if (!query.trim()) {
      setSearchResults({ products: [], users: [], posts: [], comments: [] });
      setSearchQuery("");
      return;
    }

    setIsSearching(true);
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    const includesQuery = (value) =>
      String(value || "").toLowerCase().includes(lowerQuery);

    try {
      // Fetch all data for searching
      const [productsRes, usersRes, postsRes, commentsRes] = await Promise.all([
        getAllProducts(0, 100),
        getAllUsers(0, 100),
        getAllPosts(0, 100),
        getAllCommennts(0, 100),
      ]);

      // Filter products
      const filteredProducts = productsRes.data.products.filter(
        (product) =>
          includesQuery(product.title) ||
          includesQuery(product.description) ||
          includesQuery(product.category) ||
          includesQuery(product.brand),
      );

      // Filter users
      const filteredUsers = usersRes.data.users.filter(
        (user) =>
          includesQuery(user.firstName) ||
          includesQuery(user.lastName) ||
          includesQuery(user.username) ||
          includesQuery(user.email) ||
          includesQuery(user.phone) ||
          includesQuery(`${user.firstName} ${user.lastName}`),
      );

      // Filter posts
      const filteredPosts = postsRes.data.posts.filter(
        (post) =>
          includesQuery(post.title) ||
          includesQuery(post.body) ||
          post.tags?.some((tag) => includesQuery(tag)),
      );

      // Filter comments
      const filteredComments = commentsRes.data.comments.filter(
        (comment) =>
          includesQuery(comment.body) ||
          includesQuery(comment.user?.fullName) ||
          includesQuery(comment.user?.username),
      );

      setSearchResults({
        products: filteredProducts,
        users: filteredUsers,
        posts: filteredPosts,
        comments: filteredComments,
      });
    } catch (err) {
      setError(err.message);
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchResults({ products: [], users: [], posts: [], comments: [] });
    setSearchQuery("");
  };

  const value = {
     products,
    users,
    post,
    loading,
    error,
    totalProducts,
    totalUsers,
    fetchProducts,
    fetchProductById,
    removeProduct,
    editProduct,
    fetchUsers,
    fetchPost, 
    totalPost,
    comments,
    totalComments,
    fetchComments,
    // Search related
    searchResults,
    isSearching,
    searchQuery,
    searchAll,
    clearSearch
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
