import React, { useEffect, useState } from "react";
// import { useProduct } from "../context/ProductContext";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  removeProduct,
  editProduct,
} from "../features/products/productSlice";
import EditProductForm from "./EditForm";
import { motion, AnimatePresence } from "framer-motion";

const ProductList = () => {
  const dispatch = useDispatch();

  // const {
  //   products,
  //   loading,
  //   error,
  //   totalProducts,
  //   fetchProducts,
  //   removeProduct,
  //   editProduct,
  // } = useProduct();
  const { products, loading, error, totalProducts } = useSelector(
    (state) => state.products,
  );

  const [skip, setSkip] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limit] = useState(10);
  const [editingProduct, setEditingProduct] = useState(null);

  // useEffect(() => {
  //   fetchProducts(skip, limit);
  // }, [skip]);

  useEffect(() => {
    dispatch(fetchProducts({ skip, limit }));
  }, [dispatch, skip, limit]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCloseEdit = () => {
    setEditingProduct(null);
    // fetchProducts(skip, limit);
    dispatch(fetchProducts({ skip, limit }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      // await removeProduct(id);
      await dispatch(removeProduct(id));
    }
  };

  console.log(products);

  if (loading && products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center min-h-screen"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-b-2 border-blue-600"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 py-8 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="text-4xl font-bold text-gray-800 mb-8 text-center"
        >
          Product Management Dashboard
        </motion.h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          >
            Error: {error}
          </motion.div>
        )}

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {products.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: -30 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal(product)}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-60 object-cover"
                    />
                  )}
                </motion.div>

                <div className="p-4">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-semibold text-gray-800 mb-2"
                  >
                    {product.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-gray-600 text-sm mb-3 line-clamp-2"
                  >
                    {product.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-between mb-2"
                  >
                    <span className="text-lg font-bold text-blue-600">
                      $ {product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.category}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="flex items-center justify-between text-sm text-gray-500 mb-3"
                  >
                    <span>⭐ {product.rating}</span>
                    <span>Stock: {product.stock}</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.id);
                      }}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Delete
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(product);
                      }}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Edit
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Edit Form Modal */}
        <AnimatePresence>
          {editingProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EditProductForm
                product={editingProduct}
                onClose={handleCloseEdit}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Details Modal */}
        <AnimatePresence>
          {isModalOpen && selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50"
                onClick={closeModal}
              />

              {/* Modal */}
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                  }}
                  className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col items-center mb-6"
                >
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black z-10 bg-white rounded-full p-2 shadow-md"
                  >
                    ✕
                  </motion.button>

                  {/* Product Image */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <img
                      src={selectedProduct.thumbnail}
                      alt={selectedProduct.title}
                      className="w-100 h-96 object-cover ml-40"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6"
                  >
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl font-bold mb-3"
                    >
                      {selectedProduct.title}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="text-gray-600 mb-4"
                    >
                      {selectedProduct.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="grid grid-cols-2 gap-4 mb-6"
                    >
                      {[
                        {
                          label: "Price",
                          value: `$${selectedProduct.price}`,
                          color: "text-blue-600",
                        },
                        { label: "Category", value: selectedProduct.category },
                        {
                          label: "Rating",
                          value: `⭐ ${selectedProduct.rating}`,
                        },
                        { label: "Stock", value: selectedProduct.stock },
                        { label: "Brand", value: selectedProduct.brand },
                        { label: "SKU", value: selectedProduct.sku },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 + index * 0.05 }}
                        >
                          <p className="font-semibold text-gray-700">
                            {item.label}
                          </p>
                          <p
                            className={`text-lg ${item.color || "text-gray-800"}`}
                          >
                            {item.value}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProductList;
