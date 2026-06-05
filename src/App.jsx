import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchProducts } from "./features/products/productSlice";
import { fetchUsers } from "./features/users/userSlice";
import { fetchPosts } from "./features/posts/postSlice";
import { fetchComments } from "./features/comments/commentSlice";

import Product from "./pages/Product";
import User from "./pages/User";
import Post from "./pages/Post";
import Comments from "./pages/Comments";
import SearchResults from "./components/SearchResults";
import Navbar from "./components/Navbar";
import StatusCard from "./components/StatusCard";
import ProductDetails from "./components/ProductDetails";

import Lenis from "lenis";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ skip: 0, limit: 20 }));
    dispatch(fetchUsers({ skip: 0, limit: 20 }));
    dispatch(fetchPosts({ skip: 0, limit: 20 }));
    dispatch(fetchComments({ skip: 0, limit: 20 }));
  }, [dispatch]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <StatusCard />
        <div className="mt-8">
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/user" element={<User />} />
            <Route path="/post" element={<Post />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
