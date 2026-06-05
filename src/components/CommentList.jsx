import React, { useEffect, useState } from 'react';
// import { useProduct } from "../context/ProductContext";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchComments,
} from "../features/comments/commentSlice";
import { motion, AnimatePresence } from "framer-motion";

const CommentList = () => {
  // const {
  //   loading,
  //   error,
  //   comments,
  //   totalComments,
  //   fetchComments,
  // } = useProduct();

  const dispatch = useDispatch();

const {
  loading,
  error,
  comments,
  totalComments,
} = useSelector(
  (state) => state.comments
);

  const [skip, setSkip] = useState(0);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 20;

  // useEffect(() => {
  //   fetchComments(skip, limit);
  // }, [skip]);

  useEffect(() => {
  dispatch(
    fetchComments({
      skip,
      limit,
    })
  );
}, [dispatch, skip, limit]);

  const openModal = (comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedComment(null);
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, []);

  // Animation variants
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
      y: -5,
      scale: 1.01,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
    tap: {
      scale: 0.99,
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

  const statCardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
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

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(totalComments / limit));
  const canPrev = skip > 0;
  const canNext = skip + limit < totalComments;

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="mb-8 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold"
          >
            Comments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mt-2"
          >
            Showing {comments?.length || 0} of {totalComments} comments
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6"
        >
          <AnimatePresence mode="popLayout">
            {comments?.length > 0 ? (
              comments.map((comment) => (
                <motion.article
                  key={comment.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => openModal(comment)}
                  className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <motion.div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-gray-500"
                      >
                        Comment ID: {comment.id}
                      </motion.p>
                      <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-xl font-semibold text-gray-900"
                      >
                        {comment.user?.fullName || comment.user?.username || 'Unknown User'}
                      </motion.h2>
                      {comment.user?.username && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-sm text-gray-500"
                        >
                          @{comment.user.username}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-700"
                      >
                        👍 {comment.likes ?? 0}
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="rounded-full bg-slate-100 px-3 py-1"
                      >
                        Post {comment.postId}
                      </motion.span>
                    </motion.div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-5 text-gray-700 leading-7"
                  >
                    {comment.body}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mt-5 flex flex-wrap gap-3 text-sm text-gray-500"
                  >
                    <motion.span whileHover={{ scale: 1.05 }}>
                      User ID: {comment.user?.id ?? '—'}
                    </motion.span>
                    <motion.span whileHover={{ scale: 1.05 }}>
                      Post ID: {comment.postId ?? '—'}
                    </motion.span>
                  </motion.div>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16 text-gray-500"
              >
                No comments available.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* Modal with Animations */}
      <AnimatePresence>
        {isModalOpen && selectedComment && (
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

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                >
                  ×
                </motion.button>

                <div className="p-6">
                  {/* User Info */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="border-b pb-4 mb-4"
                  >
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-2xl font-bold"
                    >
                      {selectedComment.user?.fullName ||
                        selectedComment.user?.username ||
                        "Unknown User"}
                    </motion.h2>

                    {selectedComment.user?.username && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500"
                      >
                        @{selectedComment.user.username}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Comment Content */}
                  <motion.div
                    variants={modalContentVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.25 }}
                    className="mb-6"
                  >
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-semibold text-lg mb-3"
                    >
                      Comment
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-700 leading-7"
                    >
                      {selectedComment.body}
                    </motion.p>
                  </motion.div>

                  {/* Stats Grid */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b py-4"
                  >
                    {[
                      { label: "Likes", value: selectedComment.likes || 0, color: "text-blue-600" },
                      { label: "Comment ID", value: selectedComment.id, color: "text-green-600" },
                      { label: "Post ID", value: selectedComment.postId, color: "text-purple-600" },
                      { label: "User ID", value: selectedComment.user?.id || "-", color: "text-orange-600" },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        variants={statCardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="text-center cursor-pointer"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            delay: 0.45 + index * 0.05,
                          }}
                          className={`text-2xl font-bold ${stat.color}`}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-gray-500">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Additional Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6"
                  >
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-semibold text-lg mb-3"
                    >
                      Details
                    </motion.h3>

                    <motion.div className="space-y-2 text-gray-600">
                      {[
                        { label: "User Name", value: selectedComment.user?.fullName || selectedComment.user?.username },
                        { label: "Username", value: `@${selectedComment.user?.username}` },
                        { label: "Comment ID", value: selectedComment.id },
                        { label: "Post ID", value: selectedComment.postId },
                        { label: "Total Likes", value: selectedComment.likes },
                      ].map((detail, index) => (
                        <motion.p
                          key={detail.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.65 + index * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <strong>{detail.label}:</strong> {detail.value || "N/A"}
                        </motion.p>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommentList;