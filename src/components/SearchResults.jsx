import React, { useEffect } from 'react'
import { useProduct } from '../context/ProductContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SearchResults = () => {
  const { searchResults, searchQuery, isSearching } = useProduct()
  
  // Debug: Log the searchResults to see what's coming from Context
  useEffect(() => {
    console.log('SearchResults rendered with:', { searchResults, searchQuery, isSearching })
  }, [searchResults, searchQuery, isSearching])

  // Safely extract results with fallbacks
  const products = searchResults?.products || []
  const users = searchResults?.users || []
  const posts = searchResults?.posts || []
  const comments = searchResults?.comments || []

  const totalHits = products.length + users.length + posts.length + comments.length

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
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
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
  }

  const emptyStateVariants = {
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
  }

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  }

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
  }

  if (isSearching) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto px-4 py-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              variants={loadingVariants}
              animate="animate"
              className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-slate-900"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium text-slate-700"
            >
              Searching...
            </motion.p>
          </div>
        </motion.div>
      </motion.section>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={searchQuery || 'empty'}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto px-4 py-10"
      >
        <motion.div
          variants={headerVariants}
          className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-slate-900"
          >
            Search results
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-slate-600"
          >
            {searchQuery && searchQuery.trim()
              ? `Showing results for "${searchQuery}"`
              : 'Type a query into the search bar to search products, users, posts, and comments.'}
          </motion.p>
        </motion.div>

        {!searchQuery || !searchQuery.trim() ? (
          <motion.div
            variants={emptyStateVariants}
            initial="hidden"
            animate="visible"
            className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500"
          >
            <motion.p
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-lg"
            >
              🔍 Enter a search query above to begin.
            </motion.p>
          </motion.div>
        ) : totalHits === 0 ? (
          <motion.div
            variants={emptyStateVariants}
            initial="hidden"
            animate="visible"
            className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500"
          >
            <motion.p
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-lg"
            >
              No results found for "{searchQuery}".
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm"
            >
              Try different keywords or browse our categories above.
            </motion.p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            className="space-y-12"
          >
            {/* Products Section */}
            {products.length > 0 && (
              <motion.div variants={sectionVariants}>
                <motion.div className="mb-4 flex items-center justify-between">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-semibold text-slate-900"
                  >
                    Products ({products.length})
                  </motion.h2>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/product" className="text-sm text-blue-600 hover:text-blue-800">
                      View all products →
                    </Link>
                  </motion.div>
                </motion.div>
                <motion.div 
                  variants={containerVariants}
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {products.slice(0, 6).map((product, index) => (
                    <motion.div
                      key={product.id}
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                    >
                      <Link 
                        to={`/product/${product.id}`}
                        className="block rounded-3xl border border-slate-200 p-5 shadow-sm bg-white hover:shadow-md transition-all hover:border-slate-300"
                      >
                        <motion.h3 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="text-lg font-semibold text-slate-900 line-clamp-2"
                        >
                          {product.title}
                        </motion.h3>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.1 }}
                          className="mt-2 text-sm text-slate-600 line-clamp-3"
                        >
                          {product.description}
                        </motion.p>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.2 }}
                          className="mt-4 flex items-center justify-between"
                        >
                          <p className="text-sm text-slate-500">Category: {product.category}</p>
                          <p className="font-semibold text-slate-900">${product.price}</p>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
                {products.length > 6 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-center"
                  >
                    <Link to="/product" className="text-blue-600 hover:text-blue-800 text-sm">
                      + {products.length - 6} more products
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Users Section */}
            {users.length > 0 && (
              <motion.div variants={sectionVariants}>
                <div className="mb-4 flex items-center justify-between">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-semibold text-slate-900"
                  >
                    Users ({users.length})
                  </motion.h2>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/user" className="text-sm text-blue-600 hover:text-blue-800">
                      View all users →
                    </Link>
                  </motion.div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {users.slice(0, 6).map((user, index) => (
                    <motion.div
                      key={user.id}
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link 
                        to={`/user/${user.id}`}
                        className="block rounded-3xl border border-slate-200 p-5 shadow-sm bg-white hover:shadow-md transition-all hover:border-slate-300"
                      >
                        <motion.h3 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="text-lg font-semibold text-slate-900"
                        >
                          {user.firstName} {user.lastName}
                        </motion.h3>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.1 }}
                          className="mt-1 text-sm text-slate-600"
                        >
                          @{user.username}
                        </motion.p>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.2 }}
                          className="mt-3 text-sm text-slate-500"
                        >
                          {user.email}
                        </motion.p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Posts Section */}
            {posts.length > 0 && (
              <motion.div variants={sectionVariants}>
                <div className="mb-4 flex items-center justify-between">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-semibold text-slate-900"
                  >
                    Posts ({posts.length})
                  </motion.h2>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/post" className="text-sm text-blue-600 hover:text-blue-800">
                      View all posts →
                    </Link>
                  </motion.div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.slice(0, 6).map((post, index) => (
                    <motion.div
                      key={post.id}
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link 
                        to={`/post/${post.id}`}
                        className="block rounded-3xl border border-slate-200 p-5 shadow-sm bg-white hover:shadow-md transition-all hover:border-slate-300"
                      >
                        <motion.h3 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="text-lg font-semibold text-slate-900 line-clamp-2"
                        >
                          {post.title}
                        </motion.h3>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.1 }}
                          className="mt-2 text-sm text-slate-600 line-clamp-4"
                        >
                          {post.body}
                        </motion.p>
                        {post.tags && post.tags.length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 + 0.2 }}
                            className="mt-3 flex flex-wrap gap-2"
                          >
                            {post.tags.slice(0, 3).map((tag, idx) => (
                              <motion.span
                                key={idx}
                                variants={tagVariants}
                                whileHover="hover"
                                className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full cursor-pointer"
                              >
                                #{tag}
                              </motion.span>
                            ))}
                          </motion.div>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Comments Section */}
            {comments.length > 0 && (
              <motion.div variants={sectionVariants}>
                <div className="mb-4 flex items-center justify-between">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-semibold text-slate-900"
                  >
                    Comments ({comments.length})
                  </motion.h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {comments.slice(0, 6).map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link 
                        to={`/post/${comment.postId}`}
                        className="block rounded-3xl border border-slate-200 p-5 shadow-sm bg-white hover:shadow-md transition-all hover:border-slate-300"
                      >
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="text-sm text-slate-600 line-clamp-4"
                        >
                          {comment.body}
                        </motion.p>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.1 }}
                          className="mt-4 flex items-center justify-between"
                        >
                          <p className="text-sm font-medium text-slate-900">
                            {comment.user?.fullName || comment.user?.username || 'Anonymous'}
                          </p>
                          <p className="text-xs text-slate-500">Post #{comment.postId}</p>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.section>
    </AnimatePresence>
  )
}

export default SearchResults