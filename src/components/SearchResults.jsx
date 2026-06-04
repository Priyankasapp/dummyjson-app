import React, { useEffect } from 'react'
import { useProduct } from '../context/ProductContext'
import { Link } from 'react-router-dom'

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

  if (isSearching) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10 text-center">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"></div>
            <p className="text-lg font-medium text-slate-700">Searching...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Search results
        </h1>
        <p className="mt-2 text-slate-600">
          {searchQuery && searchQuery.trim()
            ? ``
            : 'Type a query into the search bar to search products, users, posts, and comments.'}
        </p>
      </div>

      {!searchQuery || !searchQuery.trim() ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
          <p className="text-lg">🔍 Enter a search query above to begin.</p>
        </div>
      ) : totalHits === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
          <p className="text-lg">No results found for "{searchQuery}".</p>
          <p className="mt-2 text-sm">Try different keywords or browse our categories above.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Products Section */}
          {products.length > 0 && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Products ({products.length})
                </h2>
                <Link to="/product" className="text-sm text-blue-600 hover:text-blue-800">
                  View all products →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.slice(0, 6).map((product) => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className="rounded-3xl border border-slate-200 p-5 shadow-sm bg-white hover:shadow-md transition-all hover:border-slate-300"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{product.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-slate-500">Category: {product.category}</p>
                      <p className="font-semibold text-slate-900">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
              {products.length > 6 && (
                <div className="mt-4 text-center">
                  <Link to="/product" className="text-blue-600 hover:text-blue-800 text-sm">
                    + {products.length - 6} more products
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Users Section */}
          {users.length > 0 && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Users ({users.length})
                </h2>
                <Link to="/user" className="text-sm text-blue-600 hover:text-blue-800">
                  View all users →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {users.slice(0, 6).map((user) => (
                  <Link 
                    key={user.id} 
                    to={`/user/${user.id}`}
                    className="rounded-3xl border border-slate-200 p-5 shadow-sm bg-white hover:shadow-md transition-all hover:border-slate-300"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">@{user.username}</p>
                    <p className="mt-3 text-sm text-slate-500">{user.email}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Posts Section */}
          {posts.length > 0 && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Posts ({posts.length})
                </h2>
                <Link to="/post" className="text-sm text-blue-600 hover:text-blue-800">
                  View all posts →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(0, 6).map((post) => (
                  <Link 
                    key={post.id} 
                    to={`/post/${post.id}`}
                    className="rounded-3xl border border-slate-200 p-5 shadow-sm bg-white hover:shadow-md transition-all hover:border-slate-300"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{post.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-4">{post.body}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          {comments.length > 0 && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Comments ({comments.length})
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {comments.slice(0, 6).map((comment) => (
                  <Link 
                    key={comment.id} 
                    to={`/post/${comment.postId}`}
                    className="rounded-3xl border border-slate-200 p-5 shadow-sm bg-white hover:shadow-md transition-all hover:border-slate-300"
                  >
                    <p className="text-sm text-slate-600 line-clamp-4">{comment.body}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">
                        {comment.user?.fullName || comment.user?.username || 'Anonymous'}
                      </p>
                      <p className="text-xs text-slate-500">Post #{comment.postId}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default SearchResults