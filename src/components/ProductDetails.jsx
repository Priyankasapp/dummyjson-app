import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetails = () => {
  const { productId } = useParams();
  const { fetchProductById } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");

      const result = await fetchProductById(productId);

      if (result) {
        setProduct(result);
      } else {
        setError("Product not found.");
      }

      setLoading(false);
    };

    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const backButtonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    hover: {
      x: -5,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
  };

  const detailCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center py-16 min-h-screen"
      >
        <motion.div
          variants={loadingVariants}
          animate="animate"
          className="rounded-full h-12 w-12 border-b-2 border-blue-600"
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700 max-w-7xl mx-auto mt-8"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {error}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={productId}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="rounded-lg bg-white p-6 shadow max-w-7xl mx-auto mt-8"
      >
        <motion.div variants={backButtonVariants}>
          <Link to="/product">
            <motion.span
              variants={backButtonVariants}
              whileHover="hover"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
            >
              ← Back to products
            </motion.span>
          </Link>
        </motion.div>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <motion.div
            variants={imageVariants}
            whileHover="hover"
            className="overflow-hidden rounded-lg bg-gray-100"
          >
            <motion.img
              src={product.thumbnail}
              alt={product.title}
              className="h-96 w-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.p
              variants={itemVariants}
              className="text-sm font-medium uppercase text-gray-500"
            >
              Product ID: {product.id}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="mt-2 text-4xl font-bold text-gray-900"
            >
              {product.title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-gray-600 leading-relaxed"
            >
              {product.description}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-6 grid grid-cols-2 gap-4 text-sm"
            >
              {[
                { label: "Price", value: `$${product.price}`, color: "text-blue-700" },
                { label: "Category", value: product.category },
                { label: "Rating", value: `⭐ ${product.rating}` },
                { label: "Stock", value: product.stock },
                { label: "Brand", value: product.brand || "N/A" },
                { label: "SKU", value: product.sku },
              ].map((detail, index) => (
                <motion.div
                  key={detail.label}
                  variants={detailCardVariants}
                  whileHover="hover"
                  custom={index}
                  className="rounded-lg border border-gray-100 p-3 bg-gray-50"
                >
                  <p className="font-semibold text-gray-900">{detail.label}</p>
                  <motion.p
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className={`text-lg font-medium ${detail.color || 'text-gray-800'}`}
                  >
                    {detail.value}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 pt-6 borderss-t border-gray-200"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center cursor-pointer hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default ProductDetails;