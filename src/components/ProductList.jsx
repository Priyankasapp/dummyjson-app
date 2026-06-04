import React, { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";
import EditProductForm from "./EditForm";

const ProductList = () => {
  const {
    products,
    loading,
    error,
    totalProducts,
    fetchProducts,
    removeProduct,
    editProduct,
  } = useProduct();

  const [skip, setSkip] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limit] = useState(10);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts(skip, limit);
  }, [skip]);

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
    fetchProducts(skip, limit);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      await removeProduct(id);
    }
  };

  console.log(products);
  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Product Management Dashboard
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error:{error}
          </div>
        )}
        {/* Products  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => openModal(product)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  alt=""
                  className="w-full h-60 w-60 object-containe"
                />
              )}
              <div className="p-3">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex item-center justify-between mb-2">
                  <span className="text-lg font-bold text-blue-600">
                    $ {product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>⭐ {product.rating}</span>
                  <span>Stock: {product.stock}</span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(product.id);
                    }}
                    className="flex-1 bg-red-700 text-white px-3 py-2 rounded hover:bg-red-800 transition-colors text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(product);
                    }}
                    className="flex-1 bg-green-700 text-white px-3 py-2 rounded hover:bg-green-800 transition-colors text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Edit Form Modal  */}
        {editingProduct && (
          <EditProductForm product={editingProduct} onClose={handleCloseEdit} />
        )}

    
        {/* Product Details Modal */}
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50"
              onClick={closeModal}
            ></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                  ✕
                </button>

                {/* Product Image */}
                <img
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                  className="w-full h-80 object-containe"
                />

                <div className="p-6">
                  <h2 className="text-3xl font-bold mb-3">
                    {selectedProduct.title}
                  </h2>

                  <p className="text-gray-600 mb-4">
                    {selectedProduct.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="font-semibold">Price</p>
                      <p className="text-blue-600 text-lg">
                        ${selectedProduct.price}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">Category</p>
                      <p>{selectedProduct.category}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Rating</p>
                      <p>⭐ {selectedProduct.rating}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Stock</p>
                      <p>{selectedProduct.stock}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Brand</p>
                      <p>{selectedProduct.brand}</p>
                    </div>

                    <div>
                      <p className="font-semibold">SKU</p>
                      <p>{selectedProduct.sku}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
