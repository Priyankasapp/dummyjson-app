import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postSlice";
// import { useProduct } from "../context/ProductContext";
import { motion, AnimatePresence } from "framer-motion";

const PostList = () => {
  // const { post, loading, error, fetchPost, totalPost } = useProduct();
  const dispatch = useDispatch();

const {
  posts,
  loading,
  error,
  totalPost,
} = useSelector((state) => state.posts);

  const [skip, setSkip] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 20;

  // useEffect(() => {
  //   fetchPost(skip, limit);
  // }, [skip]);

  useEffect(() => {
  dispatch(
    fetchPosts({
      skip,
      limit,
    })
  );
}, [dispatch, skip, limit]);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    // Restore body scroll
    document.body.style.overflow = "unset";
  };

  // Handle escape key press
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

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center py-10 min-h-screen"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
        className="text-center text-red-500 py-10"
      >
        Error: {error}
      </motion.div>
    );
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="text-3xl font-bold text-center mb-8"
        >
          {/* Posts ({totalPost}) */}
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {posts?.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                whileTap="tap"
                onClick={() => openModal(item)}
                className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-semibold mb-3 line-clamp-2"
                >
                  {item.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-gray-600 mb-4 line-clamp-4"
                >
                  {item.body}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {item.tags?.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-between text-sm text-gray-500 border-t pt-3"
                >
                  <motion.span whileHover={{ scale: 1.1 }}>
                    👍 {item.reactions?.likes || 0}
                  </motion.span>
                  <motion.span whileHover={{ scale: 1.1 }}>
                    👎 {item.reactions?.dislikes || 0}
                  </motion.span>
                  <motion.span whileHover={{ scale: 1.1 }}>
                    👁️ {item.views}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* Modal with Animations */}
      <AnimatePresence>
        {isModalOpen && selectedPost && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal Content */}
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <motion.button
                  onClick={closeModal}
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white rounded-full p-1"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                {/* Modal Body */}
                <motion.div className="p-6">
                  {/* Title */}
                  <motion.h2
                    variants={modalContentVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold mb-4 pr-8"
                  >
                    {selectedPost.title}
                  </motion.h2>

                  {/* Tags */}
                  {selectedPost.tags && selectedPost.tags.length > 0 && (
                    <motion.div
                      variants={modalContentVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.15 }}
                      className="flex flex-wrap gap-2 mb-4"
                    >
                      {selectedPost.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}

                  {/* Content */}
                  <motion.div
                    variants={modalContentVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-lg font-semibold mb-2 text-gray-700"
                    >
                      Content
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="text-gray-600 leading-relaxed"
                    >
                      {selectedPost.body}
                    </motion.p>
                  </motion.div>

                  {/* Reactions and Views */}
                  <motion.div
                    variants={modalContentVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    className="border-t pt-4"
                  >
                    <div className="flex gap-6 justify-around">
                      <motion.div
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            delay: 0.35,
                          }}
                          className="text-2xl font-bold text-green-600"
                        >
                          {selectedPost.reactions?.likes || 0}
                        </motion.div>
                        <div className="text-sm text-gray-500">Likes</div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            delay: 0.4,
                          }}
                          className="text-2xl font-bold text-red-600"
                        >
                          {selectedPost.reactions?.dislikes || 0}
                        </motion.div>
                        <div className="text-sm text-gray-500">Dislikes</div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            delay: 0.45,
                          }}
                          className="text-2xl font-bold text-blue-600"
                        >
                          {selectedPost.views || 0}
                        </motion.div>
                        <div className="text-sm text-gray-500">Views</div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Additional Info */}
                  {selectedPost.userId && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 text-sm text-gray-400 text-center border-t pt-4"
                    >
                      Post ID: {selectedPost.id} | User ID: {selectedPost.userId}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PostList;